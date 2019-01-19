import { Pipe, PipeTransform } from '@angular/core';
import { UserModel } from './userModel';

@Pipe({
  name: 'gender'
})
export class GenderPipe implements PipeTransform {

  transform(value: UserModel, args?: any): any {
    let x : any = value.gender;
    switch (x) {
      case 0:
      case "0":
        return "איש";
        break;
      case 1:
      case "1":
        return "אשה";
        break;
      default:
        return value.gender;
    }
  }

}
