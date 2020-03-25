import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Person } from '../models/person';
import { EDUCATION_MAP } from '../models/person';
import { PersonsService } from '../persons.service';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})

export class PersonComponent {
  educationMap = EDUCATION_MAP;
  personsTable: MatTableDataSource<Person> = new MatTableDataSource<Person>();
  slectedPersonIndex: number;
  personsService: PersonsService;
  person: Person = new Person();

  constructor(personsService: PersonsService) {
    this.personsService = personsService;
  }

  editPerson(person) {
    this.person = Object.assign(new Person(), person.person);
    this.slectedPersonIndex = person.index;
  }
}
