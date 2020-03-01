import { Component, OnInit, Input } from '@angular/core';
import { Person } from '../models/person';
import { EDUCATIONS_MAP } from '../models/person';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css']
})
export class PersonListComponent implements OnInit {
  educationMap = EDUCATIONS_MAP;

  @Input() persons: Person[] = [];
  constructor() { }

  ngOnInit(): void {
  }
}
