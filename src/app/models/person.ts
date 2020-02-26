export class Person {
  firstName = '';
  lastName = '';
  dateOfBirth: Date;
  phoneNumber = '';
  gender: number | null = null; // 0 - male, 1 - female
  education = 0;
  isSmoking: boolean | null = null;
  isAgreed: boolean | null = null;

  clone(): Person {
    let p = new Person();
    p.firstName = this.firstName
    // etc
    return p;
  }

}
