import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Person } from '../models/person';
import { EDUCATION_MAP } from '../models/person';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})

export class PersonComponent {
  person: Person = new Person();
  persons: Person[] = environment.production ? [] : [
    new Person('John', 'Brown', new Date('Jan 15, 1990'), '647 647 6464', 0, 2, true),
    new Person('Will', 'Smith', new Date('Feb 10, 1983'), '647 444 5555', 1, 3, false),
    new Person('Alex', 'Leslie', new Date('Mar 3, 1977'), '647 222 7777', 2, 1, true),
    ];
  educationMap = EDUCATION_MAP;
  personsTable: MatTableDataSource<Person> = new MatTableDataSource<Person>();
  slectedPersonIndex: number;

  getUpdatePerson(person) {
    if (person.action) {                // Add new person is action is true
      this.persons.push(person.person);
      this.persons = this.persons.slice();
    }
    else {                             // Update selected person is action is false
      this.persons.splice(this.slectedPersonIndex, 1, person.person);
      this.persons = this.persons.slice();
      this.slectedPersonIndex = -1;
      this.person = new Person();
    }
  }

  editPerson(person: any) {
    this.person = Object.assign(new Person(), person.person);
    this.slectedPersonIndex = person.index;
  }
}
