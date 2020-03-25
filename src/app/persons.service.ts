import { Person } from './models/person';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable()
export class PersonsService {

  // here is out in-memory database "table" for persons
  private personsData: Person[] = [
    new Person('1', 'John', 'Brown', new Date('Jan 15, 1990'), '647 647 6464', 0, 2, true),
    new Person('2', 'Will', 'Smith', new Date('Feb 10, 1983'), '647 444 5555', 1, 3, false),
    new Person('3', 'Alex', 'Leslie', new Date('Mar 3, 1977'), '647 222 7777', 2, 1, true),
  ];

  getAllPersons(): Observable<Person[]> {
    // return all data from the Person table
    return new BehaviorSubject<Person[]>( this.personsData );
  }

  getPersonById( id: string): Observable<Person | null> {
    // find person by id in the table and return it of null if not found
    const person = this.personsData.find(p => p.id === id);
    return new BehaviorSubject<Person | null>( person ? person : null );
  }

  addPerson(person: Person): Observable<Person> {
    // add new person at the end of the table, assign new UNIQUE id for it and return that new person
    const newPerson = Object.assign(new Person(), person);
    const lastPerson = this.personsData[this.personsData.length - 1];
    newPerson.id = ( lastPerson ? lastPerson.id : '0' + 1).toString();
    this.personsData.push(newPerson);
    return new BehaviorSubject<Person>( newPerson );
  }

  updatePerson(person: Person): Observable<boolean> {
    // update person in the table and retur true if person was found or false if person was missin in the table
    const findPersonIndex = this.personsData.findIndex(p => p.id === person.id);
    if (findPersonIndex === -1) {
      return new BehaviorSubject<boolean>( false );
    }
    this.personsData[findPersonIndex] = Object.assign(new Person(), person);
    return new BehaviorSubject<boolean>( true );
  }

}
