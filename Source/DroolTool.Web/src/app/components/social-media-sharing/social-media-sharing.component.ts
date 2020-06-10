import { Component, OnInit, HostListener, Input, ElementRef, Inject } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'drooltool-social-media-sharing',
  templateUrl: './social-media-sharing.component.html',
  styleUrls: ['./social-media-sharing.component.scss']
})
export class SocialMediaSharingComponent implements OnInit {
  innerWidth: number;
  bottom: string = null;

  @Input() platforms: Array<string> = ['facebook','twitter','linkedin','email','copy'];
  @Input() numItemsToShow: number = -1;

  constructor(private meta: Meta,
    @Inject(DOCUMENT) private document: Document) { }

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
    this.addOrRemoveSms();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
    this.addOrRemoveSms();
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event) {
    var rect = document.getElementsByTagName("footer")[0].getBoundingClientRect();
    if (this.innerWidth < 767) {
      this.bottom = rect.top < window.innerHeight && rect.bottom >= 0 ? (window.innerHeight - rect.top) + "px" : "10px";
    }
  }

  public addOrRemoveSms() {
    let index = this.platforms.indexOf('sms', 0);
    if (this.innerWidth > 767) {
      if (index > -1) {
        this.platforms.splice(index, 1);
      }
    }
    else {
      if (index == -1) {
        this.platforms.push('sms');
      }
    }
  }

  public getNumItemsToShow() {
    return this.innerWidth > 767 ? (this.numItemsToShow != -1 ? this.numItemsToShow : 5) : 0;
  }

}
