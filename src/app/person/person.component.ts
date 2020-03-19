import { Component } from '@angular/core';
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

  getNewPerson(person: Person) {
    this.persons = [...this.persons, person];
    // this.persons.push(person) doesn't work here
    // because it updates only content of the array but not this.persons reference itself
    // you need to update this.persons reference as well to trigger OnChange event for child component
    // other way to do it:

    // this.persons.push(person);
    // this.persons = this.persons.slice();

    // or

    // this.persons.push(person);
    // this.persons = [...this.persons];
  }

  editPerson(person: Person) {
    this.person = Object.assign(new Person(), person);
  }

  updatePerson(personIndex: number) {
    this.persons.splice(personIndex, 1, this.person);
    this.person = new Person();
  }
}
