import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { Observable, race, Subject } from 'rxjs';
import { filter, first, map } from 'rxjs/operators';
import { CookieStorageService } from '../shared/services/cookies/cookie-storage.service';
import { Router } from '@angular/router';
import { AlertService } from '../shared/services/alert.service';
import { Alert } from '../shared/models/alert';
import { AlertContext } from '../shared/models/enums/alert-context.enum';
import { RoleEnum } from '../shared/generated/enum/role-enum';
import { UserCreateDto, UserDto, UserService } from '../shared/generated';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUser: UserDto;

  private _currentUserSetSubject = new Subject<UserDto>();
  public currentUserSetObservable = this._currentUserSetSubject.asObservable();

  constructor(
    private router: Router,
    private oauthService: OAuthService,
    private cookieStorageService: CookieStorageService,
    private userService: UserService,
    private alertService: AlertService
  ) {
      this.oauthService.events
      .pipe(filter(e => ['discovery_document_loaded'].includes(e.type)))
      .subscribe(e => {
        this.checkAuthentication();
      });

    this.oauthService.events
      .pipe(filter(e => ['token_received'].includes(e.type)))
      .subscribe(e => {
        this.checkAuthentication();
        this.oauthService.loadUserProfile();
      });

    this.oauthService.events
      .pipe(filter(e => ['session_terminated', 'session_error', 'token_error', 'token_refresh_error', 'silent_refresh_error', 'token_validation_error'].includes(e.type)))
      .subscribe(e => this.router.navigateByUrl("/"));

    this.oauthService.setupAutomaticSilentRefresh();
  }

  public initialLoginSequence() {
    this.oauthService.loadDiscoveryDocument()
        .then(() => this.oauthService.tryLogin())
        .then(() => Promise.resolve()).catch(() => {});
  }

  public checkAuthentication() {
    if (this.isAuthenticated() && !this.currentUser) {
      console.log("Authenticated but no user found...");
      var claims = this.oauthService.getIdentityClaims();
      this.getUser(claims);
    }
  }

  public getUser(claims: any) {
    var globalID = claims["sub"];

    this.userService.userClaimsGlobalIDGet(globalID).subscribe(
      result => { this.updateUser(result); },
      error => { this.onGetUserError(error, claims) }
    );
  }

  private onGetUserError(error: any, claims: any) {
    if (error.status !== 404) {
      this.alertService.pushAlert(new Alert("There was an error logging into the application.", AlertContext.Danger));
      this.router.navigate(['/']);
    } else {
      this.alertService.clearAlerts();
      const newUser = new UserCreateDto({
        FirstName: claims["given_name"],
        LastName: claims["family_name"],
        Email: claims["email"],
        LoginName: claims["login_name"],
        UserGuid: claims["sub"],
      });

      this.userService.usersPost(newUser).subscribe(user => {
        this.updateUser(user);
      })
    }
  }

  private updateUser(user: UserDto) {
    this.currentUser = user;
    this._currentUserSetSubject.next(this.currentUser);
  }

  public refreshUserInfo(user: UserDto) {
    this.updateUser(user);
  }

  public getCurrentUser(): Observable<UserDto> {
    return race(
      new Observable(subscriber => {
        if (this.currentUser) {
          subscriber.next(this.currentUser);
          subscriber.complete();
        }
      }),
      this.currentUserSetObservable.pipe(first())
    );
  }

  public getCurrentUserID(): Observable<number> {
    return race(
      new Observable(subscriber => {
        if (this.currentUser) {
          subscriber.next(this.currentUser.UserID);
          subscriber.complete();
        }
      }),
      this.currentUserSetObservable.pipe(first(), map(
        (user) => user.UserID
      ))
    );
  }

  public isAuthenticated(): boolean {
    return this.oauthService.hasValidAccessToken();
  }

  public login() {
    this.oauthService.initCodeFlow();
  }

  private getUserCallback(user: UserDto) {
    this.currentUser = user;
    this._currentUserSetSubject.next(this.currentUser);
  }

  public handleUnauthorized(): void {
    this.forcedLogout();
  }

  public forcedLogout() {
    sessionStorage["authRedirectUrl"] = window.location.href;
    this.logout();
  }

  public logout() {
    this.oauthService.logOut();

    setTimeout(() => {
      this.cookieStorageService.removeAll();
    });
  }

  public isUserAnAdministrator(user: UserDto): boolean {
    const role = user && user.Role
      ? user.Role.RoleID
      : null;
    return role === RoleEnum.Admin;
  }

  public isCurrentUserAnAdministrator(): boolean {
    return this.isUserAnAdministrator(this.currentUser);
  }

  public isCurrentUserUnassigned(): boolean {
    return this.isUserUnassigned(this.currentUser);
  }

  public isUserUnassigned(user: UserDto): boolean {
    const role = user && user.Role
      ? user.Role.RoleID
      : null;
    return role === RoleEnum.Unassigned;
  }

  public isUserRoleDisabled(user: UserDto): boolean {
    const role = user && user.Role
      ? user.Role.RoleID
      : null;
    return role === RoleEnum.Disabled;
  }

  public isUserRoleNormal(user: UserDto): boolean {
    const role = user && user.Role
      ? user.Role.RoleID
      : null;
    return role === RoleEnum.Normal;
  }

  public isCurrentUserNullOrUndefined(): boolean {
    return !this.currentUser;
  }

  public getAuthRedirectUrl() {
    return sessionStorage["authRedirectUrl"];
  }

  public setAuthRedirectUrl(url: string) {
    sessionStorage["authRedirectUrl"] = url;
  }

  public clearAuthRedirectUrl() {
    this.setAuthRedirectUrl("");
  }
}
