import { Component, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { Person } from '../../models/person';
import { EDUCATION_MAP } from '../../models/person';
import { MatTableDataSource } from '@angular/material/table';
import { PersonsService } from 'src/app/persons.service';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css']
})

export class PersonListComponent implements OnChanges, OnInit {

  personsTable: MatTableDataSource<Person> = new MatTableDataSource();
  educationMap = EDUCATION_MAP;
  selectedRow = -1;
  displayedColumns = ['name', 'lastname'];
  persons: Person[];
  person: Person;

  constructor(private personsService: PersonsService,
  ) {}

  ngOnInit() {
    this.personsService.getAllPersons().subscribe(
      persons => {
      this.persons = persons;
      this.personsTable.data = persons;
      this.selectedRow = -1;
    });

    this.personsService.getPerson().subscribe(
      person => {
      this.person = person;
      console.log(this.person);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('changed');
    this.personsTable.data = changes.persons.currentValue;
    this.selectedRow = -1;
  }

  deletePerson() {
    this.persons.splice(this.selectedRow, 1);
    this.selectedRow = -1;
    this.updateTable();
  }

  moveRow(shift: number) {

    if (this.selectedRow + shift < 0 || this.selectedRow + shift > this.persons.length - 1) {
      return;
    }

    this.persons.splice(this.selectedRow + shift, 0, this.persons.splice(this.selectedRow, 1)[0]);
    this.selectedRow = -1;
    this.updateTable();
}

  selectRow(i: number) {
    this.selectedRow = i;
    const returnedPerson  = this.personsService.getPersonById((this.persons[i].id));
    this.person = returnedPerson.value;
  }

  updateTable() {
    this.personsTable.data = this.persons;
    // this.personSelected.emit(new Person());
  }
}
