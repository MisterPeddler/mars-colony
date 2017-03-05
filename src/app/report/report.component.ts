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

  constructor(private alienAPIService: AlienAPIService,
    private router: Router,
    private encounterAPIService: EncountersAPIService,
    private datePipe: DatePipe) {

    this.getAliens();

    this.reportForm = new FormGroup({
      atype: new FormControl('', [Validators.required]),
      action: new FormControl('', [Validators.required, Validators.maxLength(1000)])
    });

  }

  ngOnInit() { }

  submitReport() {

    if (!this.reportForm.invalid) {

      let date = new Date();
      let stringDate = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDay();

      this.newEncounter = new NewEncounter(
        this.reportForm.value['atype'], //contents of select
        stringDate, //current date,time
        this.reportForm.value['action'], //action report from user
        localStorage.getItem('colonistID') //user_id: get this from logged in user
      );

      const encountersPostRequest = { encounter: this.newEncounter };

      this.encounterAPIService.saveEncounter(encountersPostRequest)
        .subscribe(
        result => {
          console.log('this is the result of saveEncounter', result);
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
        console.log(result);
        this.aliens = result;
      });
  }

}
