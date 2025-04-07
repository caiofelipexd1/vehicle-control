import Request from '../../interceptor/Request';
import FatalError from '../../custom/Error';

const req = new Request();
const path = '/vehicles';

export async function loadVehicles() {
  try {
    const vehicles = await req.exec('GET', path);
    const { data } = vehicles;
    return data;
  } catch (err) {
    const name = err.code;
    const code = err.request.status;
    const message = err.response.data.error.Message;
    throw new FatalError(name, code, message);
  }
}

export async function loadVehicle(id) {
  try {
    const vehicles = await req.exec('GET', `${path}/${id}`);
    const { data } = vehicles;
    return data;
  } catch (err) {
    const name = err.code;
    const code = err.request.status;
    const message = err.response.data.error.Message;
    throw new FatalError(name, code, message);
  }
}

export async function createVehicle(vehicle) {
  try {
    const new_vehicle = await req.exec('POST', path, vehicle);
    const { data } = new_vehicle;
    return data;
  } catch (err) {
    const name = err.code;
    const code = err.request.status;
    const message = err.response.data.error.Message;
    throw new FatalError(name, code, message);
  }
}

export async function updateVehicle(vehicle) {
  try {
    const updated_vehicle = await req.exec('PUT', `${path}/${vehicle.id}`, vehicle);
    const { data } = updated_vehicle.data;
    return data;
  } catch (err) {
    const name = err.code;
    const code = err.request.status;
    const message = err.response.data.error.Message;
    throw new FatalError(name, code, message);
  }
}

export async function deleteVehicle(id) {
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