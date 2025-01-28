import { Component, Output } from '@angular/core';
import { EventEmitter } from 'protractor';

@Component({
  selector: 'footer-nav',
  templateUrl: './footer-nav.component.html',
  styleUrls: ['./footer-nav.component.scss']
})
export class FooterNavComponent {
    public login(event: Event): void {
        event.preventDefault();
    }
}
