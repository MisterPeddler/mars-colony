import { Component, OnInit } from '@angular/core';
import { NewColonist, Job } from '../models';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  ValidatorFn,
  AbstractControl
} from '@angular/forms';
import { Router } from '@angular/router';

import { ColonistAPIService } from '../apiService/colonist';
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
  errorMessage: string;

  constructor(private colonistApiService: ColonistAPIService,
    private jobsAPIService: JobsAPIService,
    private router: Router) {

    //get the list of available jobs from the API
    this.getMarsJobs();

    //set up form validators
    this.registerForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      age: new FormControl('', [Validators.required, this.acceptAge(16, 50)]),
      job_id: new FormControl('', [Validators.required]),
    });
  }

  //only allow age form validation between a certain range
  acceptAge(min: number, max: number) {
    return (control: AbstractControl): { [key: string]: any } => {
      if (control.value < min || control.value > max) {
        return { 'Sorry incorrect age': { age: control.value } };
      }
    }
  }

  //gets the list of jobs from the API
  getMarsJobs() {
    this.jobsAPIService.getMarsJobs()
      .subscribe((result) => {
        this.marsJob = result;
      });
  }

  //send the new colonist registration data to the API
  postNewColonist(event) {
    event.preventDefault();

    this.submitted = true;

    if (this.registerForm.invalid) {
      console.log('form is invalid');
    } else {

      //get the data from the form if it's valid    
      const name = this.registerForm.get('name').value;
      const age = this.registerForm.get('age').value;
      const job_id = this.registerForm.get('job_id').value;

      //load up a NewColonist object
      const colonistPostRequest = { colonist: new NewColonist(name, age, job_id) }

      //send it off
      this.colonistApiService.saveColonist(colonistPostRequest)
        .subscribe(
        result => {
          //store the new user's ID in local storage for later
          localStorage.setItem('colonistID', result.id.toString());
          //send the user to the encounters page
          this.router.navigate(['/encounters']);
        });
    }

  }

  ngOnInit() {
    this.submitted = false;
  }

}
