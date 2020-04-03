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
  @Output() addPersonEvent = new EventEmitter<Person>();
  @Output() updatePersonEvent = new EventEmitter<Person>();

  educationMap = EDUCATION_MAP;

  clearForm() {
    this.person = new Person();
  }

  addPerson() {
    this.addPersonEvent.emit(this.person);
  }

  updatePerson() {
    this.updatePersonEvent.emit(this.person);
  }

  validate() {
    return {'msg-ok-on': this.person.validate()};
  }

}
