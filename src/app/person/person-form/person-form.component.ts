import { Component, OnInit } from '@angular/core';
import { Person } from '../../models/person';
import { EDUCATION_MAP } from '../../models/person';
import { PersonsService } from 'src/app/persons.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.css']
})
export class PersonFormComponent implements OnInit {

  educationMap = EDUCATION_MAP;
  person: Person;

  constructor(private personsService: PersonsService) {
  }

  addUpdatePerson(action) {
    if (action) {                // Add new person if action is true
      this.personsService.addPerson(this.person);
    } else {                             // Update selected person if action is false
      this.personsService.updatePerson(this.person);
    }
  }

  validate() {
   return {'msg-ok-on': this.person.validate()};
  }

  clearForm() {
    this.person = new Person();
  }

  ngOnInit() {
    this.personsService.getPerson().subscribe(
      person => {
      this.person = person;
    }
    );
  }
}
