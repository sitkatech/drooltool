import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaterAccountsChartComponent } from './water-accounts-chart.component';

describe('WaterAccountsChartComponent', () => {
  let component: WaterAccountsChartComponent;
  let fixture: ComponentFixture<WaterAccountsChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaterAccountsChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaterAccountsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
