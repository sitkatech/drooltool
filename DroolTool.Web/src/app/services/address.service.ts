import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from '../shared/services';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  private _searchedAddressSubject: BehaviorSubject<string>;

    constructor(private apiService: ApiService) {
        let searchedAddressAsJson = window.localStorage.getItem('searchedAddress');
        let initialSearchedAddress = "My Selected Neighborhood";

        if (searchedAddressAsJson != null && searchedAddressAsJson != undefined && searchedAddressAsJson !== "undefined") {
            // if the saved account is valid for this user, make it the current active account. Otherwise clear it from local storage.
            initialSearchedAddress = JSON.parse(searchedAddressAsJson);
        }

        this._searchedAddressSubject = new BehaviorSubject<string>(initialSearchedAddress);
     }

    updateSearchedAddress(address: string) {
        window.localStorage.setItem('searchedAddress', JSON.stringify(address));
        this._searchedAddressSubject.next(address);
    }
}
