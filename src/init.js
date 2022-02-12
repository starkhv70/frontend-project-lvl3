import i18next from 'i18next';
import initWathcer from './watcher.js';
import resources from './locales/index.js';
import View from './view';
import RSSReader from './RSSReader.js';

const appConfig = {
  PROXY_URL: 'https://hexlet-allorigins.herokuapp.com/get',
  PROXY_PARAM: { disableCache: true },
};

export default () => {
  const initState = {
    app: {
      lang: 'ru',
    },
    form: {
      state: 'filling',
      error: null,
    },
    feeds: [],
  };

  const rssReader = new RSSReader(appConfig);
  const i18nextInstance = i18next.createInstance();

  return i18nextInstance.init({
    lang: initState.app.lang,
    fallbackLng: initState.app.lang,
    debug: true,
    resources,
  })
    .then(() => {
      const view = new View(i18nextInstance, rssReader);
      const state = initWathcer(initState, view);
      view.init(state);
    });
};
