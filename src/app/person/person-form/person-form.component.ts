import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Person } from '../../models/person';
import { EDUCATION_MAP } from '../../models/person';

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.css']
})
export class PersonFormComponent {

  @Input() person: Person;
  @Output() personEntered = new EventEmitter<Person>();

  educationMap = EDUCATION_MAP;

  addPerson() {
    this.personEntered.emit(this.person);
    this.person = new Person();
  }

  validate() {
    return {'msg-ok-on': this.person.validate()};
  }

  clearForm() {
    this.person = new Person();
  }
}
