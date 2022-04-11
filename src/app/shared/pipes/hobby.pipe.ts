import { Pipe, PipeTransform } from '@angular/core';
import {AbstractControl, FormGroup} from "@angular/forms";

@Pipe({
  name: 'hobbyPipe'
})
export class HobbyPipe implements PipeTransform {

  transform(value: AbstractControl): FormGroup {
    return value as FormGroup;
  }
}