export class Person {
  firstName = '';
  lastName = '';
  dateOfBirth: Date;
  phoneNumber = '';
  gender: number | null = null;
  education = 0;
  educationName: string;
  isSmoking: boolean | null = null;
  isAgreed: boolean | null = null;

  validate(): boolean {
    return this.firstName.length >= 3
      && this.lastName.length >= 3
      && this.dateOfBirth !== undefined
      && this.phoneNumber.length >= 10
      && !!this.gender
      && this.education >= 1
      && !!this.isSmoking
      && !!this.isAgreed;
  }

  clone(): Person {
    let p = new Person();
    p.firstName = this.firstName;
    p.lastName = this.lastName;
    p.dateOfBirth = this.dateOfBirth;
    p.phoneNumber = this.phoneNumber;
    p.gender = this.gender;
    p.education = this.education;
    p.educationName = this.educationName;
    p.isSmoking = this.isSmoking;
    p.isAgreed = this.isAgreed;
    p.clone = this.clone;
    p.validate = this.validate;
    return p;
  }
}
