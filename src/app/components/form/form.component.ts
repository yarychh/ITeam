import { Component, DoCheck, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Framework } from 'src/app/shared/interfaces/framework.interface';
import { EmailValidator } from 'src/app/shared/validators/email.validator';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit, DoCheck {
  form!: FormGroup;
  frameworks: Array<Framework> = [
    {
      name: 'Angular',
      versions: ['1.1.1', '1.2.1', '1.3.3'],
    },
    {
      name: 'React',
      versions: ['2.1.2', '3.2.4', '4.3.1'],
    },
    {
      name: 'Vue',
      versions: ['3.3.1', '5.2.1', '5.1.2'],
    },
  ];
  framework!: AbstractControl | null;
  versions: any = [];
  disabled: boolean = false;
  

  constructor( private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      firstName: new FormControl('', [
        Validators.minLength(2),
        Validators.required,
      ]),

      lastName: new FormControl('', [
        Validators.minLength(2),
        Validators.required,
      ]),

      dateOfBirth: new FormControl('', Validators.required),

      framework: new FormControl('', Validators.required),

      frameworkVersion: new FormControl('', Validators.required),

      email: new FormControl(
        '',
        [Validators.email, Validators.required],
        EmailValidator.uniqEmail
      ),

      hobby: this.fb.array([])
    });
  }

  ngDoCheck(): void {
    this.getFramework();
    if(this.form.invalid || this.hobby.length < 1){
      this.disabled = true;
    }else{
      this.disabled = false;
    }
  }

  get hobby(){
    return this.form.controls["hobby"] as FormArray;
  }

  private getFramework() {
    if (this.framework !== null) {
      this.framework = this.form.get('framework');
      this.versions = this.frameworks.find(
        (frame) => frame.name == this.framework?.value)?.versions;
    }
  }

  public addHobby() {
    const hobbyForm = this.fb.group({
      name: new FormControl("", Validators.required),
      duration: new FormControl("", Validators.required)
    });
    this.hobby.push(hobbyForm as FormGroup);
  }

  public submit() {
    if (this.form.valid && !this.disabled){
      let formatedDate = this.form.get("dateOfBirth")?.value
      this.form.get('dateOfBirth')?.patchValue(`${formatedDate.getDate()}-${formatedDate.getMonth()+1}-${formatedDate.getFullYear()}`)
      console.log(this.form.value);
    }
  }
}
