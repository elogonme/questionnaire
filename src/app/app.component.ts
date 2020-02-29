import { Component } from '@angular/core';
import { Person } from './models/person';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  person: Person = new Person();
  personsList: Person[] = [];
  educationList = ['None','Secondary','Post-secondary','Bachelor\'s degree','Masterr\'s degree'];

  addPerson() {
    let empty : Person = new Person(); // Empty Person to clear input fields
    this.person.educationName = this.educationList[this.person.education-1]; // Get education name
    let p2 = this.person.clone();
    this.personsList.push(p2);
    this.person = empty; // Clear input form
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

