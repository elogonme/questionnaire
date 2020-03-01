export class Person {
  firstName = '';
  lastName = '';
  dateOfBirth: Date;
  phoneNumber = '';
  gender: number | null = null;
  educationId = 0;
  isSmoking: boolean | null = null;
  isAgreed: boolean | null = null;

  validate(): boolean {
    return this.firstName.length >= 3
      && this.lastName.length >= 3
      && this.dateOfBirth !== undefined
      && this.phoneNumber.length >= 10
      && !!this.gender
      && this.educationId >= 1
      && !!this.isSmoking
      && !!this.isAgreed;
  }
}

export const EDUCATIONS_MAP = new Map<number, string>([
  [1, 'None'],
  [2, 'Secondary'],
  [3,'Post-secondary'],
  [4,`Bachelor's degree`],
  [5,`Master's degree`]]);
