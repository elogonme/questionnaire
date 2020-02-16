import { Component } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  name: string = '';
  lastname: string = '';
  dateOfBirth: string = '';
  phoneNumber: string = '';
  gender: string = '';
  education: string = '';
  isSmoking: string = '';
  isAgreed: string = '';
  correct: boolean = false;

  startChecks() {
    // Reset all errors
    $(".msg").css("display", "none");
    $(".box").css("borderColor", "initial");
    $('#checkMsg').css('visibility', 'hidden');
    this.correct = true;

    // get all Form data - all fields
    this.name = $("#firstname").val().toString();
    this.lastname = $("#lastname").val().toString();
    this.dateOfBirth  = $("#dob").val().toString();
    this.phoneNumber  = $("#phone").val().toString();
    this.education = $("#education>option:selected").text()
    this.isAgreed  = ($('#agreement:checked').val() || '').toString();
    // Get gender
    this.gender = ($("input[name='gender']:checked").val() || '').toString();
    // Get Smoking or not
    this.isSmoking = ($("input[name='smoking']:checked").val() || '').toString();

    // Check all form data if all feilds entered
    this.checkElement(this.name,'.name');
    this.checkElement(this.lastname,'.lastname');
    this.checkElement(this.dateOfBirth,'.dob');
    this.checkElement(this.phoneNumber,'.phone');
    this.checkElement(this.gender,'.gender');
    this.checkElement(this.education,'.education');
    this.checkElement(this.isSmoking,'.smoking');
    if (this.isAgreed) {
        $('.icon-question').css('color', 'black');
    } else {
      this.checkElement('','.agree');
        $('.icon-question').css('color', 'red');
    }
    if (this.correct) {
        $('.msg-ok').css('visibility', 'visible');
    }
  }

  // Check element for error, make red box and display error message
  private checkElement(el, cls) {
    if (el === '') {
        $(cls + '-err').css('display', 'flex')
        $(cls).css('borderColor', 'red')
        this.correct = false;
    }
  };

}
