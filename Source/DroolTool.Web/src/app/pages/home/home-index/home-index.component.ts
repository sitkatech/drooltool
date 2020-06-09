import { Component, OnInit, OnDestroy, ElementRef, Inject, AfterViewInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { RoleEnum } from 'src/app/shared/models/enums/role.enum';
import { environment } from 'src/environments/environment';
import { UserDto } from 'src/app/shared/models/user/user-dto';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { DOCUMENT, Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { Meta } from '@angular/platform-browser';

@Component({
    selector: 'app-home-index',
    templateUrl: './home-index.component.html',
    styleUrls: ['./home-index.component.scss']
})
export class HomeIndexComponent implements OnInit, OnDestroy, AfterViewInit {
    public watchUserChangeSubscription: any;
    public currentUser: UserDto;
    public node:any;

    public slides = [
        {
            date: "Wednesday, <br/> March 2, 2020",
            title: "Join Fix A Leak Week Through March",
            image: "./assets/home/news-and-updates-1.jpg"
        },
        {
            date: "Friday, <br/> March 19, 2020",
            title: "Landscape Workshop",
            image: "./assets/home/news-and-updates-2.jpg"
        }
    ];
    public slideConfig = {
        "dots": false,
        "slidesToShow": 2,
        "slidesToScroll": 2,
        "arrows": false,
        "prevArrow": "<button type='button' class='prev'><i class='fas fa-chevron-left' aria-hidden='true'></i></button>",
        "nextArrow": "<button type='button' class='next'><i class='fas fa-chevron-right' aria-hidden='true'></i></button>",
        "responsive": [
            {
                "breakpoint": 991,
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
        private meta: Meta,
        private activatedRoute: ActivatedRoute,
        private location: Location) {
    }

    public ngOnInit(): void {
        if (localStorage.getItem("loginOnReturn")) {
            localStorage.removeItem("loginOnReturn");
            this.authenticationService.login();
        }
        this.watchUserChangeSubscription = this.authenticationService.currentUserSetObservable.subscribe(currentUser => {
            this.currentUser = currentUser;
        });
    }

    ngAfterViewInit(){
        this.prepareShareThis();
    }

    ngOnDestroy(): void {
        this.watchUserChangeSubscription.unsubscribe();
        this.clearShareThisAndMetaTags();
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

    public isUserALandowner() {
        return this.authenticationService.isUserALandOwner(this.currentUser);
    }

    public createAccount(): void {
        this.authenticationService.createAccount();
    }

    public forgotPasswordUrl(): string {
        return `${environment.keystoneSupportBaseUrl}/ForgotPassword`;
    }

    public forgotUsernameUrl(): string {
        return `${environment.keystoneSupportBaseUrl}/ForgotUsername`;
    }

    public keystoneSupportUrl(): string {
        return `${environment.keystoneSupportBaseUrl}/Support/20`;
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

    public prepareShareThis() {
        let el = this.document.getElementById("st-2");
        el.classList.add("display");

        //ShareThis can use these data properties to tell the social media platform how to render our link
        //https://sharethis.com/support/customization/customize-share-urls/
        el.dataset.url = window.location.href;
        el.dataset.title = "Urban Drool Tool";
        el.dataset.description = `Runoff from overwatering and car washing picks up fertilizer, bacteria, and other contaminants on
        its way to creeks and beaches. It starts in a gutter near you...This “Urban Drool” contributes to more than 1 million gallons of polluted discharge to
        Aliso Creek each day. But small changes in how you use water can eliminate drool and save you money. `;
        el.dataset.image = window.location.origin + "/assets/home/news-and-updates-1.jpg";

        //But I also don't trust it, so update our meta tags just in case
        this.meta.updateTag({name : 'og:title', content: 'Urban Drool Tool'});

        this.meta.updateTag({name : 'og:description', content: `Runoff from overwatering and car washing picks up fertilizer, bacteria, and other contaminants on
        its way to creeks and beaches. It starts in a gutter near you...This “Urban Drool” contributes to more than 1 million gallons of polluted discharge to
        Aliso Creek each day. But small changes in how you use water can eliminate drool and save you money. `});

        this.meta.updateTag({name : 'og:image', content: window.location.origin + "/assets/home/news-and-updates-1.jpg"})
    }

    public clearShareThisAndMetaTags() {
        this.document.getElementById("st-2").classList.remove("display");

        this.meta.removeTag("name='og:title'");
        this.meta.removeTag("name='og:description'");
        this.meta.removeTag("name='og:image'");

    }
}
