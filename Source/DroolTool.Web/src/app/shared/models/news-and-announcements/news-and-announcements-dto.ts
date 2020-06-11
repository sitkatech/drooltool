import { UserSimpleDto } from '../user/user-simple-dto';

export class NewsAndAnnouncementsDto{

    public NewsAndAnnouncementsID: number;
    public Title:string;
    public Link?: string;
    public Date: Date;
    public LastUpdatedByUser:UserSimpleDto;
    public LastUpdatedDate: Date;
    public FileResourceGUIDAsString: string;

    constructor(obj?: any){
        Object.assign(this, obj);
    }
}
