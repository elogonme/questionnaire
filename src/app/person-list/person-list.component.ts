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

  ngOnInit(): void {
  }
}
