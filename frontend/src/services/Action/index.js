import Request from '../../interceptor/Request';
import FatalError from '../../custom/Error';

const request = new Request();
const path = '/actions';

export async function loadActions() {
  try {
    const actions = await request.exec('GET', path);
    return actions;
  } catch(e) {
    const name = e.code;
    const code = e.request.status;
    const message = e.response.data.error.Message;
    throw new FatalError(name, code, message);
  }
}

export async function loadActionsOpened() {
  try {
    const actions = await request.exec('GET', `${path}?status=opened`);
    const { data } = actions;
    return data;
  } catch(e) {
    const name = e.code;
    const code = e.request.status;
    const message = e.response.data.error.Message;
    throw new FatalError(name, code, message);
  }
}

export async function loadActionsWithoutOut() {
  try {
    const actions = await request.exec('GET', `${path}?status=withoutOut`);
    return actions;
  } catch(e) {
    const name = e.code;
    const code = e.request.status;
    const message = e.response.data.error.Message;
    throw new FatalError(name, code, message);
  }
}


export async function createAction(action) {
  try {
    const act = await request.exec('POST', path, action);
    const { data } = act;
    return data;
  } catch(e) {
    const name = e.code;
    const code = e.response.status;
    const { error_message } = e.response.data;
    throw new FatalError(name, code, error_message);
  }
}