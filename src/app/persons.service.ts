import { Person } from './models/person';
import { environment } from '../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
 })

export class PersonsService {
  person: Person = new Person();
  slectedPersonIndex: number;
  private persons: Person[] = environment.production ? [] : [
    new Person('John', 'Brown', new Date('Jan 15, 1990'), '647 647 6464', 0, 2, true),
    new Person('Will', 'Smith', new Date('Feb 10, 1983'), '647 444 5555', 1, 3, false),
    new Person('Alex', 'Leslie', new Date('Mar 3, 1977'), '647 222 7777', 2, 1, true),
    ];

  getAllPersons(): Observable<Person[]> {
    return this.persons;
  }

  getPerson() {
    return this.person;
  }

  addPerson(person: Person) {
     this.persons.push(person);
     this.person = person;
     console.log(this.persons);
  }

  updatePerson(person: Person) {
   // this.persons.splice(this.slectedPersonIndex, 1, this.person);
   // this.person = new Person();
   console.log('update');
   console.log(this.persons);
}
}
