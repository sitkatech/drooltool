import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { AlertService } from 'src/app/shared/services/alert.service';
import { Alert } from 'src/app/shared/models/alert';
import { AlertContext } from 'src/app/shared/models/enums/alert-context.enum';
import { RoleDto, RoleService, UserDto, UserService, UserUpsertDto } from 'src/app/shared/generated';
import { RoleEnum } from 'src/app/shared/generated/enum/role-enum';


@Component({
  selector: 'drooltool-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserEditComponent implements OnInit, OnDestroy {

  private currentUser: UserDto;

  public userID: number;
  public user: UserDto;
  public model: UserUpsertDto;
  public roles: Array<RoleDto>;
  public isLoadingSubmit: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private roleService: RoleService,
    private cdr: ChangeDetectorRef,
    private alertService: AlertService
  ) {
  }

  ngOnInit() {
    this.authenticationService.getCurrentUser().subscribe(currentUser => {
      this.currentUser = currentUser;

      if (!this.authenticationService.isUserAnAdministrator(this.currentUser)) {
        this.router.navigateByUrl("/not-found")
          .then();
        return;
      }

      this.userID = parseInt(this.route.snapshot.paramMap.get("id"));

      forkJoin(
        this.userService.usersUserIDGet(this.userID),
        this.roleService.rolesGet()
      ).subscribe(([user, roles]) => {
        this.user = user instanceof Array
          ? null
          : user as UserDto;

        this.roles = roles
        .filter((x: RoleDto) => ![RoleEnum.Disabled, RoleEnum.Landowner].includes(x.RoleID))
        .sort((a: RoleDto, b: RoleDto) => {
          if (a.RoleDisplayName > b.RoleDisplayName)
            return 1;
          if (a.RoleDisplayName < b.RoleDisplayName)
            return -1;
          return 0;
        });

        this.model = new UserUpsertDto();
        this.model.RoleID = user.Role.RoleID;
        this.model.ReceiveSupportEmails = user.ReceiveSupportEmails;

        this.cdr.detectChanges();
      });
    });
  }

  ngOnDestroy() {


    this.cdr.detach();
  }

  onSubmit(editUserForm: HTMLFormElement): void {
    this.isLoadingSubmit = true;
    this.userService.usersUserIDPut(this.userID, this.model)
      .subscribe(response => {
        this.isLoadingSubmit = false;
        this.router.navigateByUrl("/users/" + this.userID).then(x => {
          this.alertService.pushAlert(new Alert("The user was successfully updated.", AlertContext.Success));
        });
      }
        ,
        error => {
          this.isLoadingSubmit = false;
          this.cdr.detectChanges();
        }
      );
  }

  checkReceiveSupportEmails(): void {
    if (this.model.RoleID != 1){
      this.model.ReceiveSupportEmails = false;
    }
  }
}
