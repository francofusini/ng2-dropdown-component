import {Component, Input, Output} from "angular2/core";
import {DropdownService} from "../services/dropdown-service";
import {OptionRenderer} from "./option-renderer";
import {ChoiceRenderer} from "./choice-renderer";
import {SearchRenderer} from "./search-renderer";
import {SelectedPipe} from "../pipes/selected-pipe";
import {SearchPipe} from "../pipes/search-pipe";
import {OrderByPipe} from "../pipes/orderby-pipe";

@Component({
  selector: 'dropdown-list',
  pipes: [SelectedPipe, SearchPipe, OrderByPipe],
  directives: [OptionRenderer, ChoiceRenderer, SearchRenderer],
  providers: [DropdownService],
  styleUrls: ['app/dropdown/components/dropdown-list.min.css'],
  template: `
    <div class="container">
      <ul class="choices">
        <choice-renderer *ngFor="#item of dropdownService.items 
          | selected : true | orderby : 'date'"
          [item]="item"
          (deselect)="dropdownService.deselectItem($event)"
        ></choice-renderer>
        <search-renderer 
          (update)="term = $event"
          (active)="shown = $event"
          (keyevent)="dropdownService.onKeyEvent({
            $event: $event.$event, input: $event.input, term: term, shown: shown
          })"
        ></search-renderer>
      </ul>
      <div *ngIf="shown" class="drop">
        <ul class="results">
          <option-renderer 
            *ngFor="#item of dropdownService.items 
            | search : term"
            [item]="item"
            [term]="term"
            (select)="dropdownService.selectItem($event)"
          ></option-renderer>
        </ul>
      <div>
    </div>`
})
export class DropdownList {  
  constructor(public dropdownService: DropdownService) { }
}
