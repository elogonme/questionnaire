import { Component } from '@angular/core';
import { Person } from './models/person';
import { EDUCATION_MAP } from './models/person';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
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
    return {'field-error': data === undefined || data.toString() === "" };
  }

  checkMinimumNumber(data: number, minimumNumber: number = 1) {
    return {'field-error': data < minimumNumber};
  }

  checkNotNull(data: any) {
        return {'field-error': data === null || data === false};
  }

  validate(){
    return {'msg-ok-on': this.person.validate()};
  }
}
