import { AbstractControl, FormGroup } from "@angular/forms";

export function PasswordValidator(control: AbstractControl): {[key: string]: boolean} | null {
    const password = control.get('password')
    const confirmedPassword= control.get('confirmed_password')
    if(password?.pristine || confirmedPassword?.pristine){
        return null
    }
    return password && confirmedPassword && password?.value !== confirmedPassword?.value ? {'misMatch': true} : null;
}

export function comparePasswords(fb: FormGroup){
    let passwordCtrl = fb.get('confirmed_password')

    if(passwordCtrl?.errors == null || 'Mismatch' in passwordCtrl.errors){
      if(fb.get('password')?.value != passwordCtrl?.value )
        passwordCtrl?.setErrors({Mismatch: true})
      else 
        passwordCtrl?.setErrors(null)
    }
  }

  export function Validcondition(fb: FormGroup){
    let conditionCtrl = fb.get('conditions')

    if(conditionCtrl?.errors == null || 'condition' in conditionCtrl.errors){
      if(conditionCtrl?.value != true )
        conditionCtrl?.setErrors({condition: true})
      else 
        conditionCtrl?.setErrors(null)
    }
  }
