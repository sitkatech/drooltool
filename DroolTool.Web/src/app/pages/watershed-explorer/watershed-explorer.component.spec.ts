import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WatershedExplorerComponent } from './watershed-explorer.component';

describe('WatershedExplorerComponent', () => {
  let component: WatershedExplorerComponent;
  let fixture: ComponentFixture<WatershedExplorerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WatershedExplorerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WatershedExplorerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
