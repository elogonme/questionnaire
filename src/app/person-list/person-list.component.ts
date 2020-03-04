import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Person } from '../models/person';
import { EDUCATION_MAP } from '../models/person';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css']
})
export class PersonListComponent implements OnInit {
  educationMap = EDUCATION_MAP;
  selectedRows: Array<any> = [];

  @Input() person: Person;
  @Input() persons: Person[] = [];

  @Output()
  personSelected = new EventEmitter<Person>();

  constructor() { }

  deletePerson(i: number) {
    this.persons.splice(i, 1);
  }

  moveUpPerson(i: number) {
    if (i === 0) {
      return;
    }
    this.selectedRows[i] = i + 1;
    this.persons.splice(i - 1, 0, this.persons.splice(i, 1)[0]);
  }

  moveDownPerson(i: number) {
    if (i === this.persons.length - 1) {
      return;
    }
    this.selectedRows[i] = i - 1;
    this.persons.splice(i + 1, 0, this.persons.splice(i, 1)[0]);
  }

  onPersonSelected(i: number) {
    this.selectedRows = [];
    let index: number;
    for (index = 0; index < this.persons.length; index++) {
      this.selectedRows.push(-1);
    }
    this.selectedRows[i] = i;
    this.personSelected.emit(this.persons[i]);
  }

  updatePerson(i: number) {
    this.selectedRows[i] = -1;
    this.persons.splice(i, 1, this.person);
  }

  ngOnInit(): void {
  }
}
