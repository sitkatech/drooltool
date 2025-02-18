import {
    Component,
    OnInit,
    ChangeDetectorRef,
    OnDestroy,
    ViewChild,
} from "@angular/core";
import { AuthenticationService } from "src/app/services/authentication.service";
import { ColDef } from "ag-grid-community";
import { LinkRendererComponent } from "src/app/shared/components/ag-grid/link-renderer/link-renderer.component";
import { FontAwesomeIconLinkRendererComponent } from "src/app/shared/components/ag-grid/fontawesome-icon-link-renderer/fontawesome-icon-link-renderer.component";
import { DecimalPipe } from "@angular/common";
import { AgGridAngular } from "ag-grid-angular";
import { UtilityFunctionsService } from "src/app/services/utility-functions.service";
import { RoleEnum } from "src/app/shared/generated/enum/role-enum";
import { UserDetailedDto, UserService } from "src/app/shared/generated";

@Component({
    selector: "drooltool-user-list",
    templateUrl: "./user-list.component.html",
    styleUrls: ["./user-list.component.scss"],
})
export class UserListComponent implements OnInit, OnDestroy {
    @ViewChild("usersGrid") usersGrid: AgGridAngular;
    @ViewChild("unassignedUsersGrid") unassignedUsersGrid: AgGridAngular;

    public rowData = [];
    columnDefs: ColDef[];
    columnDefsUnassigned: ColDef[];
    users: UserDetailedDto[];
    unassignedUsers: UserDetailedDto[];

    constructor(
        private cdr: ChangeDetectorRef,
        private authenticationService: AuthenticationService,
        private utilityFunctionsService: UtilityFunctionsService,
        private userService: UserService,
        private decimalPipe: DecimalPipe
    ) {}

    ngOnInit() {
        this.authenticationService.getCurrentUser().subscribe((currentUser) => {
            this.userService.usersGet().subscribe((users) => {
                let _decimalPipe = this.decimalPipe;

                this.columnDefs = [
                    {
                        headerName: "",
                        field: "UserID",
                        cellRenderer: FontAwesomeIconLinkRendererComponent,
                        cellRendererParams: {
                            inRouterLink: "/users/",
                            fontawesomeIconName: "tasks",
                        },
                        sortable: false,
                        filter: false,
                        width: 40,
                    },
                    {
                        headerName: "Name",
                        valueGetter: function (params: any) {
                            return {
                                LinkValue: params.data.UserID,
                                LinkDisplay: params.data.FullName,
                            };
                        },
                        cellRenderer: LinkRendererComponent,
                        cellRendererParams: { inRouterLink: "/users/" },
                        filterValueGetter: function (params: any) {
                            return params.data.FullName;
                        },
                        comparator: function (id1: any, id2: any) {
                            let link1 = id1.LinkDisplay;
                            let link2 = id2.LinkDisplay;
                            if (link1 < link2) {
                                return -1;
                            }
                            if (link1 > link2) {
                                return 1;
                            }
                            return 0;
                        },
                        sortable: true,
                        filter: true,
                        flex: 1
                    },
                    {
                        headerName: "Email",
                        field: "Email",
                        sortable: true,
                        filter: true,
                        flex: 1
                    },
                    {
                        headerName: "Role",
                        field: "RoleDisplayName",
                        sortable: true,
                        filter: true,
                        flex: 1
                    },
                    {
                        headerName: "Receives System Communications?",
                        field: "ReceiveSupportEmails",
                        valueGetter: function (params) {
                            return params.data.ReceiveSupportEmails
                                ? "Yes"
                                : "No";
                        },
                        sortable: true,
                        filter: true,
                        flex: 1
                    },
                ];

                this.columnDefs.forEach((x) => {
                    x.resizable = true;
                });

                this.rowData = users;
                this.users = users;

                this.unassignedUsers = users.filter((u) => {
                    return u.RoleID === RoleEnum.Unassigned;
                });

                this.cdr.detectChanges();
            });
        });
    }

    ngOnDestroy() {
        this.cdr.detach();
    }

    public exportToCsv() {
        // we need to grab all columns except the first one (trash icon)
        let columnsKeys = this.usersGrid.columnApi.getAllDisplayedColumns();
        let columnIds: Array<any> = [];
        columnsKeys.forEach((keys) => {
            let columnName: string = keys.getColId();
            columnIds.push(columnName);
        });
        columnIds.splice(0, 1);
        this.utilityFunctionsService.exportGridToCsv(
            this.usersGrid,
            "users.csv",
            columnIds
        );
    }
}
