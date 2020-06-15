import { Component, OnInit, ViewChild, ChangeDetectorRef, ViewChildren, QueryList, Inject } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { UserDto } from 'src/app/shared/models/user/user-dto';
import { GridOptions } from 'ag-grid-community';
import { NewsAndAnnouncementsService } from 'src/app/services/news-and-announcements/news-and-announcements.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DatePipe, DOCUMENT } from '@angular/common';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NewsAndAnnouncementsUpsertDto } from 'src/app/shared/models/news-and-announcements/news-and-announcements-upsert-dto';
import { FontAwesomeIconLinkRendererComponent } from 'src/app/shared/components/ag-grid/fontawesome-icon-link-renderer/fontawesome-icon-link-renderer.component';
import { environment } from 'src/environments/environment';
import { Alert } from 'src/app/shared/models/alert';
import { AlertContext } from 'src/app/shared/models/enums/alert-context.enum';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'drooltool-news-and-announcements-list',
  templateUrl: './news-and-announcements-list.component.html',
  styleUrls: ['./news-and-announcements-list.component.scss']
})
export class NewsAndAnnouncementsListComponent implements OnInit {

  @ViewChild('newsAndAnnouncementsGrid') newsAndAnnouncementsGrid: AgGridAngular;
  @ViewChild('upsertNewsAndAnnouncementsEntity') upsertEntity: any;
  @ViewChild('deleteNewsAndAnnouncementsEntity') deleteEntity: any;
  @ViewChildren('fileInput') public fileInput: QueryList<any>;

  public dayOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  public months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ]

  public newsAndAnnouncementsTitle: string;
  public newsAndAnnouncementsDate: string;
  public newsAndAnnouncementsLink: string;
  public newsAndAnnouncementsID: number = -1;
  public imageSrc: string;
  public upsertForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    date: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required]),
    link: new FormControl('')
  });

  private watchUserChangeSubscription: any;
  private currentUser: UserDto;

  public gridOptions: GridOptions;
  public newsAndAnnouncements = [];
  public closeResult: string;
  public modalReference: NgbModalRef;
  public allowableFileTypes = ["png", "jpg", "jpeg", "jfif", "bmp", "gif"];
  public maximumFileSizeMB = 30;
  public isPerformingAction = false;
  public columnDefs: any;
  public fileToUpload: any;

  constructor(private cdr: ChangeDetectorRef,
    private authenticationService: AuthenticationService,
    private alertService: AlertService,
    private newsAndAnnouncementsService: NewsAndAnnouncementsService,
    private modalService: NgbModal,
    private datePipe: DatePipe,
    @Inject(DOCUMENT) private document: Document) { }

  ngOnInit() {
    this.watchUserChangeSubscription = this.authenticationService.currentUserSetObservable.subscribe(currentUser => {
      this.gridOptions = <GridOptions>{};
      this.currentUser = currentUser;
      let _datePipe = this.datePipe;
      this.newsAndAnnouncementsGrid.api.showLoadingOverlay();
      this.newsAndAnnouncementsService.getNewsAndAnnouncements().subscribe(newsAndAnnouncements => {
        this.newsAndAnnouncements = newsAndAnnouncements;
        this.newsAndAnnouncementsGrid.api.hideOverlay();
        this.cdr.detectChanges();
      });

      this.columnDefs = [
        {
          cellRendererFramework: FontAwesomeIconLinkRendererComponent,
          cellRendererParams: { isSpan: true, fontawesomeIconName: 'trash' },
          sortable: false, filter: false, width: 35
        },
        {
          cellRendererFramework: FontAwesomeIconLinkRendererComponent,
          cellRendererParams: { isSpan: true, fontawesomeIconName: 'pencil-square-o' },
          sortable: false, filter: false, width: 38
        },
        { headerName: 'Title', field: 'Title', sortable: true, filter: true, width: 150 },
        {
          headerName: 'Date', field: 'Date', valueFormatter: function (params) {
            return _datePipe.transform(params.value, "M/d/yyyy", "UTC")
          },
          filterValueGetter: function (params: any) {
            return _datePipe.transform(params.data.Date, "M/d/yyyy");
          },
          filterParams: {
            // provide comparator function
            comparator: function (filterLocalDate, cellValue) {
              var dateAsString = cellValue;
              if (dateAsString == null) return -1;
              var cellDate = Date.parse(dateAsString);
              const filterLocalDateAtMidnight = filterLocalDate.getTime();
              if (filterLocalDateAtMidnight == cellDate) {
                return 0;
              }
              if (cellDate < filterLocalDateAtMidnight) {
                return -1;
              }
              if (cellDate > filterLocalDateAtMidnight) {
                return 1;
              }
            }
          },
          comparator: function (id1: any, id2: any) {
            if (id1.value < id2.value) {
              return -1;
            }
            if (id1.value > id2.value) {
              return 1;
            }
            return 0;
          },
          sortable: true, filter: 'agDateColumnFilter', width: 150
        },
        { headerName: 'Link', field: 'Link', sortable: true, filter: true, width: 300 },
        {
          headerName: 'Last Updated By', field: 'LastUpdatedByUser', valueGetter: function (params: any) {
            return params.data.LastUpdatedByUser.FullName;
          }, sortable: true, filter: true, width: 200
        },
        {
          headerName: 'Last Updated Date', field: 'LastUpdatedDate', valueFormatter: function (params) {
            return _datePipe.transform(params.value, "M/d/yyyy")
          },
          filterValueGetter: function (params: any) {
            return _datePipe.transform(params.data.Date, "M/d/yyyy");
          },
          filterParams: {
            // provide comparator function
            comparator: function (filterLocalDate, cellValue) {
              var dateAsString = cellValue;
              if (dateAsString == null) return -1;
              var cellDate = Date.parse(dateAsString);
              const filterLocalDateAtMidnight = filterLocalDate.getTime();
              if (filterLocalDateAtMidnight == cellDate) {
                return 0;
              }
              if (cellDate < filterLocalDateAtMidnight) {
                return -1;
              }
              if (cellDate > filterLocalDateAtMidnight) {
                return 1;
              }
            }
          },
          comparator: function (id1: any, id2: any) {
            if (id1.value < id2.value) {
              return -1;
            }
            if (id1.value > id2.value) {
              return 1;
            }
            return 0;
          },
          sortable: true, filter: 'agDateColumnFilter', width: 200
        }
      ];

      this.columnDefs.forEach(x => {
        x.resizable = true;
      });
    });
  }

  get f() {
    return this.upsertForm.controls;
  }

  ngOnDestroy() {
    this.watchUserChangeSubscription.unsubscribe();
    this.authenticationService.dispose();
    this.cdr.detach();
  }

  onFileChange(event) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      let incorrectFileType = !this.allowableFileTypes.some(x => `image/${x}` == file.type);
      //returns bytes, but I'd rather not handle a constant that's a huge value
      let exceedsMaximumSize = (file.size / 1024 / 1024) > this.maximumFileSizeMB;
      this.fileToUpload = event.target.files.item(0);

      if (!incorrectFileType && !exceedsMaximumSize) {
        reader.readAsDataURL(file);

        reader.onload = () => {
          this.imageSrc = reader.result as string;
        };
      }
      else {
        this.upsertForm.get('image').setErrors({ 'requiredFileType': incorrectFileType, 'fileSize': exceedsMaximumSize });
        this.upsertForm.get('image').markAsTouched();
      }
    }
  }

  public updateGridData() {
    this.newsAndAnnouncementsService.getNewsAndAnnouncements().subscribe(result => {
      this.newsAndAnnouncementsGrid.api.setRowData(result);
    });
  }

  public launchModal(modalContent: any, modalTitle: string) {
    this.modalReference = this.modalService.open(modalContent, { ariaLabelledBy: modalTitle, beforeDismiss: () => this.checkIfSubmitting(), backdrop: 'static', keyboard: false });
    this.modalReference.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed`;
    });
  }

  public openModalForNewNewsAndAnnouncementsEntity() {
    this.clearFormAndResetImageSrc();
    this.setImageCategoryValidators();
    this.launchModal(this.upsertEntity, 'upsertModalTitle');
  }

  public onCellClicked(event: any) {
    if (event.column.colId != "0" && event.column.colId != "1") {
      return null;
    }

    this.clearFormAndResetImageSrc();
    let data = event.data;
    this.newsAndAnnouncementsTitle = data.Title;
    this.newsAndAnnouncementsDate = data.Date;
    this.newsAndAnnouncementsLink = data.Link;
    this.imageSrc = `https://${environment.apiHostName}/FileResource/${data.FileResourceGUIDAsString}`;
    this.newsAndAnnouncementsID = data.NewsAndAnnouncementsID;

    if (event.column.colId == "0") {
      let date = new Date(this.newsAndAnnouncementsDate);
      this.newsAndAnnouncementsDate = `${this.dayOfWeek[date.getUTCDay()]}, <br/> ${this.months[date.getUTCMonth()]} ${date.getUTCDate()}, ${date.getUTCFullYear()}`
      this.launchModal(this.deleteEntity, 'deleteNewsAndAnnouncementsEntity')
    }
    else {
      this.upsertForm.patchValue({ title: this.newsAndAnnouncementsTitle });
      this.upsertForm.patchValue({ date: this.formatDateForNgbDatepicker(this.newsAndAnnouncementsDate) });
      this.upsertForm.patchValue({ link: this.newsAndAnnouncementsLink });
      this.setImageCategoryValidators();
      this.launchModal(this.upsertEntity, 'upsertModalTitle')
    }
  }

  public clearFormAndResetImageSrc() {
    this.upsertForm.reset();
    this.fileToUpload = null;
    this.imageSrc = null;
    this.newsAndAnnouncementsID = -1;
  }

  public setImageCategoryValidators() {
    if (this.newsAndAnnouncementsID != -1) {
      this.upsertForm.get('image').setValidators(null);
    }
    else {
      this.upsertForm.get('image').setValidators([Validators.required]);
    }
  }

  public formatDateForNgbDatepicker(date: string): any {
    let dateToChange = new Date(date);
    return { year: dateToChange.getUTCFullYear(), month: dateToChange.getUTCMonth() + 1, day: dateToChange.getUTCDate() };
  }

  public onSubmit() {
    if (this.upsertForm.valid) {

      var date = this.upsertForm.get('date').value;
      let upsertDate = `${date["year"]}-${date["month"]}-${date["day"]}`;
      let upsertDto = new NewsAndAnnouncementsUpsertDto(
        {
          NewsAndAnnouncementsID: this.newsAndAnnouncementsID,
          Title: this.upsertForm.get('title').value,
          Date: upsertDate,
          Link: this.upsertForm.get('link').value
        });
      this.isPerformingAction = true;
      this.newsAndAnnouncementsService.upsertNewsAndAnnouncements(this.fileToUpload, upsertDto).subscribe(result => {
        this.modalReference.close();
        this.isPerformingAction = false;
        this.alertService.pushAlert(new Alert(`Successfully ${this.newsAndAnnouncementsID != -1 ? "updated" : "created"} post`, AlertContext.Success, true));
        this.updateGridData();
      }, error => {
        this.modalReference.close();
        this.isPerformingAction = false;
        this.alertService.pushAlert(new Alert(`There was an error ${this.newsAndAnnouncementsID != -1 ? "updating" : "creating"} the post. Please try again`, AlertContext.Danger, true));
      });
    }
    else {
      Object.keys(this.upsertForm.controls).forEach(field => {
        const control = this.upsertForm.get(field);
        control.markAsTouched({ onlySelf: true });
      });
    }
  }

  public onDelete() {
    this.isPerformingAction = true;
    this.newsAndAnnouncementsService.deleteNewsAndAnnouncements(this.newsAndAnnouncementsID).subscribe(result => {
      this.modalReference.close();
      this.isPerformingAction = false;
      this.alertService.pushAlert(new Alert(`Successfully deleted post`, AlertContext.Success, true));
      this.updateGridData();
    }, error => {
      this.modalReference.close();
      this.isPerformingAction = false;
      this.alertService.pushAlert(new Alert(`There was an error deleting the post. Please try again`, AlertContext.Danger, true));
    })
  }

  public checkIfSubmitting() {
    return !this.isPerformingAction;
  }

  public clickFileInput() {
    this.document.getElementById("image").click();
  }
}
