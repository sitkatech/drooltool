import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StylizedDropdownComponent } from './stylized-dropdown.component';

describe('StylizedDropdownComponent', () => {
  let component: StylizedDropdownComponent;
  let fixture: ComponentFixture<StylizedDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StylizedDropdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StylizedDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
