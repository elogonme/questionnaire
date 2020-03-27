import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Person } from '../models/person';
import { EDUCATION_MAP } from '../models/person';
import { PersonsService } from '../persons.service';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})

export class PersonComponent {

  constructor(personsService: PersonsService) {}
}
