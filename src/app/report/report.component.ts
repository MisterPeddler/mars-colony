import {
  Component,
  OnInit
} from '@angular/core';
import {
  NewEncounter, Alien
} from '../models';
import { AlienAPIService } from '../apiService/aliens';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  ValidatorFn,
  AbstractControl
}
  from '@angular/forms';

import { Router } from '@angular/router';

import { DatePipe } from '@angular/common';

import { EncountersAPIService } from '../apiService/encounters'

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
  providers: [AlienAPIService, EncountersAPIService, DatePipe]
})
export class ReportComponent implements OnInit {

  newEncounter: NewEncounter;
  aliens: Alien[];
  reportForm: FormGroup;
  submitted: boolean;

  constructor(private alienAPIService: AlienAPIService,
    private router: Router,
    private encounterAPIService: EncountersAPIService,
    private datePipe: DatePipe) {

    //get the list of aliens from the API  
    this.getAliens();

    //set up the form validation
    this.reportForm = new FormGroup({
      atype: new FormControl('', [Validators.required]),
      action: new FormControl('', [Validators.required, Validators.maxLength(1000)])
    });

  }

  ngOnInit() {
      //used for firing the user warning on invalid form data
     this.submitted = false;
   }

  submitReport() {
    //activates invalid form data warning
    this.submitted = true;

    if (!this.reportForm.invalid) {

      //create and format the date for the encounter report
      //of the from YYYY-MM-DD
      let date = new Date();
      let stringDate = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate();

      //Load the NewEncounter object with data
      this.newEncounter = new NewEncounter(
        this.reportForm.value['atype'], //contents of select
        stringDate, //current date,time
        this.reportForm.value['action'], //action report from user
        localStorage.getItem('colonistID') //user_id: get this from logged in user
      );

      //next it in another object to make the API happy
      const encountersPostRequest = { encounter: this.newEncounter };

      //send it
      this.encounterAPIService.saveEncounter(encountersPostRequest)
        .subscribe(
        result => {
          //on a succesful result send the user to the encounters page
          this.router.navigate(['/encounters']);
        }
        )
    } else {
      console.log('FORM NOT VALID');
    }
  }

  getAliens() {
    this.alienAPIService.getAliens()
      .subscribe((result) => {
        this.aliens = result;
      });
  }

}
