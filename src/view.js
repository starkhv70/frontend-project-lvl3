import Form from './components/form.js';

export default class View {
  constructor(i18instance) {
    this.i18n = i18instance;
    this.form = new Form(this.i18n);
  }

  init(state) {
    this.form.init(state);
  }
}
