import { Pipe } from 'angular2/core';

@Pipe({
  name: 'objToArr',
  pure: false
})
export class ObjToArr {
  transform(object: any) {
    var newArray = [];
    for (var key in object) {
      newArray.push(object[key]);
    }
    return newArray;
  }
}
