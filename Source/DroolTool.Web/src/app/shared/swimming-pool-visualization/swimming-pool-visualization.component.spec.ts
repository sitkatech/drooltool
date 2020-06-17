import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SwimmingPoolVisualizationComponent } from './swimming-pool-visualization.component';

describe('SwimmingPoolVisualizationComponent', () => {
  let component: SwimmingPoolVisualizationComponent;
  let fixture: ComponentFixture<SwimmingPoolVisualizationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SwimmingPoolVisualizationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwimmingPoolVisualizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
