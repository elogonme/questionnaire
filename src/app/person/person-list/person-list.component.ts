import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Person } from '../../models/person';
import { EDUCATION_MAP } from '../../models/person';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css']
})

export class PersonListComponent implements OnChanges {

  @Input() persons: Person[] = [];
  @Output() selectPersonEvent = new EventEmitter<Person>();
  @Output() deletePersonEvent = new EventEmitter<Person>();

  personsTable: MatTableDataSource<Person> = new MatTableDataSource();
  educationMap = EDUCATION_MAP;
  selectedRow = -1;
  displayedColumns = ['name', 'lastname'];

  ngOnChanges(changes: SimpleChanges): void {
    this.personsTable.data = changes.persons.currentValue;
    this.selectedRow = -1;
  }

  deletePerson() {
    this.deletePersonEvent.emit(this.persons[this.selectedRow]);
  }

  selectRow(i: number) {
    this.selectedRow = i;
    this.selectPersonEvent.emit(this.persons[i]);
  }

}
