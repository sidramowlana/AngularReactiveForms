# ReactiveForms

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.2.8.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


reactive approach training
app.component.ts
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  projectForm:FormGroup;
  
  ngOnInit(){

     this.projectForm = new FormGroup({
      'projectName': new FormControl(null,Validators.required,this.forbiddenName),
      'email':new FormControl(null,[Validators.required,Validators.email]),
      'projectStatus':new FormControl('stable')
     });
  }

  // forbiddenName(control:FormControl):{[s:string]:boolean} 
  // {
  //   if(control.value === 'Test')
  //   {
  //     return { 'nameIsForbidden': true };
  //   }
  //   return null;
  // }

  forbiddenName(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'test') {
          resolve({'nameIsForbidden': true });
        }
        else{
        resolve(null);
        }
      }, 1500);
    });
    return promise;
  }

  onSubmit()
  {
    console.log(this.projectForm)
  }
}

app.component.html
<div class="container">
  <div class="row">
    <div class="col-xs-12 col-sm-10 col-md-8 col-sm-offset-1 col-md-offset-2">
      <form [formGroup]="projectForm" (ngSubmit)="onSubmit()">
        <div class="form-group">
          <label for="projectNameId">Project name</label>
          <input class="form-control" id="projectNameId" type="text" formControlName="projectName">        

          <span class="help-block" *ngIf="!projectForm.get('projectName').valid && projectForm.get('projectName').touched">        
            <span class="help-block" *ngIf="projectForm.get('projectName').errors['nameIsForbidden']">This name is invalid!</span>
            <span class="help-block" *ngIf="projectForm.get('projectName').errors['required']">Please fill the field</span>
          </span>  
        </div>
        <div class="form-group">
          <label for="emailId"> Email</label>
          <input class="form-control" id="emailId" type="text" formControlName="email">
          <span class="help-block" *ngIf="!projectForm.get('email').valid && projectForm.get('email').touched">
            Please fill the field</span>

        </div>
        <div class="form-group">
          <label for="projectSatusId"> Project Status</label>
          <select class="form-control" id="projectNameId" type="text" formControlName="projectStatus">
            <option value="stable">Stable</option>
            <option value="critical">Critical</option>
            <option value="finished">Finished</option>
          </select>
        </div>
        <span class="help-block" *ngIf="!projectForm.valid && projectForm.touched">
          Please fill the field</span>
        <br>
        <button class="btn btn-primary" type="submit">Submit</button>
      </form>
    </div>
  </div>
</div>

app.componentn.css
input.ng-invalid.ng-touched{
    border: 1px solid red;
}

app.modules.ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
