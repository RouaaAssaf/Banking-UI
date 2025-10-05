import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';


@Directive({ selector: '[appHighlight]' })
export class HighlightDirective implements OnChanges {
@Input('appHighlight') value?: number;
@Input() threshold = 1000; // default threshold


constructor(private el: ElementRef, private rnd: Renderer2) {}


ngOnChanges(changes: SimpleChanges) {
const v = +this.value!;
if (!isNaN(v) && v >= this.threshold) {
this.rnd.setStyle(this.el.nativeElement, 'boxShadow', '0 0 0 3px rgba(0,150,136,0.12)');
this.rnd.setStyle(this.el.nativeElement, 'borderRadius', '8px');
} else {
this.rnd.removeStyle(this.el.nativeElement, 'boxShadow');
}
}
}