import { Component, OnInit, Input } from '@angular/core';
import { Person } from '../models/person';
import { EDUCATION_MAP } from '../models/person';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css']
})
export class PersonListComponent implements OnInit {
  educationMap = EDUCATION_MAP;

  @Input() persons: Person[] = [];
  constructor() { }

  deletePerson(id) {
    this.persons.splice(id,1);
  }

  moveUpPerson(i) {
    if (i === 0) {
      return;
    }
    this.persons.splice(i-1,0, this.persons.splice(i,1)[0]);
  }

  moveDownPerson(i) {
    if (i === this.persons.length - 1) {
      return;
    }
    this.persons.splice(i+1,0, this.persons.splice(i,1)[0]);
  }

  ngOnInit(): void {
  }
}
