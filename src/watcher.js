import onChange from 'on-change';

const formWatcher = (form, value, errorMesage) => {
  switch (value) {
    case 'finished':
      form.renderFinished();
      break;
    case 'processing':
      form.renderProcessing();
      break;
    case 'failed':
      form.renderFailed(errorMesage);
      break;
    default:
      throw new Error(`Unknown form state: ${value}`);
  }
};

export default (initState, view) => onChange(initState, (path, value) => {
  switch (path) {
    case 'form.state':
      formWatcher(view.form, value, initState.form.error);
      break;
    default:
      break;
  }
});
