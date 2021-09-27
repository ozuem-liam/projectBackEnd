export default class TPResponse {
  message: string;
  errors: never[];
  data: {};
  constructor({ data = {}, errors = [], message = '' }) {
    this.data = data;
    this.errors = errors;
    this.message = message;
  }
}
