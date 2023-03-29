export class Validator {
  name: string;
  state: string;
  message: string;

  constructor(name: string, state: string = '', message: string = '') {
    this.name = name;
    this.state = state;
    this.message = message;
  }
}