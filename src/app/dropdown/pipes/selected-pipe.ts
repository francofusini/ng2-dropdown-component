import {Pipe} from "angular2/core";

@Pipe({
  name: "selected"
})
export class SelectedPipe {
  transform(value, [selected]) {
    return value.filter((option) => option.selected === selected);
  }
}