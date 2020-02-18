import { Component } from '@angular/core';
import * as $ from 'jquery';

class Person {
  name: string;
  lastname: string;
  dateOfBirth: string;
  phoneNumber: string;
  gender: string;
  education: string;
  isSmoking: string;
  isAgreed: string;
  correct: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  person: Person = new Person();
  tableData: Person[] = [];

  startChecks() {
    // Reset all errors
    $(".msg").css("display", "none");
    $(".box").css("borderColor", "initial");
    $('#checkMsg').css('visibility', 'hidden');
    this.person.correct = true;

    // get all Form data - all fields
    this.person.name = $("#firstname").val().toString();
    this.person.lastname = $("#lastname").val().toString();
    this.person.dateOfBirth  = $("#dob").val().toString();
    this.person.phoneNumber  = $("#phone").val().toString();
    this.person.education = $("#education>option:selected").text()
    this.person.isAgreed  = ($('#agreement:checked').val() || '').toString();
    // Get gender
    this.person.gender = ($("input[name='gender']:checked").val() || '').toString();
    // Get Smoking or not
    this.person.isSmoking = ($("input[name='smoking']:checked").val() || '').toString();

    // Check all form data if all feilds entered
    this.checkElement(this.person.name,'.name');
    this.checkElement(this.person.lastname,'.lastname');
    this.checkElement(this.person.dateOfBirth,'.dob');
    this.checkElement(this.person.phoneNumber,'.phone');
    this.checkElement(this.person.gender,'.gender');
    this.checkElement(this.person.education,'.education');
    this.checkElement(this.person.isSmoking,'.smoking');
    if (this.person.isAgreed) {
        $('.icon-question').css('color', 'black');
    } else {
      this.checkElement('','.agree');
        $('.icon-question').css('color', 'red');
    }
    if (this.person.correct) {
        $('.msg-ok').css('visibility', 'visible');
    }
  }

  // Check element for error, make red box and display error message
  private checkElement(el, cls) {
    if (el === '') {
        $(cls + '-err').css('display', 'flex')
        $(cls).css('borderColor', 'red')
        this.person.correct = false;
    }
  };

}
