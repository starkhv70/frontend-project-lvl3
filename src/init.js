import i18next from 'i18next';
import initHandlers from './handlers.js';
import resources from './locales/index.js';
import View from './view';

export default () => {
  const initState = {
    app: {
      lang: 'ru',
    },
    form: {
      state: 'filling',
    },
    feedback: {
      isError: false,
      message: '',
    },
    feeds: [],
  };

  const i18nextInstance = i18next.createInstance();

  return i18nextInstance.init({
    lang: initState.app.lang,
    debug: true,
    resources,
  })
    .then(() => {
      const view = new View(i18nextInstance);
      const state = initHandlers(initState);
      view.init(state);
    });
};
