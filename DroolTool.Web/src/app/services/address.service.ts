import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { isNullOrUndefined } from 'util';
import { ApiService } from '../shared/services';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  private _searchedAddressSubject: BehaviorSubject<string>;
      
    constructor(private apiService: ApiService) {
        let searchedAddressAsJson = window.localStorage.getItem('searchedAddress');
        let initialSearchedAddress = "My Selected Neighborhood";

        if (!isNullOrUndefined(searchedAddressAsJson) && searchedAddressAsJson !== "undefined") {
            // if the saved account is valid for this user, make it the current active account. Otherwise clear it from local storage.
            initialSearchedAddress = JSON.parse(searchedAddressAsJson);
        }

        this._searchedAddressSubject = new BehaviorSubject<string>(initialSearchedAddress);
     } 

    getSearchedAddress(): Observable<string> {
        return this._searchedAddressSubject.asObservable();
    }

    updateSearchedAddress(address: string) {
        window.localStorage.setItem('searchedAddress', JSON.stringify(address));
        this._searchedAddressSubject.next(address);
    }
}
