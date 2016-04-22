import {bootstrap} from "angular2/platform/browser";
import {Component} from "angular2/core";
import {Control} from "angular2/common";
import {DropdownList} from "./dropdown/components/dropdown-list";

@Component({
  selector: 'app',
  directives: [DropdownList],
  providers: [],
  template: `
      <div>
        <dropdown-list></dropdown-list>
      </div>`
})
class App { }

bootstrap(App);
