import { Component } from '@angular/core';
import * as $ from 'jquery';

import { Person } from './models/person';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  person: Person = new Person();
  correct = false;

  startChecks() {
    // Reset all errors
    $('.msg').css('display', 'none');
    $('.box').css('borderColor', 'initial');
    $('#checkMsg').css('visibility', 'hidden');
    this.correct = true;

    // get all Form data - all fields
    this.person.firstName = $('#firstName').val().toString();
    this.person.lastName = $('#lastName').val().toString();
    this.person.dateOfBirth  = new Date( $('#dob').val().toString() );
    this.person.phoneNumber  = $('#phone').val().toString();
    this.person.education = Number($('#education>option:selected').val());
    const genderChecked =  $('input[name="gender"]:checked').val();
    this.person.gender = genderChecked ? Number(genderChecked) : null;
    const smokingChecked =  $('input[name="smoking"]:checked').val();
    this.person.isSmoking = smokingChecked ? smokingChecked === 'yes' : null;
    const agreementChecked =  $('#agreement:checked').val();
    this.person.isAgreed = agreementChecked ? agreementChecked === 'on' : null;

    // Check all form data if all fields entered
    this.correct = this.checkMinimumLength('firstName', this.person.firstName,  3);
    this.correct = this.checkMinimumLength('lastName', this.person.lastName,  3) && this.correct;
    this.correct = this.checkValidDate('dob', this.person.dateOfBirth) && this.correct;
    this.correct = this.checkMinimumLength('phone', this.person.phoneNumber, 10) && this.correct;
    this.correct = this.checkNotNull('gender', this.person.gender) && this.correct;
    this.correct = this.checkMinimumNumber('education', this.person.education, 1) && this.correct;
    this.correct = this.checkNotNull('smoking', this.person.isSmoking) && this.correct;
    if (this.person.isAgreed) {
      $('.icon-question').css('color', 'black');
    } else {
      this.checkNotNull('agree', this.person.isAgreed);
      $('.icon-question').css('color', 'red');
    }
    if (this.correct) {
      $('.msg-ok').css('visibility', 'visible');
    }
  }

  // Check element for error, make red box and display error message
  private checkMinimumLength(field: string, data: string, minimumLength: number = 1): boolean {
    if (data.length < minimumLength) {
        this.setErrorMessage(field);
        return false;
    }
    return true;
  }

  private checkMinimumNumber(field: string, data: number, minimumNumber: number = 1): boolean {
    if (data < minimumNumber) {
        this.setErrorMessage(field);
        return false;
    }
    return true;
  }

  private checkValidDate(field: string, data: Date): boolean {
    if (data.toString() === 'Invalid Date') {
        this.setErrorMessage(field);
        return false;
    }
    return true;
  }

  private checkNotNull(field: string, data: boolean | number | null): boolean {
    if (data === null) {
        this.setErrorMessage(field);
        return false;
    }
    return true;
  }

  private setErrorMessage(field: string) {
    $('.' + field + '-err').css('display', 'flex');
    $('.' + field).css('borderColor', 'red');
  }

}
