import React, { useEffect, useState } from 'react';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { createVehicle, loadVehicles, updateVehicle } from '../../services/Vehicles';
import { loadVehicleTypes } from '../../services/VehicleTypes';
import { Button, TextField } from '@mui/material';
import Menu from '../../components/Menu';
import Feedback from '../../components/Feedback';
import Dialog from '../../components/Dialog';
import Autocomplete from '../../components/Autocomplete';
import Datatable from '../../components/Datatable';
import Spinner from '../../components/Spinner';
import Chip from '../../components/Chip';

const VehiclesTypesPage = () => {
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState({ open: false });
  const [vehicles, setVehicles] = useState([]);
  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [showCreate, setShowCreate] = useState(false);
  const [newVehicle, setNewVehicle] = useState({ active: true });
  const [showEdit, setShowEdit] = useState(false);
  const [vehicleToEdit, setVehicleToEdit] = useState({});
  const [sync, setSync] = useState(false);

  const handleCloseFeedback = () => setFeedback({ open: false });
  const handleCancelClose = () => {
    setShowCreate(false);
    setNewVehicle({ active: true });
    setShowEdit(false);
    setVehicleToEdit({});
  }

  function handleChangeAutocomplete(_, { id }) {
    setNewVehicle({ ...newVehicle, vehicle_type_id: id });
  }

  function handleChangeAutocompleteEdit(_, { id }) {
    setVehicleToEdit({ ...vehicleToEdit, vehicle_type_id: id });
  }

  function handleShowCreate() {
    setShowCreate(true);
  }

  const handleChangeInput = ({ target: { name, value }}) => {
    setNewVehicle({ ...newVehicle, [name]: value });
  }

  const handleChangeInputEdit = ({ target: { name, value }}) => {
    setVehicleToEdit({ ...vehicleToEdit, [name]: value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      await createVehicle(newVehicle);
      setSync(!sync);
      setShowCreate(false);
      setNewVehicle({ active: true });
      setFeedback({
        open: true,
        severity: "success",
        message: "Veículo adicionado com sucesso!"
      });
    } catch (err) {
      setFeedback({
        open: true,
        severity: 'error',
        message: 'Falha durante o processo. Tente novamente mais tarde ou entre em contato com o Administrador.'
      });
    }
  }

  function handleClickEdit(id) {
    setShowEdit(true);
    setVehicleToEdit(vehicles[vehicles.findIndex(element => element.id === id)]);
  }

  async function handleUpdate(event) {
    event.preventDefault();
    try {
      await updateVehicle(vehicleToEdit);
      let local_arr = vehicles;
      local_arr.splice(vehicles.findIndex(vel => vel.id === vehicleToEdit.id), 1);
      local_arr.push(vehicleToEdit);
      setVehicles([...local_arr]);
      setShowEdit(false);
      setFeedback({
        open: true,
        severity: "success",
        message: "Informações do veículo atualizadas com sucesso!"
      });
      setVehicleToEdit({});
    } catch (err) {
      setFeedback({
        open: true,
        severity: 'error',
        message: 'Falha durante o processo. Tente novamente mais tarde ou entre em contato com o Administrador.'
      });
    }
  }

  useEffect(() => {
    async function loadData() {
      try {
        const [vehls, vehls_type] = await Promise.all([loadVehicles(), loadVehicleTypes()]);
        setVehicles(vehls);
        setVehicleTypes(vehls_type);
        setLoading(false);
      } catch (err) {
        setFeedback({
          open: true,
          severity: 'error',
          message: 'Falha ao carregar os dados. Tente novamente mais tarde ou entre em contato com o Administrador.'
        });
      }
    }
    loadData();
  }, [sync]);

  const columns = [
    {
      name: 'name',
      label: 'Nome',
      options: {
        filter: true,
      },
    },
    {
      name: 'license_plate',
      label: 'Placa',
      options: {
        filter: true,
      }
    },
    {
      name: 'codename',
      label: 'Frota',
      options: {
        filter: true,
      }
    },
    {
      name: 'active',
      label: 'Ativo',
      options: {
        filter: true,
        customBodyRender: (param) => param ? <Chip label="Sim" color="success" /> : <Chip label="Não" color="error" /> 
      }
    },
    {
      name: 'id',
      label: 'Options',
      options: {
        customBodyRender: (param) => {
          return (
            <div>
              <Button variant="contained" size='small' color='warning' disableElevation onClick={() => handleClickEdit(param)}>
                <EditIcon />
              </Button>
              &nbsp;&nbsp;
              <Button variant="contained" size='small' color="error" disableElevation onClick={() => console.log(param)}>
                <DeleteIcon />
              </Button>
            </div>
          )
        }
      }
    }
  ];

  return (
    <Menu title='Veículos'>
      <Feedback open={feedback.open} severity={feedback.severity} message={feedback.message} onClose={handleCloseFeedback}/>
      <div style={{ display: 'flex', justifyContent: 'flex-end', paddingBottom: '15px' }}>
        <Button variant="contained" color="info" disableElevation onClick={handleShowCreate}>
          Cadastrar
        </Button>
      </div>
      { loading ? <Spinner /> : <Datatable title="Veículos" data={vehicles} columns={columns} /> }
      <Dialog title='Cadastrar veículo' subtitle='Cadastre um novo veículo' open={showCreate} onCancelClose={handleCancelClose} onSubmit={handleSubmit}>
        <form autoComplete='off'>
          <TextField id="outlined-basic" autoFocus name='name' value={newVehicle.name} label="Nome" variant="outlined" fullWidth onChange={handleChangeInput}/>
          <br />
          <br />
          <TextField id="outlined-basic" name='codename' value={newVehicle.codename} label="Frota" variant="outlined" fullWidth onChange={handleChangeInput}/>
          <br />
          <br />
          <TextField id="outlined-basic" name='license_plate' value={newVehicle.license_plate} label="Placa" variant="outlined" fullWidth onChange={handleChangeInput}/>
          <br />
          <br />
          <Autocomplete title="Tipo de Veículo" label="Tipo de Veículo" data={vehicleTypes} onChange={handleChangeAutocomplete}/>
          <br />
          <TextField id="outlined-basic" name='description' value={newVehicle.description} label="Descrição" variant="outlined" fullWidth onChange={handleChangeInput}/>
        </form>
      </Dialog>
      { /* edit page */ }
      <Dialog title="Editar Veículo" open={showEdit} isEditing={true} onCancelClose={handleCancelClose} onSave={handleUpdate}>
        <form autoComplete="off">
          <TextField id="outlined-basic" autoFocus name='name' value={vehicleToEdit.name} label="Nome" variant="outlined" fullWidth onChange={handleChangeInputEdit}/>
          <br />
          <br />
          <TextField id="outlined-basic" name='codename' value={vehicleToEdit.codename} label="Frota" variant="outlined" fullWidth onChange={handleChangeInputEdit}/>
          <br />
          <br />
          <TextField id="outlined-basic" name='license_plate' value={vehicleToEdit.license_plate} label="Placa" variant="outlined" fullWidth onChange={handleChangeInputEdit}/>
          <br />
          <br />
          <Autocomplete title="Tipo de Veículo" label="Tipo de Veículo" defaultValue={vehicleTypes[vehicleTypes.findIndex(vel => vel.id === vehicleToEdit.vehicle_type_id)]} data={vehicleTypes} onChange={handleChangeAutocompleteEdit}/>
          <br />
          <TextField id="outlined-basic" name='description' value={vehicleToEdit.description} label="Descrição" variant="outlined" fullWidth onChange={handleChangeInputEdit}/>
        </form>
      </Dialog>
    </Menu>
  );
}

export default VehiclesTypesPage;