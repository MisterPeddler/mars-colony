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

  constructor(private encountersAPIService: EncountersAPIService) {
    //get the list of encounters
    this.getAlienEncounters();
  }

  getAlienEncounters() {
    this.encountersAPIService.getEncounters()
      .subscribe((result) => {
        this.encounterReports = result;
      });
  }

  ngOnInit() {
  }

}
