import { string } from 'yup';

const validateUrl = (url, urls) => string()
  .required('requiredField')
  .url('invalidUrl')
  .notOneOf(urls, 'notUnique')
  .validate(url)
  .then(() => ({ isError: false }))
  .catch((e) => ({ isError: true, message: e.message }));

export default class Form {
  constructor(i18Instance, rssReader) {
    this.i18n = i18Instance;
    this.rssReader = rssReader;
    this.element = document.querySelector('.rss-form');
    this.button = document.querySelector('.btn-primary');
    this.input = document.querySelector('#url-input');
    this.formFeedback = document.querySelector('.feedback');
    this.exampleText = document.querySelector('#form-example');
  }

  init(state) {
    this.button.textContent = this.i18n.t('button.addUrl');
    this.exampleText.textContent = this.i18n.t('form.example');
    this.input.setAttribute('placeholder', this.i18n.t('form.inputPlaceholder'));

    this.element.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const url = formData.get('url');
      state.form.state = 'processing';
      validateUrl(url, state.feeds)
        .then((result) => {
          if (result.isError) {
            state.form.error = result.message;
            state.form.state = 'failed';
            return;
          }
          state.feeds.push(url);
          state.form.state = 'finished';
        });
    });
  }

  renderProcessing() {
    this.button.disabled = true;
    this.input.setAttribute('readonly', true);
    this.input.classList.remove('is-invalid');
    this.formFeedback.classList.remove('text-danger');
    this.formFeedback.textContent = this.i18n.t('form.feedback.processing');
  }

  renderFailed(errorMesage) {
    this.button.disabled = false;
    this.input.focus();
    this.input.removeAttribute('readonly');
    this.formFeedback.textContent = this.i18n.t(`form.error.${errorMesage}`);
    this.formFeedback.classList.add('text-danger');
    this.input.classList.add('is-invalid');
  }

  renderFinished() {
    this.button.disabled = false;
    this.input.removeAttribute('readonly');
    this.input.classList.remove('is-invalid');
    this.input.value = '';
    this.input.focus();
    this.formFeedback.textContent = this.i18n.t('form.feedback.finished');
    this.formFeedback.classList.remove('text-danger');
    this.formFeedback.classList.add('text-success');
  }
}
