import { Person } from './models/person';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { v1 as uuidv1 } from 'uuid';

@Injectable()
export class PersonService {


  private v1options = {
    node: [0x01, 0x23, 0x45, 0x67, 0x89, 0xab],
    clockseq: 0x1234,
    msecs: new Date().getTime(),
    nsecs: 5678,
  };

  // In-memory database "table" for persons
  private personsData: Person[] = [];

  constructor() {

    this.v1options.msecs = new Date('2011-11-01').getTime(),
    this.personsData.push(new Person(uuidv1(this.v1options), 'John', 'Brown', new Date('Jan 15, 1990'), '647 647 6464', 0, 2, true));
    this.v1options.msecs = new Date('2011-11-02').getTime(),
    this.personsData.push(new Person(uuidv1(this.v1options), 'Will', 'Smith', new Date('Feb 10, 1983'), '647 444 5555', 1, 3, false));
    this.v1options.msecs = new Date('2011-11-03').getTime(),
    this.personsData.push(new Person(uuidv1(this.v1options), 'Alex', 'Leslie', new Date('Mar 3, 1977'), '647 222 7777', 2, 1, true));
 }

  getAllPersons(): Observable<Person[]> {
  // return all data from the Person table
    return of(this.personsData.map(p => p.clone()));
  }

  getPersonById(id: string): Observable<Person | null> {
    // find person by id in the table and return it or null if not found
    const person = this.personsData.find(p => p.id === id);
    return of(person ? person : null);
  }

  addPerson(person: Person): Observable<Person>  {
    // add new person at the end of the table, assign new UNIQUE id for it and return that new person
    const newPerson = person.clone();
    this.v1options.msecs = new Date().getTime(),
    newPerson.id = uuidv1(this.v1options);
    this.personsData.push(newPerson);
    return of(newPerson);
  }

  updatePerson(person: Person): Observable<boolean> {
    // update person in the table and return true if person was found or false if person was missing in the table
    const findPersonIndex = this.personsData.findIndex(p => p.id === person.id);
    if (findPersonIndex === -1) {
      return of(false);
    }
    this.personsData[findPersonIndex] = person.clone();
    return of(true);
  }

  deletePersonById(id: string): Observable<boolean> {
    // find person by id in the table and delete it. return true if deleted or false if not found
    const findPersonIndex = this.personsData.findIndex(p => p.id === id);
    if (findPersonIndex === -1) {
      return of(false);
    }
    this.personsData.splice(findPersonIndex, 1);
    return of(true);
  }

}
