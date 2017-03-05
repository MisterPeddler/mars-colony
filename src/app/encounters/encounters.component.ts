import { Component, OnInit } from '@angular/core';
import { Encounter } from '../models'

import { EncountersAPIService } from '../apiService/encounters';

@Component({
  selector: 'app-encounters',
  templateUrl: './encounters.component.html',
  styleUrls: ['./encounters.component.css'],
  providers: [EncountersAPIService]
})

export class EncountersComponent implements OnInit {

  encounterReports: Encounter[];
  loaded: boolean;

  constructor(private encountersAPIService: EncountersAPIService) {
    //get the list of encounters
    this.loaded = false;
    this.getAlienEncounters();
  }

  getAlienEncounters() {
    this.encountersAPIService.getEncounters()
      .subscribe((result) => {
        this.loaded = true;
        this.encounterReports = result;

      });
  }

  ngOnInit() {
  }

}
