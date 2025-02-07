import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { Configuration } from './configuration';
import { HttpClient } from '@angular/common/http';


import { CustomRichTextService } from './api/custom-rich-text.service';
import { FeedbackService } from './api/feedback.service';
import { FileResourceService } from './api/file-resource.service';
import { NeighborhoodService } from './api/neighborhood.service';
import { RoleService } from './api/role.service';
import { SystemInfoService } from './api/system-info.service';
import { UserService } from './api/user.service';
import { WatershedMaskService } from './api/watershed-mask.service';

@NgModule({
  imports:      [],
  declarations: [],
  exports:      [],
  providers: [
    CustomRichTextService,
    FeedbackService,
    FileResourceService,
    NeighborhoodService,
    RoleService,
    SystemInfoService,
    UserService,
    WatershedMaskService,
     ]
})
export class ApiModule {
    public static forRoot(configurationFactory: () => Configuration): ModuleWithProviders<ApiModule> {
        return {
            ngModule: ApiModule,
            providers: [ { provide: Configuration, useFactory: configurationFactory } ]
        };
    }

    constructor( @Optional() @SkipSelf() parentModule: ApiModule,
                 @Optional() http: HttpClient) {
        if (parentModule) {
            throw new Error('ApiModule is already loaded. Import in your base AppModule only.');
        }
        if (!http) {
            throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
            'See also https://github.com/angular/angular/issues/20575');
        }
    }
}
