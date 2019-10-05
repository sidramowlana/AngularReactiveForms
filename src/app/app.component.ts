import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormArrayName } from '@angular/forms';
import { Observable } from 'rxjs';
import { reject } from 'q';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  signUpForm: FormGroup;
  forbiddenUserNames = ['Test', 'Mix'];
  forbiddenEmails=['a@gmail.com','b@gmail.com'];

  ngOnInit() {
    this.signUpForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, [Validators.required, this.forbiddenName.bind(this)]),
        'email': new FormControl(null, [Validators.required, Validators.email],this.forbiddenEmail)
      }),
      "hobbies": new FormArray([], Validators.required),
      'gender': new FormControl('female')
    });
    // this.signUpForm.valueChanges.subscribe((value)=>
    // {
    //   console.log(value);
    // });
    this.signUpForm.statusChanges.subscribe((status)=>
    {
      console.log(status);
    });
    this.signUpForm.setValue({
      'userData':{
        'username':'Sidra',
        'email':'sidra@gmail.com'
      },
      'hobbies':[],
      'gender':'female'
    });
    this.signUpForm.patchValue({
      'userData':{
        'username':'Sid',
      }
    });
  }
  reset(){
    this.signUpForm.reset();
    this.signUpForm.patchValue({
      'gender':'female'

    });
  }
  onSubmit() {
    console.log(this.signUpForm);
    // this.signUpForm.reset();
  }
  onAddHobbies() {
    const hobbyControl = new FormControl(null, Validators.required);// creating a new control
    (<FormArray>this.signUpForm.get('hobbies')).push(hobbyControl); //pushing the new control inside the formArray 
  }
  forbiddenName(control: FormControl): { [s: string]: boolean } {
    // for(let a of this.forbiddenUserNames)
    // {
    //   if(a === control.value)
    //   {
    //     return {'nameIsForbidden':true};

    //   }
    //   return null;
    // }
    // if(this.forbiddenUserNames.indexOf(control.value)) actually retrun -1 which means it says that the name is not found in the array of forbiddenUserNames
    if (this.forbiddenUserNames.indexOf(control.value) !== -1) //checking if the name is found in the array
    // if(control.value ==='Max')
    {
      return { 'nameIsForbidden': true };
    }
    return null;
  }

  forbiddenEmail(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'test@gmail.com') {
          // if(this.forbiddenEmails.indexOf(control.value) !== -1){
          resolve({'emailIsForbidden': true });
        }
        else{
        resolve(null);
        }
      }, 1500);
    });
    return promise;
  }
}
