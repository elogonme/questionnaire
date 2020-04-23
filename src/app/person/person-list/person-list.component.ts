import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { Person } from '../../models/person';
import { PersonService } from '../../person.service';
import { EDUCATION_MAP } from '../../models/person';
import { MatTableDataSource } from '@angular/material/table';
import {Router, ActivatedRoute} from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css']
})

export class PersonListComponent implements OnChanges, OnInit {

  // @Input() persons: Person[] = [];
  @Output() selectPersonEvent = new EventEmitter<Person>();
  @Output() deletePersonEvent = new EventEmitter<Person>();
  @Output() shiftPersonEvent = new EventEmitter<any>();

  personsTable: MatTableDataSource<Person> = new MatTableDataSource();
  educationMap = EDUCATION_MAP;
  selectedRow = -1;
  displayedColumns = ['name', 'lastname', 'edit'];
  persons: Person[] = []; // this is data for PersonListComponent
  private subscription: Subscription;

  constructor(private personService: PersonService, private router: Router, private route: ActivatedRoute) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.personsTable.data = changes.persons.currentValue;
    this.selectedRow = -1;
  }

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
    this.personsTable.data = this.persons;
  }

  deletePerson() {
    this.deletePersonEvent.emit(this.persons[this.selectedRow]);
    this.getAllPersons();
  }

  moveRow(shift: number) {

    if (this.selectedRow + shift < 0 || this.selectedRow + shift > this.persons.length - 1) {
      return;
    }
    this.shiftPersonEvent.emit({ index: this.selectedRow, shift });
    this.selectedRow = -1;
    this.getAllPersons();
  }

  selectRow(i: number) {
    this.selectedRow = i;
    this.selectPersonEvent.emit(this.persons[i]);
  }

  editPerson(id: string) {
    this.router.navigate(['/person'], { queryParams: {id}});
  }

}
