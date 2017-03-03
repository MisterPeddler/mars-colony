import {
  Component,
  OnInit
} from '@angular/core';
import {
  NewEncounter
} from '../models';
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

  newEncounter: NewEncounter;
  aliens: string[];
  reportForm: FormGroup;

  constructor() {

    //get this from the API somehow
    this.aliens = ['cats', 'dogs', 'rats', 'mice'];

    this.reportForm = new FormGroup({
      atype: new FormControl('', [Validators.required]),
      action: new FormControl('', [Validators.required, Validators.maxLength(1000)])
    });

  }

  ngOnInit() {}

  submitReport() {

    if (!this.reportForm.invalid) {

      this.newEncounter = new NewEncounter(
        this.reportForm.value['atype'], //contents of select
        new Date().toString(), //current date,time
        this.reportForm.value['action'], //action report from user
        '2' //user_id: get this from logged in user
      );

      //send to server instead of console
      console.log(this.newEncounter);
    } else {
      console.log('FORM NOT VALID');
    }




  }

}
