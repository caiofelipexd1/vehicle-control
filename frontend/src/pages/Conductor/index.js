import React, { useState, useEffect } from 'react';
import { Button, TextField } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import Menu from '../../components/Menu';
import Feedback from '../../components/Feedback';
import Datatable from '../../components/Datatable';
import Dialog from '../../components/Dialog';
import Autocomplete from '../../components/Autocomplete';
import { loadConductors, createConductor, disableConductor, updateConductor } from '../../services/Conductor';
import Spinner from '../../components/Spinner';
import Chip from '../../components/Chip';

export default function ConductorPage() {
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState({ open: false });
  const [conductors, setConductors] = useState([]);
  const [showCreatePage, setShowCreatePage] = useState(false);
  const [newConductor, setNewConductor] = useState({});
  const [conductorToEdit, setConductorToEdit] = useState({});
  const [showEditPage, setShowEditPage] = useState(false);

  const options = [
    {
      id: 1,
      name: 'Sim',
      label: 'is_authorized',
      value: true
    },
    {
      id: 0,
      name: 'Não',
      label: 'is_authorized',
      value: false
    }
  ];

  const columns = [
    {
      name: 'name',
      label: 'Nome',
      options: {
        filter: true,
      },
    },
    {
      name: 'cpf',
      label: 'CPF',
      options: {
        filter: true,
        customBodyRender: (param) => param ? param : "-"
      }
    },
    {
      name: 'rg',
      label: 'RG',
      options: {
        filter: true,
        customBodyRender: (param) => param ? param : "-"
      }
    },
    {
      name: 'is_authorized',
      label: 'Status',
      options: {
        filter: true,
        customBodyRender: (param) => param ? <Chip label="Autorizado" color="success" /> : <Chip label="Não Autorizado" color="error" /> 
      }
    },
    {
      name: 'id',
      label: 'Options',
      options: {
        customBodyRender: (param) => {
          return (
            <div>
              <Button variant="contained" size='small' color='warning' disableElevation onClick={() => handleEditConductor(param)}>
                <EditIcon />
              </Button>
              &nbsp;&nbsp;
              <Button variant="contained" size='small' color="error" disableElevation onClick={() => handleDisableConductor(param)}>
                <DeleteIcon />
              </Button>
            </div>
          )
        }
      }
    }
  ];

  /* feedback handlers */
  function handleCloseFeedback() {
    setFeedback({ open: false });
  }

  /* another handlers */
  function handleCancelClose() {
    setShowCreatePage(false);
    setShowEditPage(false);
    setNewConductor({});
    setConductorToEdit({});
  }

  /* create page handlers */
  function openCreatePage() {
    setShowCreatePage(true);
  }

  function onChangeInputCreatePage({ target: { name, value }}) {
    setNewConductor({ ...newConductor, [name]: value });
  }

  function onChangeAutocomplete(_, { label, value }) {
    setNewConductor({ ...newConductor, [label]: value });
  }

  function onChangeAutocompleteEdit(_, { label, value }) {
    setConductorToEdit({ ...conductorToEdit, [label]: value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const new_conductor = await createConductor(newConductor);
      setFeedback({
        open: true,
        severity: 'success',
        message: 'Condutor / Colaborador cadastrado com sucesso!'
      });
      setShowCreatePage(false);
      setConductors([ ...conductors, new_conductor ]);
    } catch (err) {
      setShowCreatePage(false);
      setNewConductor({});
      setFeedback({
        open: true,
        severity: 'error',
        message: 'Falha ao carregar os dados. Tente novamente mais tarde ou entre em contato com o Administrador.'
      });
    }
  }

  /* edit page handlers */
  function handleEditConductor(id) {
    let local_conductors = conductors
    const index = local_conductors.findIndex((element) => element.id === id);
    setConductorToEdit(conductors[index]);
    setShowEditPage(true);
  }

  function onChangeInputEditPage({ target: { name, value }}) {
    setConductorToEdit({ ...conductorToEdit, [name]: value });
  }

  async function handleUpdate() {
    try {
      await updateConductor(conductorToEdit);
      let local_update = conductors;
      const index = local_update.findIndex((element) => element.id === conductorToEdit.id);
      local_update.splice(index, 1);
      local_update.push(conductorToEdit);
      setConductors(local_update);
      setShowEditPage(false);
      setConductorToEdit({});
      setFeedback({
        open: true,
        severity: 'success',
        message: 'Registro atualizado com sucesso!',
      });
    } catch (e) {
      setFeedback({
        open: true,
        severity: 'error',
        message: 'Falha no processo. Tente novamente mais tarde ou entre em contato com o Administrador.',
      });
    }
  }

  /* delete/remove handlers */
  async function handleDisableConductor(id) {
    const accept = window.confirm(`Deseja continuar com o processo de exclusão do registro?`);
    if (accept) {
      try {
        await disableConductor(id);
        // removendo o item do array de acordo com o index, baseado no id passado.
        let local_conductors = conductors;
        const index = local_conductors.findIndex((element) => element.id === id);
        local_conductors.splice(index, 1);
        setConductors(local_conductors);
        setFeedback({
          open: true,
          severity: 'success',
          message: 'Registro excluído com sucesso!',
        });
      } catch (e) {
        setFeedback({
          open: true,
          severity: 'error',
          message: 'Falha no processo. Tente novamente mais tarde ou entre em contato com o Administrador.',
        });
      }
    }
  };

  useEffect(() => {
    async function loadAllData() {
      try {
        const [cond] = await Promise.all([loadConductors()]);
        setConductors(cond);
        setLoading(false);
      } catch (e) {
        setFeedback({
          open: true,
          severity: 'error',
          message: 'Falha ao carregar os dados. Tente novamente mais tarde ou entre em contato com o Administrador.'
        });
      }
    }
    loadAllData();
  }, []);

  return (
    <>
      <Feedback open={feedback.open} severity={feedback.severity} message={feedback.message} onClose={handleCloseFeedback}/>
      <Menu title="Condutores & Motoristas">
        <div style={{ display: 'flex', justifyContent: 'flex-end', paddingBottom: '15px' }}>
          <Button variant="contained" color="info" disableElevation onClick={openCreatePage}>
            Cadastrar
          </Button>
        </div>
        { loading ? <Spinner /> : <Datatable title="Condutores & Motoristas" data={conductors} columns={columns} /> }
        { /* create page */ }
        <Dialog
          title="Adicionar Condutor & Motorista"
          open={showCreatePage}
          onCancelClose={handleCancelClose}
          onSubmit={handleSubmit}
        >
          <form autoComplete="off">
            <TextField id="outlined-basic" autoFocus name='name' label="Nome" variant="outlined" fullWidth onChange={onChangeInputCreatePage}/>
            <br />
            <br />
            <TextField id="outlined-basic" name='cpf' label="CPF" variant="outlined" fullWidth onChange={onChangeInputCreatePage}/>
            <br />
            <br />
            <TextField id="outlined-basic" name="rg" label="RG" variant="outlined" fullWidth onChange={onChangeInputCreatePage}/>
            <br />
            <br />
            <Autocomplete label="Autorizado?" data={options} onChange={onChangeAutocomplete} />
          </form>
        </Dialog>
        { /* edit page */ }
        <Dialog
          title="Editar Condutor & Motorista"
          open={showEditPage}
          isEditing={true}
          onCancelClose={handleCancelClose}
          onSave={handleUpdate}
        >
          <form autoComplete="off">
            <TextField id="outlined-basic" autoFocus name='name' value={conductorToEdit.name} label="Nome" variant="outlined" fullWidth onChange={onChangeInputEditPage}/>
            <br />
            <br />
            <TextField id="outlined-basic" name='cpf' value={conductorToEdit.cpf} label="CPF" variant="outlined" fullWidth onChange={onChangeInputEditPage}/>
            <br />
            <br />
            <TextField id="outlined-basic" name="rg" value={conductorToEdit.rg} label="RG" variant="outlined" fullWidth onChange={onChangeInputEditPage}/>
            <br />
            <br />
            <Autocomplete label="Autorizado?" defaultValue={options[options.findIndex(op => op.value === conductorToEdit.is_authorized)]} data={options} onChange={onChangeAutocompleteEdit} />
          </form>
        </Dialog>
      </Menu>
    </>
  );
}