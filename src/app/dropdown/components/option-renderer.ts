import {Component, Input, Output, EventEmitter} from "angular2/core";

@Component({
  selector: 'option-renderer',
  styleUrls: ['app/dropdown/components/option-renderer.min.css'],
  template: `
    <li 
    [ngClass]="{'active-result': !item.selected, 'result-selected': item.selected, 'cursor': item.cursor}"
    [attr.disabled]="item.selected"
    (mousedown)="select.emit(item)"
    >
      <span [innerHTML]="underline(item.description)"></span>
    </li>`
})
export class OptionRenderer {
  @Input() item;
  @Input() term;
  @Output() select = new EventEmitter();

  underline(value) {
    if (this.term) {
      var re = new RegExp(this.term, 'ig');
      var match = value.match(re);
      var split = value.split(re);
      var value = split[0];
      for (var i = 1; i < split.length; i++) {
        value += '<span style="text-decoration: underline">' + match[i - 1] + '</span>' + split[i];
      }
    }
    return value;
  }

}
