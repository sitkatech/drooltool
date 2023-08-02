import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DroolPerLandscapedAcreChartComponent } from './drool-per-landscaped-acre-chart.component';

describe('DroolPerLandscapedAcreChartComponent', () => {
  let component: DroolPerLandscapedAcreChartComponent;
  let fixture: ComponentFixture<DroolPerLandscapedAcreChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DroolPerLandscapedAcreChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DroolPerLandscapedAcreChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
