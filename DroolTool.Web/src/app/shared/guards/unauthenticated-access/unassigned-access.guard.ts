import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Injectable } from '@angular/core';
import { AlertService } from '../../services/alert.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { RoleEnum } from '../../generated/enum/role-enum';

@Injectable({
  providedIn: 'root'
})
export class UnassignedAccessGuard  {
  constructor(private router: Router, private alertService: AlertService, private authenticationService: AuthenticationService) {
  }
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.authenticationService.isCurrentUserNullOrUndefined()) {
      if (!this.authenticationService.isCurrentUserUnassigned()) {
        return true;
      } else {
        this.alertService.pushNotFoundUnauthorizedAlert();
        this.router.navigate(["/"]);
        return false;
      }
    }

    return this.authenticationService.currentUserSetObservable
      .pipe(
        map(x => {
          if ([RoleEnum.Admin, RoleEnum.Normal].includes(x.Role.RoleID)) {
            return true;
          } else {
            this.alertService.pushNotFoundUnauthorizedAlert();
            this.router.navigate(["/"]);
            return false;
          }
        })
      );
  }
}
