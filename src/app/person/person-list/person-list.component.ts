import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Person } from '../../models/person';
import { EDUCATION_MAP } from '../../models/person';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css']
})

export class PersonListComponent {

  @Input() persons: Person[] = [];
  @Input() personsTable: MatTableDataSource<Person>;
  @Output() personSelected = new EventEmitter<Person>();
  @Output() updateRequired = new EventEmitter<number>();

  educationMap = EDUCATION_MAP;
  selectedRow = -1;
  displayedColumns = ['name', 'lastname', 'dateOfBirth', 'phoneNumber', 'gender', 'education', 'smoking', 'actions'];


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
    this.personSelected.emit(this.persons[i]);
  }

  updatePerson() {
    this.updateRequired.emit(this.selectedRow);
    this.updateTable();
    this.selectedRow = -1;
  }

  updateTable() {
    this.personsTable.data = this.persons;
    this.personSelected.emit(new Person());
  }
}
