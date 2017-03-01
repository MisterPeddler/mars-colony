import { Component, OnInit } from '@angular/core';
import { NewColonist, Job } from '../models';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  newColonist: NewColonist;
  marsJob: Job[];

  public fakeColonist: any;

  constructor() { 
    //TODO: call API, get jobs.

    this.fakeColonist = {};

    this.marsJob = [{
      name:'bob',
      id:'1',
      description:'dancer man'
    },{
      name:'bob2',
      id:'2',
      description:'haircut getter'
    },{
      name:'Mao',
      id:'3',
      description:'three-legged cat'
    },{
      name:'bob4',
      id:'4',
      description:'alien hugger'
    }];

  }

  

  ngOnInit() {

  }

}
