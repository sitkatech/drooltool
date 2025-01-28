import { NgModule, ModuleWithProviders } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { HttpClientModule, HttpClientJsonpModule } from "@angular/common/http";
import { NotFoundComponent } from "./pages";
import { HeaderNavComponent } from "./components";
import { UnauthenticatedComponent } from "./pages/unauthenticated/unauthenticated.component";
import { SubscriptionInsufficientComponent } from "./pages/subscription-insufficient/subscription-insufficient.component";
import { RouterModule } from "@angular/router";
import { LinkRendererComponent } from "./components/ag-grid/link-renderer/link-renderer.component";
import { FontAwesomeIconLinkRendererComponent } from "./components/ag-grid/fontawesome-icon-link-renderer/fontawesome-icon-link-renderer.component";
import { MultiLinkRendererComponent } from "./components/ag-grid/multi-link-renderer/multi-link-renderer.component";
import { CustomRichTextComponent } from "./components/custom-rich-text/custom-rich-text.component";
import { StylizedDropdownComponent } from "./components/stylized-dropdown/stylized-dropdown.component";
import { SwimmingPoolVisualizationComponent } from "./swimming-pool-visualization/swimming-pool-visualization.component";
import { EditorModule, TINYMCE_SCRIPT_SRC } from "@tinymce/tinymce-angular";
import { FooterNavComponent } from './components/footer-nav/footer-nav.component';

@NgModule({
    declarations: [
        HeaderNavComponent,
        NotFoundComponent,
        UnauthenticatedComponent,
        SubscriptionInsufficientComponent,
        LinkRendererComponent,
        FontAwesomeIconLinkRendererComponent,
        MultiLinkRendererComponent,
        CustomRichTextComponent,
        StylizedDropdownComponent,
        SwimmingPoolVisualizationComponent,
        FooterNavComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        HttpClientJsonpModule,
        RouterModule,
        EditorModule,
    ],
    exports: [
        CommonModule,
        FormsModule,
        NotFoundComponent,
        HeaderNavComponent,
        CustomRichTextComponent,
        StylizedDropdownComponent,
        SwimmingPoolVisualizationComponent,
        EditorModule,
        FooterNavComponent
    ],
    providers: [
        {
            provide: TINYMCE_SCRIPT_SRC,
            useValue: "assets/tinymce/tinymce.min.js",
        },
    ],
})
export class SharedModule {
    static forRoot(): ModuleWithProviders<SharedModule> {
        return {
            ngModule: SharedModule,
            providers: [],
        };
    }

    static forChild(): ModuleWithProviders<SharedModule> {
        return {
            ngModule: SharedModule,
            providers: [],
        };
    }
}
