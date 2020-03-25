export class Person {

  constructor(
    public id = '',
    public firstName = '',
    public lastName = '',
    public dateOfBirth: Date = null,
    public phoneNumber = '',
    public gender: number | null = null,
    public educationId = 0,
    public isSmoking: boolean | null = null,
    public isAgreed: boolean | null = null,
  ) {}

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

export const EDUCATION_MAP = new Map<number, string>([
  [1, 'None'],
  [2, 'Secondary'],
  [3, 'Post-secondary'],
  [4, `Bachelor's degree`],
  [5, `Master's degree`]
]);
