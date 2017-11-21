import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

import { ScreenService } from '../services/screen.service';

@Directive({selector: '[screenBelowLarge]'})
export class ScreenBelowLarge {
  private hasView = false;

  constructor(private viewContainer: ViewContainerRef,
              private template: TemplateRef<Object>,
              private secreenService: ScreenService) {
    screenService.resize$.subscribe(() => this.onResize());

  }

@Input()
set screenLarge(condition) {
  //ignore the passed function and set it based on screen size
  condition = this.screenService.screenWidth < this.screenService.largeBreakpoint;

  if (condition && !this.hasView) {
    this.hasView = true;
    this.viewContainer.createEmbeddedView(this.template);//adds template to the DOM
  } else if (!condition && this.hasView) {
    this.hasView = false;
    this.viewContainer.clear();
    }
  }

  onResize() {
    //triggers the setter
    this.screenLarge = false;
  }
}
