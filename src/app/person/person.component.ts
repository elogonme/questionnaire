import { Component, OnInit } from '@angular/core';
import { Person } from '../models/person';
import { PersonService } from '../person.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})

export class PersonComponent implements OnInit {

  person: Person = new Person(); // this is data for PersonFormComponent
  persons: Person[] = []; // this is data for PersonListComponent
  private subscription: Subscription;

  constructor(private personService: PersonService) {}

  ngOnInit() {
    this.getAllPersons();
  }

  getAllPersons(): void {
    this.subscription = this.personService.getAllPersons().subscribe(
      persons => this.persons = persons,
      err => console.error(`Can not get all persons. error ${err}`),
      () => console.log(`List of persons retrieved. length=${this.persons.length}`)
    );
    this.subscription.unsubscribe();
  }

  // event handler for PersonFormComponent
  addPerson(person: Person): void {
    let newId = '';
    this.subscription = this.personService.addPerson(person).subscribe(
      p => {
        newId = p.id;
        this.person = new Person();
        this.getAllPersons();
      },
      err => console.error(`Can not add person. error ${err}`),
      () => console.log(`Person added successfully. id=${newId}`)
    );
    this.subscription.unsubscribe();
  }

  // event handler for PersonFormComponent
  updatePerson(person: Person): void {
    this.subscription = this.personService.updatePerson(person).subscribe(
      result => {
        if (result) {
          this.person = new Person();
          this.getAllPersons();
        } else {
          console.error(`Can not update person. id=${person.id}`);
        }
      },
      err => console.error(`Service error ${err}`),
      () => console.log(`Person updated successfully. id=${person.id}`)
    );
    this.subscription.unsubscribe();
  }

  deletePerson(person: Person): void {
    this.subscription = this.personService.deletePersonById(person.id).subscribe(
      result => {
        if (result) {
          this.getAllPersons();
        } else {
          console.error(`Can not delete person. id=${person.id}`);
        }
      },
      err => console.error(`Service error ${err}`),
      () => console.log(`Person deleted successfully. id=${this.person.id}`)
    );
    this.subscription.unsubscribe();
    this.person = new Person();
  }

  selectPerson(person: Person): void {
    this.person = person.clone();
  }

  shiftPerson(personIndexAndshift) {
    this.subscription = this.personService.shiftPerson(personIndexAndshift).subscribe(
      result => {
        if (result) {
          this.getAllPersons();
        } else {
          console.error(`Can not shift person. id=${this.persons[personIndexAndshift.index].id}`);
        }
      },
      err => console.error(`Service error ${err}`),
      () => console.log(`Person moved successfully. id=${this.persons[personIndexAndshift.index].id}`)
    );
    this.subscription.unsubscribe();
    this.person = new Person();
  }
}
