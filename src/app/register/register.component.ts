import { Component, OnInit } from '@angular/core';
import { NewColonist, Job } from '../models';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  ValidatorFn,
  AbstractControl
}
  from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  newColonist: NewColonist;
  marsJob: Job[];
  registerForm: FormGroup;
  submitStatusName: boolean;
  submitStatusAge: boolean; 
  submitStatusJob: boolean;

  constructor() {

    this.submitStatusName = false;
    this.submitStatusJob = false;
    this.submitStatusAge = false;

    this.registerForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      age: new FormControl('', [Validators.required, this.acceptAge(16, 50)]),
      job_id: new FormControl('', [Validators.required]),
    });

    this.marsJob = [{
      name: 'bob',
      id: '1',
      description: 'dancer man'
    }, {
      name: 'bob2',
      id: '2',
      description: 'haircut getter'
    }, {
      name: 'Mao',
      id: '3',
      description: 'three-legged cat'
    }, {
      name: 'bob4',
      id: '4',
      description: 'alien hugger'
    }];

  }

  acceptAge(min: number, max: number) {
    return (control: AbstractControl): { [key: string]: any } => {
      if (control.value < min || control.value > max) {
        return { 'Sorry incorrect age': { age: control.value } };
      }
    }
  }

  logColonist() {
    this.submitStatusName = true;
    this.submitStatusJob = true;
    this.submitStatusAge = true;

    console.log(this.registerForm);
  }

statusNameFocused(){
  this.submitStatusName = false;
}

  ngOnInit() {

  }

}
