import { Component, OnInit, HostListener, ChangeDetectorRef, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { CookieStorageService } from '../../services/cookies/cookie-storage.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AlertService } from '../../services/alert.service';
import { Alert } from '../../models/alert';
import { environment } from 'src/environments/environment';
import { AlertContext } from '../../models/enums/alert-context.enum';
import { UserDto, UserService } from '../../generated';

@Component({
    selector: 'header-nav',
    templateUrl: './header-nav.component.html',
    styleUrls: ['./header-nav.component.scss']
})

export class HeaderNavComponent implements OnInit, OnDestroy {
    private watchUserChangeSubscription: any;
    private currentUser: UserDto;

    windowWidth: number;

    @HostListener('window:resize', ['$event'])
    resize(ev?: Event) {
        this.windowWidth = window.innerWidth;
    }

    constructor(
        private authenticationService: AuthenticationService,
        private cookieStorageService: CookieStorageService,
        private userService: UserService,
        private alertService: AlertService,
        private cdr: ChangeDetectorRef) {
    }

    ngOnInit() {
        this.watchUserChangeSubscription = this.authenticationService.currentUserSetObservable.subscribe(currentUser => {
            this.currentUser = currentUser;
            // do not attempt any API hits if the user is known to be unassigned.
            if (currentUser && !this.isUnassignedOrDisabled()) {

            }


            if (currentUser && this.isUnassigned()) {
                this.alertService.pushAlert(new Alert(`Your account has not yet been assigned a role, and therefore has limited access. Please contact an admin to receive your role assignment.`, AlertContext.Info, true, AlertService.USERS_AWAITING_CONFIGURATION));
            }


            if (currentUser && this.isAdministrator()) {
                this.userService.usersUnassignedReportGet().subscribe(report => {
                    if (report.Count > 0) {
                        this.alertService.pushAlert(new Alert(`There are ${report.Count} users who are waiting for you to configure their account. <a class="btn btn-orange-white-outline btn-sm" href='/users'>Manage Users.</a>`, AlertContext.Info, true, AlertService.USERS_AWAITING_CONFIGURATION));
                    }
                })
            }
        });
    }

    ngOnDestroy() {
        this.watchUserChangeSubscription.unsubscribe();
        this.cdr.detach();
    }

    public isAuthenticated(): boolean {
        return this.authenticationService.isAuthenticated();
    }

    public isAdministrator(): boolean {
        return this.authenticationService.isUserAnAdministrator(this.currentUser);
    }

    public isUnassigned(): boolean {
        return this.authenticationService.isUserUnassigned(this.currentUser);
    }

    public isAssigned(): boolean {
        return this.authenticationService.isUserAnAdministrator(this.currentUser) || this.authenticationService.isUserRoleNormal(this.currentUser);
    }

    public isUnassignedOrDisabled(): boolean {
        return this.authenticationService.isUserUnassigned(this.currentUser) || this.authenticationService.isUserRoleDisabled(this.currentUser);
    }

    public getUserName() {
        return this.currentUser ? this.currentUser.FullName
            : null;
    }

    public login(): void {
        this.authenticationService.login();
    }

    public logout(): void {
        this.authenticationService.logout();

        setTimeout(() => {
            this.cookieStorageService.removeAll();
            this.cdr.detectChanges();
        });
    }

    public getExpandNavClass(): string {
        return this.isAuthenticated() ? 'navbar-expand-xl' : 'navbar-expand-lg';
    }
}
