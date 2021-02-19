import { FormGroup } from '@angular/forms';

export function ValidarPassword(controlName: string, matchingControlName: string, validar: boolean) {

    if (!validar){
        return;
    }
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];       

        if (matchingControl.errors && !matchingControl.errors.mustMatch) {           
            return;
        }        

        if (control.value !== matchingControl.value) {        
            matchingControl.setErrors({ mustMatch: true });
        } else {        
            matchingControl.setErrors(null);
        }
    }
}
