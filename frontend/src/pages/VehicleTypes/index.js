import React, { useState, useEffect } from 'react';
import { Button, TextField } from '@mui/material';
import Menu from '../../components/Menu/index';
import Dialog from '../../components/Dialog';
import Feedback from '../../components/Feedback';
import { deleteVehicleType, loadVehicleTypes, storeVehicleType, updateVehicleType } from '../../services/VehicleTypes';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import Datatable from '../../components/Datatable';
import Spinner from '../../components/Spinner';

const VehiclesPage = () => {
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState({ open: false });
  const [showCreate, setShowCreate] = useState(false);
  const [newVehicleType, setNewVehicleType] = useState({});
  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [vehicleTypeEdit, setVehicleTypeEdit] = useState({});
  const [showEdit, setShowEdit] = useState(false);

  const columns = [
    {
      name: 'id',
      label: 'Código',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'name',
      label: 'Nome',
      options: {
        filter: true,
      },
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
              <Button variant="contained" size='small' color="error" disableElevation onClick={() => handleClickDelete(param)}>
                <DeleteIcon />
              </Button>
            </div>
          )
        }
      }
    }
  ];

  function handleClickEdit(id) {
    const index = vehicleTypes.findIndex(element => element.id === id);
    setVehicleTypeEdit(vehicleTypes[index]);
    setShowEdit(true);
  }

  async function handleClickDelete(id) {
    const accept = window.confirm(`Deseja continuar com o processo de exclusão do registro?`);
    if (accept) {
      try {
        await deleteVehicleType(id);
        let local_array = vehicleTypes;
        const index = local_array.findIndex(element => element.id === id);
        local_array.splice(index, 1);
        setVehicleTypes([...local_array]);
        setFeedback({
          open: true,
          severity: 'success',
          message: 'Registro excluído com sucesso!'
        });
      } catch (err) {
        setFeedback({
          open: true,
          severity: 'error',
          message: `Falha ao concluir o processo. Tente novamente mais tarde ou entre em contato com o Administrador. ${err.name}`
        });
      }
    }
  }

  function handleCloseFeedback() {
    setFeedback({ open: false });
  }

  function handleCreate() {
    setShowCreate(true);
  }

  function handleCancelClose() {
    setShowCreate(false);
    setNewVehicleType({});
    setShowEdit(false);
    setVehicleTypeEdit({});
  }

  function handleChangeInput({ target: { name, value } }) {
    setNewVehicleType({...newVehicleType, [name]: value });
  }

  function handleChangeInputEdit({ target: { name, value } }) {
    setVehicleTypeEdit({...vehicleTypeEdit, [name]: value });
  }

  async function handleUpdate() {
    try {
      const new_vehicle_type = await updateVehicleType(vehicleTypeEdit);
      setVehicleTypeEdit({});
      let local_array = vehicleTypes;
      const index = local_array.findIndex(element => element.id === vehicleTypeEdit.id);
      local_array.splice(index, 1);
      local_array.push(new_vehicle_type);
      setVehicleTypes(local_array);
      setShowEdit(false);
      setFeedback({
        open: true,
        severity: 'success',
        message: 'Registro atualizado com sucesso!',
      });
    } catch (err) {
      setFeedback({
        open: true,
        severity: 'error',
        message: `Falha ao concluir o processo. Tente novamente mais tarde ou entre em contato com o Administrador. ${err.name}`
      });
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const new_vehicle_type = await storeVehicleType(newVehicleType);
      setVehicleTypes([...vehicleTypes, new_vehicle_type]);
      setNewVehicleType({});
      setShowCreate(false);
      setFeedback({
        open: true,
        severity: 'success',
        message: 'Tipo de veículo adicionado com sucesso!'
      });
    } catch (err) {
      setFeedback({
        open: true,
        severity: 'error',
        message: `Falha ao concluir o processo. Tente novamente mais tarde ou entre em contato com o Administrador. ${err.name}`
      });
    }
  }

  useEffect(() => {
    async function loadData() {
      try {
        const vehicleTypes = await loadVehicleTypes();
        setVehicleTypes(vehicleTypes);
        setLoading(false);
      } catch (err) {
        setFeedback({
          open: true,
          severity: 'error',
          message: 'Falha ao carregar os dados. Tente novamente mais tarde ou entre me contato com o Administrador.'
        });
      }
    }
    loadData();
  }, []);

  return (
    <>
      <Feedback open={feedback.open} severity={feedback.severity} message={feedback.message} onClose={handleCloseFeedback}/>
      <Menu title="Tipo de Veículo">
        <div style={{ display: 'flex', justifyContent: 'flex-end', paddingBottom: '15px' }}>
          <Button variant="contained" color="info" disableElevation onClick={handleCreate}>
            Cadastrar
          </Button>
        </div>
        { loading ? <Spinner /> : <Datatable title="Tipo de Veículos" columns={columns} data={vehicleTypes} /> }
        <Dialog title='Cadastrar tipo de veículo' open={showCreate} onCancelClose={handleCancelClose} onSubmit={handleSubmit}>
          <form autoComplete="off">
            <TextField id="name" autoFocus name="name" label="Nome" variant="outlined" fullWidth onChange={handleChangeInput}/>
          </form>
        </Dialog>
        <Dialog title="Editar tipo de veículo" open={showEdit} isEditing onCancelClose={handleCancelClose} onSave={handleUpdate}>
          <form autoComplete="off">
            <TextField id="name" autoFocus name="name" label="Nome" value={vehicleTypeEdit.name} variant="outlined" fullWidth onChange={handleChangeInputEdit}/>
          </form>
        </Dialog>
      </Menu>
    </>
  );
}

export default VehiclesPage;