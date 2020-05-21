import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin, Subscription } from 'rxjs';
import { UserDto } from 'src/app/shared/models/user/user-dto';
import { NeighborhoodService } from 'src/app/services/neighborhood/neighborhood.service';

@Component({
  selector: 'drooltool-fact-sheet',
  templateUrl: './fact-sheet.component.html',
  styleUrls: ['./fact-sheet.component.scss']
})
export class FactSheetComponent implements OnInit {

  public searchedAddress:string = "My Selected Neighborhood";
  public subscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private neighborhoodService: NeighborhoodService
  ) {
    this.subscription = neighborhoodService.getSearchedAddress().subscribe(address => {console.log(address); this.searchedAddress = address ?? "My Selected Neighborhood"});
   }

  ngOnInit() {
    const id = parseInt(this.route.snapshot.paramMap.get("id"));
    if (id) {
      
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
