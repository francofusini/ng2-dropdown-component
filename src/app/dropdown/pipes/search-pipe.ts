import {Pipe} from "angular2/core";

@Pipe({
  name: "search"
})
export class SearchPipe {
  transform(value, [term]) {
    return value.filter((option) => option.description.search(new RegExp(term, 'i')) >= 0);
  }
}