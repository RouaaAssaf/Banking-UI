import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appHighlight]', // the name you use in HTML
  standalone: true,
})
export class HighlightDirective implements OnInit {
  @Input() appHighlight: boolean = false; // condition to activate highlight

  constructor(private el: ElementRef) {}

  ngOnInit() {
    if (this.appHighlight) {
      this.el.nativeElement.style.backgroundColor = '#ffdddd';
      this.el.nativeElement.style.border = '1px solid red';
      this.el.nativeElement.style.borderRadius = '4px';
      this.el.nativeElement.style.padding = '2px 4px';
    }
  }
}
