import { Component, OnInit } from '@angular/core';
import { NewColonist, Job } from '../models';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  ValidatorFn,
  AbstractControl
}from '@angular/forms';
import {Router} from '@angular/router';

import{ ColonistAPIService } from '../apiService/colonist';
import { JobsAPIService } from '../apiService/jobs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [ColonistAPIService, JobsAPIService]
})

export class RegisterComponent implements OnInit {

 
  marsJob: Job[];
  registerForm: FormGroup;
  submitted: boolean; 
  errorMessage : string;

  constructor(private colonistApiService: ColonistAPIService,
              private jobsAPIService: JobsAPIService,
              private router: Router) {

              
this.submitted = false;

this.getMarsJobs();

this.registerForm = new FormGroup({
  name: new FormControl('', [Validators.required, Validators.maxLength(100)]),
  age: new FormControl('', [Validators.required, this.acceptAge(16, 50)]),
  job_id: new FormControl('', [Validators.required]),
  });

  }

  acceptAge(min: number, max: number) {
    return (control: AbstractControl): { [key: string]: any } => {
      if (control.value < min || control.value > max) {
        return { 'Sorry incorrect age': { age: control.value } };
      }
    }
  }

  getMarsJobs(){
    this.jobsAPIService.getMarsJobs()
    .subscribe((result) => {
                console.log('got mars jobs', result);
                 this.marsJob = result;
    });

  }

  postNewColonist(event){
    event.preventDefault();
    console.log('Posting colonist...');
    this.submitted = true;

    if(this.registerForm.invalid){
    //the form is invalid
    console.log('form is invalid');
  }else{
    
    const name = this.registerForm.get('name').value;
    const age = this.registerForm.get('age').value;
    const job_id = this.registerForm.get('job_id').value;


    //this step creates an object called colonistPostRequest
    //which contains a key:value pair (key='colonist') which itself contains
    //the actual new colinist object
    //this is required so the payload matches what is expected by the server
    const colonistPostRequest = { colonist: new NewColonist(name,age,job_id) }
    //     {
    //     "colonist" : {
    //         "name" : "Mackenzie",
    //         "age" : "33",
    //         "job_id" : "1"
    //     }
    // }

    this.colonistApiService.saveColonist( colonistPostRequest )
    .subscribe(
      result => {
        console.log(result);
        console.log("this should be an id -> ", result.id);

        //store the user's ID in local storage
        localStorage.setItem('colonistID', result.id.toString());

        this.router.navigate(['/encounters']);
      },
      error =>  {this.errorMessage = <any>error}
    );
  }

}

ngOnInit() {

}

}
