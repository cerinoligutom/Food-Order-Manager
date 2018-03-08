import { Component, OnInit, Input } from '@angular/core';

import {
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Component({
  selector: 'fom-input',
  templateUrl: './animated-input.component.html',
  styleUrls: ['./animated-input.component.scss'],
  providers: [
    {provide: NG_VALUE_ACCESSOR, useExisting: FomComponent, multi: true}
  ]
})
export class FomComponent implements OnInit {

  @Input() type: string;
  @Input() name: string;
  @Input() required: boolean;


  constructor() { }

  ngOnInit() {
    console.log(this.type);
  }




}
