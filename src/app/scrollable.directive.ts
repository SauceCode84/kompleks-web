import { Directive, ElementRef, EventEmitter, Output, HostListener } from "@angular/core";

@Directive({
  selector: "[scrollable]"
})
export class ScrollableDirective {

  @Output("scrollPosition")
  scrollPosition = new EventEmitter();

  constructor(public el: ElementRef) { }

  @HostListener("scroll", ["$event"])
  onScroll(event) {
    try {
      let top: number = event.target.scrollTop;
      let height: number = this.el.nativeElement.scrollHeight;
      let offset: number = this.el.nativeElement.offsetHeight;

      if (top > height - offset - 1) {
        this.scrollPosition.emit("bottom");
      }

      if (top === 0) {
        this.scrollPosition.emit("top");
      }
    } catch (err) {
      console.error("ScrollableDirective.onScroll", err);
    }
  }

}
