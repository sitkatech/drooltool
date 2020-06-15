import { UserSimpleDto } from '../user/user-simple-dto';

export class AnnouncementDto{

    public AnnouncementID: number;
    public AnnouncementTitle:string;
    public AnnouncementLink?: string;
    public AnnouncementDate: Date;
    public LastUpdatedByUser:UserSimpleDto;
    public LastUpdatedDate: Date;
    public FileResourceGUIDAsString: string;

    constructor(obj?: any){
        Object.assign(this, obj);
    }
}
