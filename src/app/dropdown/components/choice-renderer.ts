import {Component, Input, Output, EventEmitter} from "angular2/core";

@Component({
  selector: 'choice-renderer',
  styleUrls: ['app/dropdown/components/choice-renderer.min.css'],
  template: `
    <li class="choice">
      <span>{{item.description}}
        <a class="deselect fa fa-remove"
        (click)="deselect.emit(item)"
        ></a>
      </span>
    </li>`
})
export class ChoiceRenderer {
  @Input() item;
  @Output() deselect = new EventEmitter();
}