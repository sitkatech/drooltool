export class FeedbackDto{
    public FeedbackName?: string;
    public FeedbackEmail?: string;
    public FeedbackPhoneNumber?: string;
    public FeedbackContent: string;

    constructor(obj?: any){
        Object.assign(this, obj);
    }
}