import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvideFeedbackComponent } from './provide-feedback.component';

describe('ProvideFeedbackComponent', () => {
  let component: ProvideFeedbackComponent;
  let fixture: ComponentFixture<ProvideFeedbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProvideFeedbackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProvideFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
