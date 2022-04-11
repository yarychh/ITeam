import { AbstractControl } from "@angular/forms";

export class EmailValidator {

    static uniqEmail(control: AbstractControl): Promise<any>{
        return new Promise(resolve => {
            setTimeout(()=>{
                if (control.value == "test@test.test"){
                    resolve({
                        uniqEmail: true
                    });
                }else{
                    resolve(null);
                };
            }, 2000)
        })
    }
}