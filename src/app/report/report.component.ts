import { Component, OnInit } from '@angular/core';
import { NewEncounter } from '../models';
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
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  newEncounter : NewEncounter;
  aliens : string[];
  reportForm: FormGroup;

  constructor() {

    //get this from the API somehow
    this.aliens = ['cats','dogs','rats','mice'];

    this.reportForm = new FormGroup({
      atype: new FormControl('',[Validators.required]),
      action: new FormControl('',[Validators.required, Validators.maxLength(1000)])
    });

   
    

   }

  ngOnInit() {
  }

  submitReport(){

if(this.reportForm.status === 'VALID'){

  this.newEncounter = new NewEncounter(
        this.reportForm.value['atype'],
        new Date().toString(),
        this.reportForm.value['action'],
        '2'
    );

     console.log(this.newEncounter);
}else{
  console.log('FORM NOT VALID');
}
    
  
   

  }

}
