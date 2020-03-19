import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Person } from '../models/person';
import { EDUCATION_MAP } from '../models/person';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})

export class PersonComponent {
  person: Person = new Person();
  persons: Person[] = [];
  educationMap = EDUCATION_MAP;
  personsTable: MatTableDataSource<Person> = new MatTableDataSource<Person>();

  getNewPerson(person: Person) {
    this.persons.push(person);
    this.persons = this.persons.slice();
  }

  editPerson(person: Person) {
    this.person = Object.assign(new Person(), person);
  }

  updatePerson(personIndex: number) {
    this.persons.splice(personIndex, 1, this.person);
    this.person = new Person();
  }
}
