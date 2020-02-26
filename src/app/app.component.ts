import { Component } from '@angular/core';
import { Person } from './models/person';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  person: Person = new Person();
  correct = false;

  isFistNameValid = true;
  isLastNameValid = true;
  isDoBValid = true;
  isPhoneValid = true;
  isGenderValid = true;
  isSmokingValid = true;
  isEducationValid = true;
  isAgreedValid = true;


  startChecks() {

    // Check all form data if all fields entered
    this.isFistNameValid = this.checkMinimumLength(this.person.firstName,  3);
    this.isLastNameValid = this.checkMinimumLength(this.person.lastName,  3);
    this.isDoBValid = this.checkValidDate(this.person.dateOfBirth);
    this.isPhoneValid = this.checkMinimumLength(this.person.phoneNumber, 10);
    this.isGenderValid = this.checkNotNull(this.person.gender);
    this.isEducationValid = this.checkMinimumNumber(this.person.education, 1);
    this.isSmokingValid = this.checkNotNull(this.person.isSmoking);
    this.isAgreedValid = this.checkNotNull(this.person.isAgreed);


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
  private checkMinimumLength(data: string, minimumLength: number = 1): boolean {
    return data.length >= minimumLength;
  }

  private checkMinimumNumber(data: number, minimumNumber: number = 1): boolean {
    return data >= minimumNumber;
  }

  private checkValidDate(data: Date): boolean {
      return data !== undefined;
  }

  private checkNotNull(data: any | null): boolean {
        return data !== null;
  }
}
