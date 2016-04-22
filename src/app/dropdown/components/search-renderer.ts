import {Component, Input, Output, EventEmitter} from "angular2/core";

@Component({
  selector: 'search-renderer',
  styleUrls: ['app/dropdown/components/search-renderer.min.css'],
  template: `
    <li class="search">
      <input #input type="text" 
      (input)="update.emit(input.value)"
      (click)="active.emit(true)"
      (blur)="active.emit(false)"
      (keyup)="keyevent.emit($event)"
      (keydown)="keyevent.emit($event)"
      value={{value}}>
    </li>`
})
export class SearchRenderer {
  @Input() value;
  @Output() update = new EventEmitter();
  @Output() active = new EventEmitter();
  @Output() keyevent = new EventEmitter();

  ngOnInit() {
    this.update.emit('');
  }
}
