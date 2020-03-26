import { Person } from './models/person';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subject } from 'rxjs';

@Injectable()
export class PersonsService {
// In-memory database "table" for persons
private personsData: Person[] = [
  new Person('1', 'John', 'Brown', new Date('Jan 15, 1990'), '647 647 6464', 0, 2, true),
  new Person('2', 'Will', 'Smith', new Date('Feb 10, 1983'), '647 444 5555', 1, 3, false),
  new Person('3', 'Alex', 'Leslie', new Date('Mar 3, 1977'), '647 222 7777', 2, 1, true),
 ];
 personsObservable$: Subject<Person[]>;
 personObservable$: BehaviorSubject<Person> = new BehaviorSubject<Person>(new Person());
 person: Person = new Person();

getAllPersons(): Observable<Person[]> {
  this.personsObservable$ = new BehaviorSubject<Person[]>( this.personsData );
// return all data from the Person table
  return this.personsObservable$;
}

getPerson(): Observable<Person> {
  this.personObservable$ = new BehaviorSubject<Person>( this.person );
  return this.personObservable$;
}

getPersonById( id: string): BehaviorSubject<Person | null> {
  // find person by id in the table and return it or null if not found
  const person = this.personsData.find(p => p.id === id);
  // this.personObservable$ = new BehaviorSubject<Person | null>( person ? person : new Person() );
  this.personObservable$.next(person);
  return this.personObservable$;
  }

addPerson(person: Person): Observable<Person> {
  // add new person at the end of the table, assign new UNIQUE id for it and return that new person
  const newPerson = Object.assign(new Person(), person);
  const lastPerson = this.personsData[this.personsData.length - 1];
  newPerson.id = ( lastPerson === undefined ? '1' : parseInt(lastPerson.id, 10) + 1).toString();
  this.personsData.push(newPerson);
  this.updateObservables();
  return new BehaviorSubject<Person>( newPerson );
}

updatePerson(person: Person): Observable<boolean> {
  // update person in the table and return true if person was found or false if person was missing in the table
  const findPersonIndex = this.personsData.findIndex(p => p.id === person.id);
  if (findPersonIndex === -1) {
    this.updateObservables();
    return new BehaviorSubject<boolean>( false );
  }
  this.personsData[findPersonIndex] = Object.assign(new Person(), person);
  this.updateObservables();
  return new BehaviorSubject<boolean>( true );
 }

 updateObservables() {
  this.personsObservable$.next( this.personsData );
  this.personObservable$.next(new Person());
 }
}
