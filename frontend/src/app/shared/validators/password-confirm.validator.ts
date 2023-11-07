import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export function confirmPasswordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return control.value.password && control.value.confirmPassword && control.value.password  === control.value.confirmPassword  ? {
      passwordConfirm: true
    } : {
      passwordConfirm: false
    };

  }
}
