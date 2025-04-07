import Request from '../../interceptor/Request';
import FatalError from '../../custom/Error';

const req = new Request();
const path = '/account_types';

export async function loadAccountTypes() {
  try {
    const account_types = await req.exec('GET', path);
    const { data } = account_types;
    return data;
  } catch (err) {
    const name = err.code;
    const code = err.request.status;
    const message = err.response.data.error.Message;
    throw new FatalError(name, code, message);
  }
}