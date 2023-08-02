import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'drooltool-stylized-dropdown',
  templateUrl: './stylized-dropdown.component.html',
  styleUrls: ['./stylized-dropdown.component.scss']
})
export class StylizedDropdownComponent implements OnInit {

  @Input() options: Array<any> = new Array<any>();
  @Input() disabled: Boolean;
  @Input() showInstructions: Boolean;
  @Input() heading: string;

  @Input()
  get selectedOption(): any {
    return this.selectedOptionValue
  }

  set selectedOption(val: any) {
    this.selectedOptionValue = val;
    this.selectedOptionChange.emit(this.selectedOptionValue);
  }

  selectedOptionValue: any;

  @Output() selectedOptionChange: EventEmitter<any> = new EventEmitter();
  @Output() showInstructionsTriggered: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

}
