import {Pipe} from "angular2/core";

@Pipe({
  name: "orderby"
})
export class OrderByPipe {
  transform(value, [field]) {
    return value.sort((option1, option2) => option1[field] > option2[field]);
  }
}