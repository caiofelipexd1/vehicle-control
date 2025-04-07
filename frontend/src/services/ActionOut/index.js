import Request from '../../interceptor/Request';
import FatalError from '../../custom/Error';

const req = new Request();
const path = '/action_out';

export async function loadActionOut() {
  try {
    const ao = await req.exec('GET', path);
    const { data } = ao;
    return data;
  } catch(e) {
    const name = e.code;
    const code = e.response.status;
    const { error_message } = e.response.data;
    throw new FatalError(name, code, error_message);
  }
}

export async function createActionOut(action_out) {
  try {
    const ao = await req.exec('POST', path, action_out);
    const { data } = ao;
    return data;
  } catch(e) {
    const name = e.code;
    const code = e.response.status;
    const { error_message } = e.response.data;
    throw new FatalError(name, code, error_message);
  }
}