import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'footer-nav',
  templateUrl: './footer-nav.component.html',
  styleUrls: ['./footer-nav.component.scss']
})
export class FooterNavComponent {

    @Output() public loginEvent: EventEmitter<any> = new EventEmitter<any>();
    public login(event: Event): void {
        event.preventDefault();
        this.loginEvent.emit();
    }
}
