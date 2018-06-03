import {Directive, Input, TemplateRef, ViewContainerRef} from '@angular/core';

export class RepeatContext {
  constructor(public index: number) {}
}

@Directive({
  selector: '[appRepeat]'
})
export class AppRepeatDirective {
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef) {
  }

  @Input() set appRepeat(count: number) {
    if (count > this.viewContainerRef.length) {
      const diff = count - this.viewContainerRef.length;
      for (let i = 0; i < diff; ++i) {
        const repeatContext = new RepeatContext(this.viewContainerRef.length);
        this.viewContainerRef.createEmbeddedView(this.templateRef, repeatContext);
      }
    } else if (count < this.viewContainerRef.length) {
      const diff = this.viewContainerRef.length - count;
      for (let i = 0; i < diff; ++i) {
        this.viewContainerRef.remove(this.viewContainerRef.length - 1);
      }
    }
  }
}
