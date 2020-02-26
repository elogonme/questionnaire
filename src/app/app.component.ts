import { Component, Input } from '@angular/core';
import { Person } from './models/person';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  person: Person = new Person();
  ararar: string[] = ['bb','cc','dd'];
  correct = false;
  setClass: string;

  isFistNameValid = true;
  isLastNameValid = true;
  isDoBValid = true;
  isPhoneValid = true;
  isGenderValid = true;
  isSmokingValid = true;
  isEducationValid = true;
  isAgreedValid = true;


  startChecks() {
    let a: Person[] = [];
    let p2 = this.person.clone();
    a.push(this.person);
    a.push(p2);
    a.push(this.person.clone());

    // Check all form data if all fields entered
    this.isFistNameValid = this.checkMinimumLength('firstName', this.person.firstName,  3);
    this.isLastNameValid = this.checkMinimumLength('lastName', this.person.lastName,  3);
    this.isDoBValid = this.checkValidDate('dob', this.person.dateOfBirth);
    this.isPhoneValid = this.checkMinimumLength('phone', this.person.phoneNumber, 10);
    this.isGenderValid = this.checkNotNull('gender', this.person.gender);
    this.isEducationValid = this.checkMinimumNumber('education', this.person.education, 1);
    this.isSmokingValid = this.checkNotNull('smoking', this.person.isSmoking);
    this.isAgreedValid = this.checkNotNull('agreed', this.person.isAgreed);


    this.correct = this.isFistNameValid
      && this.isLastNameValid
      && this.isDoBValid
      && this.isPhoneValid
      && this.isGenderValid
      && this.isEducationValid
      && this.isSmokingValid
      && this.isAgreedValid;
  }

  // Check element for error, make red box and display error message
  private checkMinimumLength(field: string, data: string, minimumLength: number = 1): boolean {
    if (data.length < minimumLength) {
        return false;
    }
    this.setClass = 'err-off';
    return true;
  }

  private checkMinimumNumber(field: string, data: number, minimumNumber: number = 1): boolean {
    if (data < minimumNumber) {
        return false;
    }
    return true;
  }

  private checkValidDate(field: string, data: Date): boolean {
    if (data.toString() === 'Invalid Date') {
        return false;
    }
    return true;
  }

  private checkNotNull(field: string, data: any | null): boolean {
    if (data === null) {
        return false;
    }
    return true;
  }
}
