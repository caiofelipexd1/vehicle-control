import Request from '../../interceptor/Request';
import FatalError from '../../custom/Error';

const req = new Request();
const path = '/vehicle_types';

export async function loadVehicleTypes() {
  try {
    const vehicle_types = await req.exec('GET', path);
    const { data } = vehicle_types;
    return data;
  } catch (err) {
    const name = err.code;
    const code = err.request.status;
    const message = err.response.data.error.Message;
    throw new FatalError(name, code, message);
  }
}

export async function loadVehicleType(id) {
  try {
    const vehicle_type = await req.exec('GET', `${path}/${id}`);
    const { data } = vehicle_type;
    return data;
  } catch (err) {
    const name = err.code;
    const code = err.request.status;
    const message = err.response.data.error.Message;
    throw new FatalError(name, code, message);
  }
}

export async function storeVehicleType(vehicle_type) {
  try {
    const new_vehicle_type = await req.exec('POST', path, vehicle_type);
    const { data } = new_vehicle_type;
    return data;
  } catch (err) {
    const name = err.code;
    const code = err.request.status;
    const message = err.response.data.error.Message;
    throw new FatalError(name, code, message);
  }
}

export async function updateVehicleType(vehicle_type) {
  try {
    const updated_vehicle_type = await req.exec('PUT', `${path}/${vehicle_type.id}`, vehicle_type);
    const { data } = updated_vehicle_type;
    return data;
  } catch (err) {
    const name = err.code;
    const code = err.request.status;
    const message = err.response.data.error.Message;
    throw new FatalError(name, code, message);
  }
}

export async function deleteVehicleType(id) {
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