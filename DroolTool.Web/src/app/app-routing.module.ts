import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent, UnauthenticatedComponent, SubscriptionInsufficientComponent } from './shared/pages';
import { UnauthenticatedAccessGuard } from './shared/guards/unauthenticated-access/unauthenticated-access.guard';
import { ManagerOnlyGuard } from "./shared/guards/unauthenticated-access/manager-only-guard";
import { UserListComponent } from './pages/user-list/user-list.component';
import { HomeIndexComponent } from './pages/home/home-index/home-index.component';
import { UserDetailComponent } from './pages/user-detail/user-detail.component';
import { UserEditComponent } from './pages/user-edit/user-edit.component';
import { LoginCallbackComponent } from './pages/login-callback/login-callback.component';
import { CreateUserCallbackComponent } from './pages/create-user-callback/create-user-callback.component';
import { UserInviteComponent } from './pages/user-invite/user-invite.component';
import { NeighborhoodExplorerComponent } from './pages/neighborhood-explorer/neighborhood-explorer.component';
import { AboutComponent } from './pages/about/about.component';
import { TakeActionComponent } from './pages/take-action/take-action.component';
import { WatershedExplorerComponent } from './pages/watershed-explorer/watershed-explorer.component';
import { HelpComponent } from './pages/help/help.component';
import { FactSheetComponent } from './pages/fact-sheet/fact-sheet.component';
import { AnnouncementListComponent } from './pages/announcement-list/announcement-list.component';
import { ProvideFeedbackComponent } from './pages/provide-feedback/provide-feedback.component';

const routes: Routes = [
  { path: "users", component: UserListComponent, canActivate: [UnauthenticatedAccessGuard, ManagerOnlyGuard]},
  { path: "users/:id", component: UserDetailComponent, canActivate: [UnauthenticatedAccessGuard, ManagerOnlyGuard] },
  { path: "users/:id/edit", component: UserEditComponent, canActivate: [UnauthenticatedAccessGuard, ManagerOnlyGuard] },
  { path: "news-and-announcements", component: AnnouncementListComponent, canActivate: [UnauthenticatedAccessGuard, ManagerOnlyGuard]},
  { path: "invite-user", component: UserInviteComponent, canActivate: [UnauthenticatedAccessGuard, ManagerOnlyGuard] },
  { path: "feedback", component:ProvideFeedbackComponent, canActivate: [UnauthenticatedAccessGuard] },
  { path: "neighborhood-explorer", component: NeighborhoodExplorerComponent, canActivate: [UnauthenticatedAccessGuard] },
  { path: "watershed-explorer", component: WatershedExplorerComponent, canActivate: [UnauthenticatedAccessGuard] },
  { path: ":id/fact-sheet", component: FactSheetComponent, canActivate: [UnauthenticatedAccessGuard] },
  { path: "take-action", component: TakeActionComponent, canActivate: [UnauthenticatedAccessGuard] },
  { path: "about", component: AboutComponent, canActivate: [UnauthenticatedAccessGuard] },
  { path: "help", component: HelpComponent, canActivate: [UnauthenticatedAccessGuard] },
  { path: "", component: HomeIndexComponent },
  { path: "signin-oidc", component: LoginCallbackComponent },
  { path: "create-user-callback", component: CreateUserCallbackComponent },
  { path: "not-found", component: NotFoundComponent },
  { path: 'subscription-insufficient', component: SubscriptionInsufficientComponent },
  { path: 'unauthenticated', component: UnauthenticatedComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
