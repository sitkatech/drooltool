import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { OAuthModule, OAuthStorage } from 'angular-oauth2-oidc';
import { CookieService } from 'ngx-cookie-service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './shared/interceptors/auth-interceptor';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { HomeIndexComponent } from './pages/home/home-index/home-index.component';
import { UserListComponent } from './pages/user-list/user-list.component';
import { AlertDisplayComponent } from './shared/components/alert-display/alert-display.component';
import { RouterModule } from '@angular/router';
import { UserInviteComponent } from './pages/user-invite/user-invite.component';
import { UserDetailComponent } from './pages/user-detail/user-detail.component';
import { UserEditComponent } from './pages/user-edit/user-edit.component';
import { AgGridModule } from 'ag-grid-angular';
import { DecimalPipe, CurrencyPipe, DatePipe } from '@angular/common';
import { LinkRendererComponent } from './shared/components/ag-grid/link-renderer/link-renderer.component';
import { Ng5SliderModule } from 'ng5-slider';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { SlickCarouselModule} from 'ngx-slick-carousel';
import { FontAwesomeIconLinkRendererComponent } from './shared/components/ag-grid/fontawesome-icon-link-renderer/fontawesome-icon-link-renderer.component';
import { LoginCallbackComponent } from './pages/login-callback/login-callback.component';
import { HelpComponent } from './pages/help/help.component';
import { SelectDropDownModule } from 'ngx-select-dropdown'
import { MultiLinkRendererComponent } from './shared/components/ag-grid/multi-link-renderer/multi-link-renderer.component';
import { CreateUserCallbackComponent } from './pages/create-user-callback/create-user-callback.component';
import { AboutComponent } from './pages/about/about.component';
import { AppInitService } from './app.init';
import { NeighborhoodExplorerComponent } from './pages/neighborhood-explorer/neighborhood-explorer.component';
import { TakeActionComponent } from './pages/take-action/take-action.component';
import { WatershedExplorerComponent } from './pages/watershed-explorer/watershed-explorer.component';
import { FactSheetComponent } from './pages/fact-sheet/fact-sheet.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { DroolPerLandscapedAcreChartComponent } from './components/drool-per-landscaped-acre-chart/drool-per-landscaped-acre-chart.component';
import { WaterAccountsChartComponent } from './components/water-accounts-chart/water-accounts-chart.component';
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';
import { ShareButtonsPopupModule } from 'ngx-sharebuttons/popup'
import { SocialMediaSharingComponent } from './components/social-media-sharing/social-media-sharing.component';
import { AnnouncementListComponent } from './pages/announcement-list/announcement-list.component'
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FaIconLibrary } from "@fortawesome/angular-fontawesome";
import { ProvideFeedbackComponent } from './pages/provide-feedback/provide-feedback.component'
import { RECAPTCHA_V3_SITE_KEY, RecaptchaV3Module } from 'ng-recaptcha';
import { environment } from 'src/environments/environment';
import { CookieStorageService } from './shared/services/cookies/cookie-storage.service';
import { ApiModule } from './shared/generated/api.module';
import { Configuration } from './shared/generated';

export function init_app(appLoadService: AppInitService) {
  return () => appLoadService.init();
}

@NgModule({
  declarations: [
    AlertDisplayComponent,
    AppComponent,
    HomeIndexComponent,
    UserListComponent,
    UserInviteComponent,
    UserDetailComponent,
    UserEditComponent,
    LoginCallbackComponent,
    HelpComponent,
    CreateUserCallbackComponent,
    AboutComponent,
    NeighborhoodExplorerComponent,
    TakeActionComponent,
    WatershedExplorerComponent,
    FactSheetComponent,
    DroolPerLandscapedAcreChartComponent,
    WaterAccountsChartComponent,
    SocialMediaSharingComponent,
    AnnouncementListComponent,
    ProvideFeedbackComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    NgbModule,
    RouterModule,
    OAuthModule.forRoot(),
    SharedModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    NgxChartsModule,
    BrowserAnimationsModule,
    AgGridModule.withComponents([]),
    SelectDropDownModule,
    SlickCarouselModule,
    Ng5SliderModule,
    NgxSpinnerModule,
    ShareButtonsModule.withConfig({
      moreButtonIcon: 'share-alt'
    }),
    ShareIconsModule,
    ShareButtonsPopupModule,
    RecaptchaV3Module,
    ApiModule.forRoot(() => {
      return new Configuration({
          basePath: `${environment.mainAppApiUrl}`,
      });
  })
  ],  
  providers: [
    CookieService,
    AppInitService,
    { provide: APP_INITIALIZER, useFactory: init_app, deps: [AppInitService], multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: RECAPTCHA_V3_SITE_KEY, useValue:environment.recaptchaV3SiteKey},
    DecimalPipe, CurrencyPipe, DatePipe,
    {
      provide: OAuthStorage,
      useClass: CookieStorageService
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(faIconLibrary: FaIconLibrary) {
    faIconLibrary.addIconPacks(fas);
  }
}
