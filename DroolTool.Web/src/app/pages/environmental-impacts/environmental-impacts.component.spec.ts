import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvironmentalImpactsComponent } from './environmental-impacts.component';

describe('EnvironmentalImpactsComponent', () => {
  let component: EnvironmentalImpactsComponent;
  let fixture: ComponentFixture<EnvironmentalImpactsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EnvironmentalImpactsComponent]
    });
    fixture = TestBed.createComponent(EnvironmentalImpactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
