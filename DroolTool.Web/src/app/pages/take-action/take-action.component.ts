import { Component, OnInit } from '@angular/core';
import { CustomRichTextTypeEnum } from 'src/app/shared/generated/enum/custom-rich-text-type-enum';

@Component({
  selector: 'drooltool-take-action',
  templateUrl: './take-action.component.html',
  styleUrls: ['./take-action.component.scss']
})
export class TakeActionComponent implements OnInit {
  public richTextTypeID : number = CustomRichTextTypeEnum.TakeAction;
  constructor() { }

  ngOnInit() {
  }

}
