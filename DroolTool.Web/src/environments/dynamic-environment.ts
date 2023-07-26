declare var window: any;

export class DynamicEnvironment {
    private _production: boolean;

    constructor(_production: boolean){
        this._production = _production
    }

    public get production() {
        if (window.config) {
            return window.config.production;
        } else return this._production;
    }

    public get staging() {
        return window.config.staging;
    }

    public get dev() {
        return window.config.dev;
    }

    public get apiHostName() {
        return window.config.apiHostName;
    }

    public get createAccountUrl() {
        return window.config.createAccountUrl;
    }

    public get createAccountRedirectUrl() {
        return window.config.createAccountRedirectUrl;
    }

    public get keystoneSupportBaseUrl() {
        return window.config.keystoneSupportBaseUrl;
    }

    public get geoserverMapServiceUrl() {
        return window.config.geoserverMapServiceUrl;
    }

    public get keystoneAuthConfiguration() {
        return window.config.keystoneAuthConfiguration;
    }

    public get platformLongName(){
        return window.config.platformLongName;
    }

    public get platformShortName(){
        return window.config.platformShortName;
    }

    public get leadOrganizationLongName(){
        return window.config.leadOrganizationLongName;
    }

    public get leadOrganizationShortName(){
        return window.config.leadOrganizationShortName;
    }

    public get leadOrganizationHomeUrl(){
        return window.config.leadOrganizationHomeUrl;
    }

    public get leadOrganizationLogoFilename() {
        return window.config.leadOrganizationLogoFilename;
    }

    public get mapquestApiUrlWithNominatimApiKey() {
        return window.config.mapquestApiUrlWithNominatimApiKey;
    }

    public get recaptchaV3SiteKey() {
        //ng-recaptcha has certain  limitations, in  this case they only accept a  hard coded string as opposed to allowing for a promise
        //Check periodically to see  if this has changed, and when it has call window.config as opposed to using this
        return "6LdI1ccZAAAAAGy1g9fYofkqcp5gHGGr6cfO69JU";
    }
}