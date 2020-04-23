import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Person } from '../../models/person';
import { PersonService } from '../../person.service';
import { EDUCATION_MAP } from '../../models/person';
import {Router, ActivatedRoute} from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.css']
})
export class PersonFormComponent implements OnInit {

  person: Person = new Person(); // this is data for PersonFormComponent
  private subscription: Subscription;

  educationMap = EDUCATION_MAP;

  constructor(private personService: PersonService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    const id = this.route.snapshot.queryParams.id;
    if ( id !== 'new') {
      this.subscription = this.personService.getPersonById(id).subscribe(
        person => this.person = person,
        err => console.error(`Can not get person error ${err}`),
        () => console.log(`Person retrieved. id=${this.person.id}`)
      );
      this.subscription.unsubscribe();
    } else {
      this.person = new Person();
    }
  }

  clearForm() {
    this.person = new Person();
  }

  addPerson(): void {
    let newId = '';
    this.subscription = this.personService.addPerson(this.person).subscribe(
      p => {
        newId = p.id;
        this.person = new Person();
      },
      err => console.error(`Can not add person. error ${err}`),
      () => console.log(`Person added successfully. id=${newId}`)
    );
    this.subscription.unsubscribe();
    this.router.navigate(['/']);
  }

  updatePerson(): void {
    this.subscription = this.personService.updatePerson(this.person).subscribe(
      result => {
        if (result) {
          this.person = new Person();
        } else {
          console.error(`Can not update person. id=${this.person.id}`);
        }
      },
      err => console.error(`Service error ${err}`),
      () => console.log(`Person updated successfully. id=${this.person.id}`)
    );
    this.subscription.unsubscribe();
    this.router.navigate(['/']);
  }

  validate() {
    return {'msg-ok-on': this.person.validate()};
  }

}
