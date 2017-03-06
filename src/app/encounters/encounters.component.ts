import { Component, OnInit } from '@angular/core';
import { Encounter } from '../models'

import { EncountersAPIService } from '../apiService/encounters';

@Component({
  selector: 'app-encounters',
  templateUrl: './encounters.component.html',
  styleUrls: ['./encounters.component.scss'],
  providers: [EncountersAPIService]
})

export class EncountersComponent implements OnInit {

  encounterReports: Encounter[];
  loaded: boolean;

  constructor(private encountersAPIService: EncountersAPIService) {
    //get the list of encounters from the API
    this.getAlienEncounters();
  }

  getAlienEncounters() {
    this.encountersAPIService.getEncounters()
      .subscribe((result) => {
        //hides the loading gif
        this.loaded = true;
        //loads result onto the view
        this.encounterReports = result;
      });
  }

  ngOnInit(){
     this.loaded = false;
  }

}
