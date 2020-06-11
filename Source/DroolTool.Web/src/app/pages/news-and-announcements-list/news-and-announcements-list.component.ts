import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { UserDto } from 'src/app/shared/models/user/user-dto';
import { GridOptions } from 'ag-grid-community';
import { NewsAndAnnouncementsService } from 'src/app/services/news-and-announcements/news-and-announcements.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DatePipe } from '@angular/common';
import { CellRendererComponent } from 'ag-grid-community/dist/lib/components/framework/componentTypes';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NewsAndAnnouncementsDto } from 'src/app/shared/models/news-and-announcements/news-and-announcements-dto';
import { NewsAndAnnouncementsUpsertDto } from 'src/app/shared/models/news-and-announcements/news-and-announcements-upsert-dto';

@Component({
  selector: 'drooltool-news-and-announcements-list',
  templateUrl: './news-and-announcements-list.component.html',
  styleUrls: ['./news-and-announcements-list.component.scss']
})
export class NewsAndAnnouncementsListComponent implements OnInit {

  @ViewChild('newsAndAnnouncementsGrid') newsAndAnnouncementsGrid: AgGridAngular;

  public upsertTitle:string;
  public upsertDate:Date;
  public upsertLink:string;
  imageSrc:string;
  myForm = new FormGroup({
    title: new FormControl(this.upsertTitle, [Validators.required]),
    date: new FormControl(this.upsertDate, [Validators.required]),
    image: new FormControl('', [Validators.required]),
    link: new FormControl(this.upsertLink)
  });

  private watchUserChangeSubscription: any;
  private currentUser: UserDto;

  public gridOptions: GridOptions;
  public newsAndAnnouncements = [];
  public closeResult: string;
  public modalReference: NgbModalRef;
  columnDefs: any;
  fileToUpload: any;

  constructor(private cdr: ChangeDetectorRef,
    private authenticationService: AuthenticationService,
    private newsAndAnnouncementsService: NewsAndAnnouncementsService,
    private modalService: NgbModal,
    private datePipe: DatePipe) { }

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
        { headerName: 'Title', field: 'Title', sortable: true, filter: true, width: 150 },
        {
          headerName: 'Date', field: 'Date', valueFormatter: function (params) {
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
          sortable: true, filter: 'agDateColumnFilter', width: 150
        },
        { headerName: 'Link', field: 'Link', sortable: true, filter: true, width: 150},
        { headerName: 'Last Updated By', field: 'LastUpdatedByUser', valueGetter: function (params: any) {
          return params.data.LastUpdatedByUser.FullName;
        },  sortable: true, filter: true, width: 120 },
        { headerName: 'Last Updated Date', field: 'LastUpdatedDate', valueFormatter: function (params) {
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
        sortable: true, filter: 'agDateColumnFilter', width: 150
      }
      ];

      this.columnDefs.forEach(x => {
        x.resizable = true;
      });
    });
  }

  get f(){
    return this.myForm.controls;
  }

  ngOnDestroy() {
    this.watchUserChangeSubscription.unsubscribe();
    this.authenticationService.dispose();
    this.cdr.detach();
  }

  onFileChange(event) {
    const reader = new FileReader();
    
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
    
      reader.onload = () => {  
        this.imageSrc = reader.result as string;
        this.fileToUpload = event.target.files.item(0);
      };
   
    }
  }

  public updateGridData() {
    this.newsAndAnnouncementsService.getNewsAndAnnouncements().subscribe(result => {
      this.newsAndAnnouncementsGrid.api.setRowData(result);
    });
  }

  public launchModal(modalContent: any) {
    this.modalReference = this.modalService.open(modalContent, { ariaLabelledBy: 'addNewModalTitle', backdrop: 'static', keyboard: false });
    this.modalReference.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed`;// ${this.getDismissReason(reason)}`;
    });
  }

  public onSubmit() {
    if (this.myForm.valid) {
      console.log(this.myForm);
      let upsertDto = new NewsAndAnnouncementsUpsertDto({Title:this.upsertTitle, Date:this.upsertDate, Link:this.upsertLink});
      this.newsAndAnnouncementsService.upsertNewsAndAnnouncements(this.fileToUpload, upsertDto).subscribe(result => {
        console.log('yay');
      });
    }
    else {
      Object.keys(this.myForm.controls).forEach(field => {
        const control = this.myForm.get(field);            
        control.markAsTouched({ onlySelf: true });       
      });
    }
  }
}