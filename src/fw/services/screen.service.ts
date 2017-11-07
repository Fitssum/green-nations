import { HostListener, Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable() //this will let Angular know that we are possibly inject things into our constructor
export class ScreenService {
  private resizeSource = new Subject<null>(); //resizeSource is a subject which is similar to observable but is capable of firing of events eg. next() method (right below) will send out a message to subscribers of the subject
  resize$ = this.resizeSource.asObservable(); // resize$ is a public property. It is a convention that is used to show that something is in observable and can be subscribed to.

  //public properties
  largeBreakpoint = 800;
  screenWidth = 1000;
  screenHeight = 800;

  constructor() {

    //try and catch blocks are used to access the window object
    try {
      this.screenWidth = window.innerWidth;
      this.screenHeight = window.innerHeight;
      window.addEventListener('resize', (event) => this.onResize(event)); //arrow function to handle the 'this' key word at the bottom
    }
    catch (e) {
      //we're going with default screen dimensions
    }
  }

  isLarge() : boolean {
    return this.screenWidth >= this.largeBreakpoint;
  }

  onResize($event) : void {
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
    this.resizeSource.next();
  }
}
