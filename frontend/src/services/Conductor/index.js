import Request from '../../interceptor/Request';
import FatalError from '../../custom/Error';

const req = new Request();
const path = '/collaborators';

export async function loadConductors() {
  try {
    const conductors = await req.exec('GET', path);
    const { data } = conductors;
    return data;
  } catch (err) {
    return err;
  }
}

export async function createConductor(conductor) {
  try {
    const newConductor = await req.exec('POST', path, conductor);
    const { data } = newConductor;
    return data;
  } catch (err) {
    const name = err.code;
    const code = err.request.status;
    const message = err.response.data.error.Message;
    throw new FatalError(name, code, message);
  }
}

export async function updateConductor(conductor) {
  try {
    const update = await req.exec('PUT', `${path}/${conductor.id}`, conductor);
    const { data } = update;
    return data;
  } catch (err) {
    const name = err.code;
    const code = err.request.status;
    const message = err.response.data.error.Message;
    throw new FatalError(name, code, message);
  }
}

export async function disableConductor(id) {
  try {
    await req.exec('DELETE', `${path}/${id}`);
    return
  } catch (err) {
    const name = err.code;
    const code = err.request.status;
    const message = err.response.data.error.Message;
    throw new FatalError(name, code, message);
  }
}