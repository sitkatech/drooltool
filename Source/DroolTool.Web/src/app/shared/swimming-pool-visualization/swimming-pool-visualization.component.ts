import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'drooltool-swimming-pool-visualization',
  templateUrl: './swimming-pool-visualization.component.html',
  styleUrls: ['./swimming-pool-visualization.component.scss']
})
export class SwimmingPoolVisualizationComponent implements OnInit {

  @Input("numberOfPools") numberOfPools: number;

  maxIndividualPools = 12;

  constructor() { }

  ngOnInit(): void {
  }

  public array(n){
    return Array(Math.floor(n));
  }

  public showAllPools(): boolean {
    return Math.floor(this.numberOfPools) <= this.maxIndividualPools;
  }

  public integerPools(): number{
    return Math.floor(this.numberOfPools);
  }

}
