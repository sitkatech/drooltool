export class NewsAndAnnouncementsUpsertDto{

    public NewsAndAnnouncementsID?: number;
    public Title:string;
    public Link?: string;
    public Date: Date;

    constructor(obj?: any){
        Object.assign(this, obj);
    }
}
