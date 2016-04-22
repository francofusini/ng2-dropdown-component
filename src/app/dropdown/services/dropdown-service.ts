import {Injectable} from "angular2/core";
import {ItemModel} from "./item-model";
import {SearchPipe} from "../pipes/search-pipe";
import {SelectedPipe} from "../pipes/selected-pipe";
import {OrderByPipe} from "../pipes/orderby-pipe";

@Injectable()
export class DropdownService {
  constructor() { }
  
  items: ItemModel[] = [
    new ItemModel("1", "Dotto"),
    new ItemModel("2", "Brontolo"),
    new ItemModel("3", "Pisolo"),
    new ItemModel("4", "Mammolo"),
    new ItemModel("5", "Gongolo"),
    new ItemModel("6", "Eolo"),
    new ItemModel("7", "Cucciolo")
  ]

  // Selects an item
  selectItem(item: ItemModel) {
    if (!item.selected) {
      const i = this.items.indexOf(item);
      const selected = true;
      const date = new Date();
      const cursor = false;
      const selectedItem = Object.assign({}, item, { selected, date, cursor });

      this.items = [
        ...this.items.slice(0, i),
        selectedItem,
        ...this.items.slice(i + 1)
      ];
    }
  }

  // Deselects an item
  deselectItem(item: ItemModel) {
    const i = this.items.indexOf(item);
    const selected = false;
    const date = null;
    const deselectedItem = Object.assign({}, item, { selected, date });

    this.items = [
      ...this.items.slice(0, i),
      deselectedItem,
      ...this.items.slice(i + 1)
    ];
  }

  // Toggles item selection
  toggleItem(item: ItemModel) {
    const i = this.items.indexOf(item);
    const selected = !item.selected;
    const date = selected ? new Date() : null;
    const cursor = false;
    const toggledItem = Object.assign({}, item, { selected, date, cursor });

    this.items = [
      ...this.items.slice(0, i),
      toggledItem,
      ...this.items.slice(i + 1)
    ];
  }

  // Adds an option to the dropdown list
  addItem(item: ItemModel) {
    this.items = [...this.items, item];
  }
  
  // Removes an option from the dropdown list
  removeItem(item: ItemModel) {
    const i = this.items.indexOf(item);
    this.items = [
      ...this.items.slice(0, i),
      ...this.items.slice(i + 1)
    ];
  }

  // Move cursor on a certain option
  cursorItem(item: ItemModel) {
    // Uncursor current cursored item
    const cursoredItems = this.items.filter((item) => item.cursor);
    if (cursoredItems.length > 0) {
      const i = this.items.indexOf(cursoredItems[0]);
      const cursor = false;
      const uncorsoredItem = Object.assign({}, cursoredItems[0], { cursor });

      this.items = [
        ...this.items.slice(0, i),
        uncorsoredItem,
        ...this.items.slice(i + 1)
      ];
    }

    // Cursor requested item
    if (item !== null) {
      const i = this.items.indexOf(item);
      const cursor = true;
      const cursoredItem = Object.assign({}, item, { cursor });

      this.items = [
        ...this.items.slice(0, i),
        cursoredItem,
        ...this.items.slice(i + 1)
      ];
    } 
  }
  
  manageKey = {
    // Selects cursored option or cursors first option
    Enter: function (self, $event) {
      if (self.items.length > 0) {
        // Select current cursored item
        var cursoredItems = self.items.filter((item) => item.cursor);
        if (cursoredItems.length > 0) {
          self.selectItem(cursoredItems[0]);
        } else {
          // Cursor first selectable item
          var selectableItems = new SearchPipe()
            .transform(self.items, [$event.input.value])
            .filter((item) => !item.selected);
          if (selectableItems.length > 0) {
            self.cursorItem(selectableItems[0]);
          }
        }
      }
    },

    // Hides drop
    Escape: function (self, $event) {
    },
    
    // Deselect last selected item
    Backspace: function (self, $event) {
      if ($event.term === '') {
        var selectedItems = new OrderByPipe().transform(
          new SelectedPipe().transform(
            self.items, [true]
          ), ['date']
        );
        if (selectedItems.length > 0) {
          self.deselectItem(selectedItems[selectedItems.length - 1]);
        }
      }
    },

    // Cursors next selectable item
    ArrowDown: function (self, $event) {
      this.Arrow(self, $event, 'Down');
    },
    ArrowRight: function (self, $event) {
      this.Arrow(self, $event, 'Right');
    },

    // Cursors previous selectable item
    ArrowUp: function (self, $event) {
      this.Arrow(self, $event, 'Up');
    },
    ArrowLeft: function (self, $event) {
      this.Arrow(self, $event, 'Left');
    },

    // Internal function of arrows management
    Arrow: function (self, $event, direction) {
      var indexModifier = ['Down', 'Right'].indexOf(direction) >= 0 ? 1 : -1;
      var cursoredItems = self.items.filter((item) => item.cursor);
      var selectableItems = new SearchPipe()
        .transform(self.items, [$event.input.value])
        .filter((item) => !item.selected);
      if (cursoredItems.length > 0) {
        if (selectableItems.length > 1 || (selectableItems.length > 0 && selectableItems.indexOf(cursoredItems[0]) < 0)) {
          var i = selectableItems.indexOf(cursoredItems[0]);
          self.cursorItem(selectableItems[
            Math.abs((selectableItems.length + (i + indexModifier)) % selectableItems.length)
          ]);
        }
      } else if (selectableItems.length > 0) {
        self.cursorItem(selectableItems[0]);
      }
    }
  }

  // Invoked on <search-renderer> input keyup
  onKeyEvent($event) {
    console.log($event);
    if (this.manageKey[$event.$event.code]) {
      this.manageKey[$event.$event.code](this, $event);
    }
  }
}
