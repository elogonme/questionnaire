import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Person } from '../models/person';
import { EDUCATION_MAP } from '../models/person';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css']
})
export class PersonListComponent {

  @Input() person: Person;
  @Input() persons: Person[] = [];
  @Output() personSelected = new EventEmitter<Person>();

  educationMap = EDUCATION_MAP;
  selectedRow = -1;

  deletePerson(i: number) {
    this.persons.splice(i, 1);
    this.selectedRow = -1;
  }

  moveUpPerson(i: number) {
    if (i === 0) {
      return;
    }
    this.selectedRow = -1;
    this.persons.splice(i - 1, 0, this.persons.splice(i, 1)[0]);
  }

  moveDownPerson(i: number) {
    if (i === this.persons.length - 1) {
      return;
    }
    this.selectedRow = -1;
    this.persons.splice(i + 1, 0, this.persons.splice(i, 1)[0]);
  }

  selectRow(i: number) {
    this.selectedRow = i;
    this.personSelected.emit(this.persons[i]);
  }

  updatePerson(i: number) {
    this.selectedRow = -1;
    this.persons.splice(i, 1, this.person);
    this.personSelected.emit(new Person());
  }

}
