import Form from './components/form.js';

export default class View {
  constructor(i18instance, rssReader) {
    this.i18n = i18instance;
    this.rssReader = rssReader;
    this.form = new Form(this.i18n, rssReader);
    this.appName = document.querySelector('h1');
  }

  init(state) {
    this.appName.textContent = this.i18n.t('appName');
    this.form.init(state);
  }
}
