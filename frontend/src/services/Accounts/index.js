import Request from '../../interceptor/Request';
import FatalError from '../../custom/Error';

const req = new Request();
const path = '/accounts';

export async function loadAccounts() {
  try {
    const accounts = await req.exec('GET', path);
    return accounts;
  } catch (e) {
    const name = e.code;
    const code = e.request.status;
    const message = e.response.data.error.Message;
    throw new FatalError(name, code, message);
  }
}

export async function createAccount(account) {
  try {
    const new_account = await req.exec('POST', path, { ...account, "account_status_id": 1 });
    const { data } = new_account;
    return data;
  } catch(error) {
    const { status } = error.response;
    const { code } = error;
    const { error_message } = error.response.data;
    throw new FatalError(code, status, error_message);
  }
}

export async function updateAccount(account) {
  try {
    const updated_account = await req.exec('PUT', `${path}/${account.id}`, account);
    const { data } = updated_account.data;
    return data;
  } catch(e) {
    const name = e.code;
    const code = e.request.status;
    const message = e.response.data.error.Message;
    throw new FatalError(name, code, message);
  }
}