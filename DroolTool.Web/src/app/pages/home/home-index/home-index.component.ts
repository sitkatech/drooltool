import { Component, OnInit, OnDestroy, ElementRef, Inject, AfterViewInit, HostListener } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { environment } from 'src/environments/environment';
import { DOCUMENT, Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { Meta } from '@angular/platform-browser';
import { RoleEnum } from 'src/app/shared/generated/enum/role-enum';
import { AnnouncementService, UserDto } from 'src/app/shared/generated';

@Component({
    selector: 'app-home-index',
    templateUrl: './home-index.component.html',
    styleUrls: ['./home-index.component.scss']
})
export class HomeIndexComponent implements OnInit, OnDestroy {
    
    public currentUser: UserDto;
    public node:any;

    public slides;

    // public slides = [
    //     {
    //         date: "Wednesday, <br/> March 2, 2020",
    //         title: "Join Fix A Leak Week Through March",
    //         image: "./assets/home/news-and-updates-1.jpg"
    //     },
    //     {
    //         date: "Friday, <br/> March 19, 2020",
    //         title: "Landscape Workshop",
    //         image: "./assets/home/news-and-updates-2.jpg"
    //     }
    // ];
    public slideConfig = {
        "dots": false,
        "slidesToShow": 2,
        "slidesToScroll": 2,
        "arrows": false,
        "prevArrow": "<button type='button' class='prev'><i class='fas fa-chevron-left' aria-hidden='true'></i></button>",
        "nextArrow": "<button type='button' class='next'><i class='fas fa-chevron-right' aria-hidden='true'></i></button>",
        "responsive": [
            {
                "breakpoint": 1200,
                "settings": {
                    "slidesToShow": 1,
                    "slidesToScroll": 1,
                    "dots": true,
                    "arrows": true
                }
            },
            //although we only really have space for one, leave arrows on this size to help show it's a carousel
            {
                "breakpoint": 768,
                "settings": {
                    "slidesToShow": 1,
                    "slidesToScroll": 1,
                    "dots": true
                }
            },
            {
                "breakpoint": 470,
                "settings": {
                    "slidesToShow": 1,
                    "slidesToScroll": 1,
                    "dots": true
                }
            }
        ]

    };

    constructor(private authenticationService: AuthenticationService,
        @Inject(DOCUMENT) private document: Document,
        private router: Router,
        private route: ActivatedRoute,
        private meta: Meta,
        private activatedRoute: ActivatedRoute,
        private location: Location,
        private announcementService: AnnouncementService) {
    }

    public ngOnInit(): void {
        this.route.queryParams.subscribe(params => {
            //We're logging in
            if (params.hasOwnProperty("code")) {
                this.router.navigate(["/signin-oidc"], { queryParams : params });
                return;
            }

            if (localStorage.getItem("loginOnReturn")) {
                localStorage.removeItem("loginOnReturn");
                this.authenticationService.login();
            }
    
            //We were forced to logout or were sent a link and just finished logging in
            if (this.authenticationService.getAuthRedirectUrl()) {
                this.router.navigateByUrl(this.authenticationService.getAuthRedirectUrl())
                    .then(() => {
                        this.authenticationService.clearAuthRedirectUrl();
                    });
            }
    
            this.authenticationService.getCurrentUser().subscribe(currentUser => {
                this.currentUser = currentUser;
            });

        });

        this.announcementService.announcementGetAnnouncementsForHomepageGet().subscribe(results => {
            this.slides = results.map((x) => {
                return {
                    date: x.AnnouncementDate,
                    title: x.AnnouncementTitle,
                    image: `https://${environment.apiHostName}/FileResource/${x.FileResourceGUIDAsString}`,
                    link: x.AnnouncementLink
                }
            })
        })
    }

    ngOnDestroy(): void {
        
    }

    public showSlides(): boolean {
        return this.slides && this.slides.length > 0 ? true : false;
    }

    public userIsUnassigned() {
        if (!this.currentUser) {
            return false; // doesn't exist != unassigned
        }

        return this.currentUser.Role.RoleID === RoleEnum.Unassigned;
    }

    public userRoleIsDisabled() {
        if (!this.currentUser) {
            return false; // doesn't exist != unassigned
        }

        return this.currentUser.Role.RoleID === RoleEnum.Disabled;
    }

    public isUserAnAdministrator() {
        return this.authenticationService.isUserAnAdministrator(this.currentUser);
    }

    public platformLongName(): string {
        return environment.platformLongName;
    }

    public platformShortName(): string {
        return environment.platformShortName;
    }

    public leadOrganizationShortName(): string {
        return environment.leadOrganizationShortName;
    }

    public leadOrganizationLongName(): string {
        return environment.leadOrganizationLongName;
    }

    public leadOrganizationHomeUrl(): string {
        return environment.leadOrganizationHomeUrl;
    }

    slickInit(e) {
        console.log('slick initialized');
    }

    public breakpoint(e) {
        // console.log('breakpoint');
    }

    public afterChange(e) {
        // console.log('afterChange');
    }

    public beforeChange(e) {
        // console.log('beforeChange');
    }
}
