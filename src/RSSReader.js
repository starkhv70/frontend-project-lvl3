import axios from 'axios';

const load = (url, urlParam) => axios.get(url, { params: urlParam })
  .then(({ data }) => data.contents)
  .catch(() => {
    throw new Error('form.error.network');
  });
const genId = () => {
  let counter = 0;
  return () => {
    counter += 1;
    return counter;
  };
};

const parseFeed = (channel) => {
  const titleEl = channel.querySelector('title');
  const title = titleEl.textContent;
  const descriptionEl = channel.querySelector('description');
  const description = descriptionEl.textContent;
  return { title, description };
};

const parsePost = (item) => {
  const titleEl = item.querySelector('title');
  const title = titleEl.textContent;
  const descriptionEl = item.querySelector('description');
  const description = descriptionEl.textContent;
  const linkEl = item.querySelector('link');
  const link = linkEl.textContent;
  return { title, description, link };
};

export default class RSSReader {
  constructor(appConfig) {
    this.proxy_url = appConfig.PROXY_URL;
    this.proxy_param = appConfig.PROXY_PARAM;
    this.parser = new DOMParser();
    this.genId = genId();
  }

  addFeed(url) {
    load(this.proxy_url, { ...this.proxy_param, url })
      .then((rawData) => this.parse(rawData));
  }

  parse(rawData) {
    const document = this.parser.parseFromString(rawData, 'application/xml');
    const errorNode = document.querySelector('parsererror');
    if (errorNode) {
      throw new Error('form.error.parser');
    }
    const channel = document.querySelector('channel');
    const feed = parseFeed(channel);
    const posts = [...channel.querySelectorAll('item')].map((item) => parsePost(item));
    return { feed, posts };
  }
}
