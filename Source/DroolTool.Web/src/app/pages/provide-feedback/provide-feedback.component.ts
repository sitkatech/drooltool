import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FeedbackDto } from 'src/app/shared/models/feedback-dto';
import { Alert } from 'src/app/shared/models/alert';
import { AlertContext } from 'src/app/shared/models/enums/alert-context.enum';
import { AlertService } from 'src/app/shared/services/alert.service';
import { FeedbackService } from 'src/app/services/feedback/feedback.service';
import { ReCaptchaV3Service} from 'ng-recaptcha';
import { CustomRichTextType } from 'src/app/shared/models/enums/custom-rich-text-type.enum';
import { Router } from '@angular/router';

@Component({
  selector: 'drooltool-provide-feedback',
  templateUrl: './provide-feedback.component.html',
  styleUrls: ['./provide-feedback.component.scss']
})
export class ProvideFeedbackComponent implements OnInit {
  public customRichTextTypeID : number = CustomRichTextType.ProvideFeedback;

  public feedbackForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl('', [Validators.email]),
    phone: new FormControl('', [Validators.maxLength(20)]),
    content: new FormControl('', [Validators.required])
  });
  isPerformingAction: boolean;

  constructor(private feedbackService: FeedbackService,
    private alertService: AlertService,
    private recaptchaV3Service: ReCaptchaV3Service,
    private router: Router) { }

  ngOnInit(): void {
  }

  get f() {
    return this.feedbackForm.controls;
  }

  public onSubmit() {
    if (this.feedbackForm.valid) {
      this.recaptchaV3Service.execute('submitFeedback').subscribe(token => {
        let feedbackDto = new FeedbackDto(
          {
            FeedbackName: this.feedbackForm.get('name').value,
            FeedbackEmail: this.feedbackForm.get('email').value,
            FeedbackPhoneNumber: this.feedbackForm.get('phone').value,
            FeedbackContent: this.feedbackForm.get('content').value
          });
        this.isPerformingAction = true;
        this.feedbackService.provideFeedback(feedbackDto, token).subscribe(result => {
          this.isPerformingAction = false;
          this.alertService.pushAlert(new Alert(`Feedback successfully submitted, thank you!`, AlertContext.Success, true));
          this.feedbackForm.reset();
        }, error => {
          this.isPerformingAction = false;
          this.alertService.pushAlert(new Alert(`There was an error submitting feedback. Please try again`, AlertContext.Danger, true));
          this.alertService.pushAlert(new Alert(error.error, AlertContext.Danger, true));
        });
      }, error => {
        this.isPerformingAction = false;
        this.alertService.pushAlert(new Alert(`There was an error performing Recaptcha validation. Please try again`, AlertContext.Danger, true));
      });
    }
    else {
      Object.keys(this.feedbackForm.controls).forEach(field => {
        const control = this.feedbackForm.get(field);
        control.markAsTouched({ onlySelf: true });
      });
    }
  }

  public redirectToHome() {
    this.router.navigate(['/']);
  }

}
