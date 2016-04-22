export class ItemModel {
  constructor(
    public id: string = "",
    public description: string = "",
    public cursor: boolean = false,
    public selected: boolean = false,
    public date: Date = null
  ) { }
}
