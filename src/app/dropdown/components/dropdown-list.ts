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
          [value]="term"
          (update)="term = $event"
          (active)="shown = $event"
          (keyevent)="onKeyEvent($event)"
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

  // Drop visibility status
  shown: Boolean = false; 

  // Current search
  term: string = ""; 

  // Invoked on <search-renderer> input keyup
  onKeyEvent($event) {
    var self = this;

    // Type key events management
    var typeCode = {
      "keyup": {
        // Selects cursored option or cursors first option
        Enter: function (self, $event) {
          if (self.shown) {
            if (self.dropdownService.items.length > 0) {
              // Select current cursored item
              var cursoredItems = self.dropdownService.items.filter((item) => item.cursor);
              if (cursoredItems.length > 0) {
                self.dropdownService.selectItem(cursoredItems[0]);
                self.shown = false;
                self.term = '';
              } else {
                // Cursor first selectable item
                var selectableItems = new SearchPipe()
                  .transform(self.dropdownService.items, [self.term])
                  .filter((item) => !item.selected);
                if (selectableItems.length > 0) {
                  self.dropdownService.cursorItem(selectableItems[0]);
                }
              }
            }
          } else {
            self.shown = true;
          }          
        },
        // Hides drop
        Escape: function (self, $event) {
          if (self.shown) self.shown = false;
          self.dropdownService.cursorItem(null);
        },
      },

      "keydown": {
        // Deselect last selected item
        Backspace: function (self, $event) {
          if (self.term === '') {
            var selectedItems = new OrderByPipe().transform(
              new SelectedPipe().transform(
                self.dropdownService.items, [true]
              ), ['date']
            );
            if (selectedItems.length > 0) {
              self.dropdownService.deselectItem(selectedItems[selectedItems.length - 1]);
            }
          }
        },
        // Cursors next selectable item
        ArrowDown: function (self, $event) {
          this.Arrow(self, $event, 'down');
        },
        ArrowRight: function (self, $event) {
          this.Arrow(self, $event, 'right');
        },
        // Cursors previous selectable item
        ArrowUp: function (self, $event) {
          this.Arrow(self, $event, 'up');
        },
        ArrowLeft: function (self, $event) {
          this.Arrow(self, $event, 'left');
        },
        // Internal function of arrows management
        Arrow: function (self, $event, direction) {
          if (self.shown) {
            var indexModifier = null;
            var limitLoop = false;
            switch (direction) {
              case 'down':
                indexModifier = 1;
                limitLoop = false;
                break;
              case 'up':
                indexModifier = -1;
                limitLoop = false;
                break;
              case 'right':
                indexModifier = 5;
                limitLoop = true;
                break;
              case 'left':
                indexModifier = -5;
                limitLoop = true;
                break;              
            }
            var cursoredItems = self.dropdownService.items.filter((item) => item.cursor);
            var selectableItems = new SearchPipe()
              .transform(self.dropdownService.items, [self.term])
              .filter((item) => !item.selected);
            if (cursoredItems.length > 0) {
              if (selectableItems.length > 1 || (selectableItems.length > 0 && selectableItems.indexOf(cursoredItems[0]) < 0)) {
                var i = selectableItems.indexOf(cursoredItems[0]);
                var index = i + indexModifier;
                if (index > selectableItems.length || index < 0) {
                  if (limitLoop) {
                    index = indexModifier > 0 ? selectableItems.length - 1 : 0;
                  } else {
                    index = index % selectableItems.length;
                  }
                }
                index = (selectableItems.length + index) % selectableItems.length;
                self.dropdownService.cursorItem(selectableItems[index]);             
              }
            } else if (selectableItems.length > 0) {
              self.dropdownService.cursorItem(indexModifier > 0 ?
                selectableItems[0] :
                selectableItems[selectableItems.length - 1]
              );
            }
          } else {
            self.shown = true;
          }
        },
        default: function (self, $event) {
          if (!self.shown) {
            self.show = true;
          }
        }
      }
    }

    // Method dispatcher
    var type = $event.type;
    var code = $event.code;
    if (typeCode[type][code]) {
      typeCode[type][code](self, $event);
    } else if (typeCode[type]['default']) {
      typeCode[type]['default'](self, $event);
    }

  }
}
