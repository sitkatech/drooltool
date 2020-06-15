export class AnnouncementUpsertDto{

    public AnnouncementID?: number;
    public AnnouncementTitle:string;
    public AnnouncementLink?: string;
    public AnnouncementDate: Date;

    constructor(obj?: any){
        Object.assign(this, obj);
    }
}
