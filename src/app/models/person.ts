export class Person {
  firstName = '';
  lastName = '';
  dateOfBirth: Date;
  phoneNumber = '';
  gender: number | null = null; // 0 - male, 1 - female
  education = 0;
  isSmoking: boolean | null = null;
  isAgreed: boolean | null = null;
}
