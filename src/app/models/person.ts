export class Person {
  firstName = '';
  lastName = '';
  dateOfBirth: Date;
  phoneNumber = '';
  gender: number | null = null; // 0 - male, 1 - female
  education = 0;
  isSmoking: boolean | null = null;
  isAgreed: boolean | null = null;

  validate(): boolean {
    return this.firstName.length >= 3
      && this.lastName.length >= 3
      && (this.dateOfBirth !== undefined || this.dateOfBirth.toString() === 'Invalid Date')
      && this.phoneNumber.length >= 10
      && !!this.gender
      && this.education > 1
      && !!this.isSmoking
      && !!this.isAgreed;
  }
}
