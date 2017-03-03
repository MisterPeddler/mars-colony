import { Component, OnInit } from '@angular/core';
import { Encounter } from '../models'

import{ EncountersAPIService } from '../apiService/encounters';

@Component({
  selector: 'app-encounters',
  templateUrl: './encounters.component.html',
  styleUrls: ['./encounters.component.css'],
  providers: [EncountersAPIService]
})
export class EncountersComponent implements OnInit {

//   export interface Encounter{
//     id: number;
//     date: string;
//     colonist_id: number;
//     atype: string;
//     action: string;
// }

  encounterReports : Encounter[]; 
  

  constructor(private encountersAPIService : EncountersAPIService ) {
    //get the list of encounters
    this.getAlienEncounters();

  } 


  getAlienEncounters(){
     this.encountersAPIService.getEncounters()
    .subscribe((result) => {
                console.log('got encounters list', result);
                 this.encounterReports = result;
    });


  }


  ngOnInit() {
  }

}
