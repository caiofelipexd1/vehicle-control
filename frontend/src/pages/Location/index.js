import React, { useState, useEffect } from 'react';
import { Button, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Menu from '../../components/Menu';
import Datatable from '../../components/Datatable';
import Feedback from '../../components/Feedback';
import Dialog from '../../components/Dialog';
import { loadLocations, loadLocation, createLocation, updateLocation, removeLocation } from '../../services/Location';
import Spinner from '../../components/Spinner';
import FatalError from '../../custom/Error';

const classes = {
  main: {
    display: 'flex',
    justifyContent: 'flex-end',
    paddingBottom: '10px'
  }
}

export default function LocationPage() {
  const [feedback, setFeedback] = useState({ open: false });
  const [locations, setLocations] = useState([]);
  const [showCreatePage, setShowCreatePage] = useState(false);
  const [location, setLocation] = useState({});
  const [loading, setLoading] = useState(true);
  /* edition variables */
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [locationToEdit, setLocationToEdit] = useState({});

  const handleCloseFeedback = () => setFeedback({ open: false });

  const handleShowCreate = () => {
    setShowCreatePage(true);
  };

  function handleCancelClose() {
    setShowCreatePage(false);
    setShowEditDialog(false);
    setLocation({});
    setLocationToEdit({});
  };

  const handleChangeInput = ({ target: { name, value } }) => {
    setLocation({ ...location, [name]: value });
  };

  const handleChangeInputEditing = ({ target: { name, value } }) => {
    setLocationToEdit({ ...locationToEdit, [name]: value });
  };

  const handleEdit = async (id) => {
    try {
      const editing = await loadLocation(id);
      setLocationToEdit(editing);
      setShowEditDialog(true);
    } catch (e) {
      setFeedback({
        open: true,
        severity: 'error',
        message: 'Falha na comunicação com o servidor. Tente novamente mais tarde ou entre em contato com o Administrador.',
      });
    }
  }

  async function sendUpdate() {
    try {
      await updateLocation(locationToEdit);
      setShowEditDialog(false);
      setFeedback({
        open: true,
        severity: 'success',
        message: 'Localidade atualizada com sucesso!'
      });
      setLocationToEdit({});
      let local_locations = locations;
      const index = local_locations.findIndex((element) => element.id === locationToEdit.id);
      local_locations.splice(index, 1);
      setLocations([ ...local_locations, locationToEdit ]);
    } catch (e) {
      setFeedback({
        open: true,
        severity: 'error',
        message: 'Falha na comunicação com o servidor. Tente novamente mais tarde ou entre em contato com o Administrador.',
      });
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const new_location = await createLocation(location);
      setShowCreatePage(false);
      setFeedback({
        open: true,
        severity: 'success',
        message: 'Localização cadastrada com sucesso.',
      });
      setLocations([...locations, new_location]);
      setLocation({});
    } catch (error) {
      setFeedback({
        open: true,
        severity: 'error',
        message: 'Falha ao cadastrar uma nova localização. Tente novamente mais tarde ou entre em contato com o Administrador.',
      });
    }
  };

  useEffect(() => {
    async function loadAllData() {
      try {
        const [loc] = await Promise.all([loadLocations()]);
        setLocations(loc);
        setLoading(false);
      } catch (e) {
        setLoading(false);
        if (e instanceof FatalError) {
          setFeedback({
            open: true,
            severity: 'error',
            message: `Falha ao carregar os dados. Tente novamente mais tarde ou entre em contato com o Administrador. [${e.name}]`
          });
        }
      }
    }
    loadAllData();
  }, []);

  async function deleteData(id) {
    const proceed = window.confirm('Deseja continuar com o processo de exclusão do registro?');
    if (proceed) {
      try {
        await removeLocation(id);
        // remove o registro localmente evitando a necessidade de fazer uma request para atualizar a tabela.
        let local_locations = locations;
        const index = local_locations.findIndex((element) => element.id === id);
        local_locations.splice(index, 1);
        setLocations([ ...local_locations ]);
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
  }

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
              <Button variant="contained" size='small' color='warning' disableElevation onClick={() => handleEdit(param)}>
                <EditIcon />
              </Button>
              &nbsp;&nbsp;
              <Button variant="contained" size='small' color="error" disableElevation onClick={() => deleteData(param)}>
                <DeleteIcon />
              </Button>
            </div>
          )
        }
      }
    }
  ];

  return (
    <Menu title="Locais">
      <Feedback
        open={feedback.open}
        severity={feedback.severity}
        message={feedback.message}
        onClose={handleCloseFeedback}
      />
      <div style={classes.main}>
        <Button variant="contained" color="info" disableElevation onClick={handleShowCreate}>
          Cadastrar
        </Button>
      </div>
      { loading ? <Spinner /> : <Datatable title="Localidades" data={locations} columns={columns} /> }
      { /* Create page */ }
      <Dialog title="Cadastro de Locais/Filiais"
        isEditing={false}
        subtitle="Cadastre uma nova localidade/filial"
        open={showCreatePage}
        onCancelClose={handleCancelClose}
        onSubmit={handleSubmit}
      >
        <form autoComplete="off">
          <TextField
            autoFocus
            id="name"
            name="name"
            label="Nome"
            variant="outlined"
            fullWidth
            onChange={handleChangeInput}/>
        </form>
      </Dialog>

      { /* Edit Page */ }
      <Dialog title="Edição de local/filial"
        isEditing={true}
        subtitle="Edite uma localidade/filial"
        open={showEditDialog}
        onCancelClose={handleCancelClose}
        onSave={sendUpdate}
      >
        <form autoComplete="off">
          <TextField
            autoFocus
            id="name"
            name="name"
            label="Nome"
            variant="outlined"
            fullWidth
            value={locationToEdit.name}
            onChange={handleChangeInputEditing}/>
        </form>
      </Dialog>
    </Menu>
  );
}
