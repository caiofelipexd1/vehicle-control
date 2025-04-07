import Request from '../../interceptor/Request';
import FatalError from '../../custom/Error';

const req = new Request();
const path = '/locations';

export async function loadLocations() {
  try {
    const locations = await req.exec('GET', path);
    const { data } = locations;
    return data;
  } catch(e) {
    const name = e.code;
    throw new FatalError(name, null, null);
  }
}

export async function loadLocation(id) {
  try {
    const locations = await req.exec('GET', `${path}/${id}`);
    const { data } = locations;
    return data;
  } catch(e) {
    const name = e.code;
    const code = e.response.status;
    const { error_message } = e.response.data;
    throw new FatalError(name, code, error_message);
  }
}

export async function createLocation(location) {
  try {
    const new_location = await req.exec('POST', path, location);
    const { data } = new_location;
    return data;
  } catch (e) {
    const name = e.code;
    const code = e.response.status;
    const { error_message } = e.response.data;
    throw new FatalError(name, code, error_message);
  }
}

export async function updateLocation({ id, ...args }) {
  try {
    const update = await req.exec('PUT', `${path}/${id}`, { ...args });
    const { data } = update;
    return data;
  } catch (e) {
    const name = e.code;
    const code = e.response.status;
    const { error_message } = e.response.data;
    throw new FatalError(name, code, error_message);
  }
}

export async function removeLocation(id) {
  try {
    await req.exec('DELETE', `${path}/${id}`);
    return;
  } catch (error) {
    return error;
  }
}