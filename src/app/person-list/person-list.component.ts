import { Component, OnInit, Input } from '@angular/core';
import { Person } from '../models/person';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css']
})
export class PersonListComponent implements OnInit {

  @Input() persons: Person[] = [];
  constructor() { }

  ngOnInit(): void {
  }

}
