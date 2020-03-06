import { Component } from '@angular/core';
import { Person } from '../../models/person';
import { EDUCATION_MAP } from '../../models/person';

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.css']
})
export class PersonFormComponent {
  person: Person = new Person();
  persons: Person[] = [];
  educationMap = EDUCATION_MAP;

  addPerson() {
    this.persons.push(this.person);
    this.person = new Person();
  }

  checkMinimumLength(data: string, minimumLength: number = 1) {
    return {'field-error': data.length < minimumLength};
  }

  checkValidDate(data: any) {
    return {'field-error': data === undefined || data.toString() === ''};
  }

  checkMinimumNumber(data: number, minimumNumber: number = 1) {
    return {'field-error': data < minimumNumber};
  }

  checkNotNull(data: any) {
    return {'field-error': data === null || data === false};
  }

  validate() {
    return {'msg-ok-on': this.person.validate()};
  }

  editPerson(person: Person) {
    this.person = Object.assign(new Person(), person);
  }

  clearForm() {
    this.person = new Person();
  }
}
