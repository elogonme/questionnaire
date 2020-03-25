import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { Person } from '../../models/person';
import { EDUCATION_MAP } from '../../models/person';
import { MatTableDataSource } from '@angular/material/table';
import { PersonsService } from 'src/app/persons.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css']
})

export class PersonListComponent implements OnChanges, OnInit {

  @Output() personSelected = new EventEmitter<object>();

  personsTable: MatTableDataSource<Person> = new MatTableDataSource();
  educationMap = EDUCATION_MAP;
  selectedRow = -1;
  displayedColumns = ['name', 'lastname'];
  persons: Person[];

  constructor(
    private personsService: PersonsService,
  ) {}

  ngOnInit() {
    this.personsService.getAllPersons().subscribe(
      persons => {
        this.persons = persons;
        this.personsTable.data = persons;
    }
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
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
    const personAndIndex = { person: this.persons[i], index: i };
    this.personSelected.emit(personAndIndex);
  }

  updateTable() {
    this.personsTable.data = this.persons;
    this.personSelected.emit(new Person());
  }
}
