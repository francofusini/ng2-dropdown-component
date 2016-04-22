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

    const cursoredItems = this.items.filter((item) => item.cursor);
    const i = cursoredItems.length > 0 ? this.items.indexOf(cursoredItems[0]) : null;
    const k = item ? this.items.indexOf(item) : null;

    if (!(i == k)) {

      // Uncursor current cursored item
      if (cursoredItems.length > 0) {
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
        const k = this.items.indexOf(item);
        const cursor = true;
        const cursoredItem = Object.assign({}, item, { cursor });

        this.items = [
          ...this.items.slice(0, k),
          cursoredItem,
          ...this.items.slice(k + 1)
        ];
      }
    }
  }
}
