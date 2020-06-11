import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsAndAnnouncementsListComponent } from './news-and-announcements-list.component';

describe('NewsAndAnnouncementsListComponent', () => {
  let component: NewsAndAnnouncementsListComponent;
  let fixture: ComponentFixture<NewsAndAnnouncementsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsAndAnnouncementsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsAndAnnouncementsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
