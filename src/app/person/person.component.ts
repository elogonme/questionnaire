import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Person } from '../models/person';
import { EDUCATION_MAP } from '../models/person';
import { PersonService } from '../person.service';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})

export class PersonComponent implements OnInit {
  person: Person = new Person();
  persons: Person[];
  educationMap = EDUCATION_MAP;
  personsTable: MatTableDataSource<Person> = new MatTableDataSource<Person>();
  slectedPersonIndex: number;

  constructor(private personService: PersonService) {}

  ngOnInit() {
    this.personService.getAllPersons();
    this.personService.persons.subscribe(
      persons => {
      this.persons = persons;
      this.personsTable.data = persons;
    });
  }

  addUpdatePerson(person) {
    if (person.action) {                // Add new person is action is true
      this.personService.addPerson(this.person);
      this.persons = this.persons.slice();
    } else {                             // Update selected person is action is false
      this.personService.updatePerson(this.person);
      this.persons = this.persons.slice();
      this.slectedPersonIndex = -1;
      this.person = new Person();
    }
  }

  editPerson(person: any) {
    this.person = Object.assign(new Person(), person.person);
    this.slectedPersonIndex = person.index;
    this.personService.updateObservables();
  }
}
