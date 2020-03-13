import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NotFoundComponent } from './pages';
import { HeaderNavComponent } from './components';
import { UnauthenticatedComponent } from './pages/unauthenticated/unauthenticated.component';
import { SubscriptionInsufficientComponent } from './pages/subscription-insufficient/subscription-insufficient.component';
import { NgProgressModule } from '@ngx-progressbar/core';
import { RouterModule } from '@angular/router';
import { LinkRendererComponent } from './components/ag-grid/link-renderer/link-renderer.component';
import { FontAwesomeIconLinkRendererComponent } from './components/ag-grid/fontawesome-icon-link-renderer/fontawesome-icon-link-renderer.component';
import { MultiLinkRendererComponent } from './components/ag-grid/multi-link-renderer/multi-link-renderer.component';
import { SelectDropDownModule } from 'ngx-select-dropdown';

@NgModule({
    declarations: [
        HeaderNavComponent,
        NotFoundComponent,
        UnauthenticatedComponent,
        SubscriptionInsufficientComponent,
        LinkRendererComponent,
        FontAwesomeIconLinkRendererComponent,
        MultiLinkRendererComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        NgProgressModule,
        RouterModule,
        SelectDropDownModule,
    ],
    exports: [
        CommonModule,
        FormsModule,
        NotFoundComponent,
        HeaderNavComponent,
    ],
    entryComponents:[
    ]
})
export class SharedModule {
    static forRoot() {
        return {
            ngModule: SharedModule,
            providers: []
        };
    }

    static forChild() {
        return {
            ngModule: SharedModule,
            providers: []
        };
    }
}
