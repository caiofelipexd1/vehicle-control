 import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LogoutIcon from '@mui/icons-material/Logout';
import { Button, Box } from '@mui/material';
import AddAPhotoIcon from '@mui/icons-material/PhotoCamera';
import Autocomplete from '../../components/Autocomplete';
import Feedback from '../../components/Feedback';
import { loadConductors } from '../../services/Conductor';
import { loadVehicles } from '../../services/Vehicles';
import Resizer from "react-image-file-resizer";
import Tabs from '../../components/Tabs';
import TabPanel from '@mui/lab/TabPanel';
import { createAction } from '../../services/Action';
import { FormControlLabel, Checkbox } from '@mui/material';
import useAccount from '../../hooks/Account';
import Datatable from '../../components/Datatable';
import { PeopleAlt, Restore as RestoreIcon } from '@mui/icons-material';
import { loadActionsWithoutOut } from '../../services/Action';
import { createActionOut } from '../../services/ActionOut';
import FormDialog from '../../components/Dialog';
import Spinner from '../../components/Spinner';
import TransferWithinAStationIcon from '@mui/icons-material/TransferWithinAStation';
import moment from 'moment';
import { TextField } from '@mui/material';
import Dialog from '../../components/Dialog';
import { createConductor } from '../../services/Conductor';

const classes = {
  main: {
    display: 'flex',
    justifyContent: 'flex-end',
    paddingBottom: '15px'
  },
  main2: {
    display: 'flex',
    justifyContent: 'center',
    paddingBottom: '15px'
  },
}
const AgentPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const account = useAccount();
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState({ open: false });
  const [picture, setPicture] = useState(null);
  const [conductors, setConductors] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [tabNumber, setTabNumber] = useState("2");
  const [actions, setActions] = useState([]);
  const [openLeftRegister, setOpenLeftRegister] = useState(false);
  const [newAction, setNewAction] = useState({
    "not_accept_check": false,
  });
  const [leftRegister, setLeftRegister] = useState({
    "not_accept_check": false,
  });
  const [addConductor, setAddConductor] = useState(false);
  const [newConductor, setNewConductor] = useState({ is_authorized: true });

  const handleClickMovements = () => navigate('/movements');
  const onAddConductor = () => setAddConductor(true);
  const onCloseAddConductor = () => {
    setAddConductor(false);
    setNewConductor({ is_authorized: true });
  }
  const handleLogout = () => navigate('/');

  function handleClickOpenLeftRegister(id) {
    setOpenLeftRegister(true);
    setLeftRegister({...leftRegister, "action_id": id });
  }

  function handleCancelLeftRegister() {
    setOpenLeftRegister(false);
    setPicture(null);
    setLeftRegister({
      "not_accept_check": false,
    });
  }

  function handleCheckboxLeftRegister({ target: { checked } }) {
    setLeftRegister({ ...leftRegister, "not_accept_check": checked });
  }

  function handleChangeConductorLeftRegister(_, value) {
    if (value) {
      const { id } = value;
      setLeftRegister({ ...leftRegister, "collaborator_id": id });
    }
  }

  function handleChangeAddConductor(ev) {
    const { value } = ev.target;
    setNewConductor({ ...newConductor, name: value });
  }

  async function onAddNewConductor() {
    try {
      const new_conductor = await createConductor(newConductor);
      setFeedback({
        open: true,
        severity: 'success',
        message: 'Condutor / Colaborador cadastrado com sucesso!'
      });
      setAddConductor(false);
      onCloseAddConductor();
      setConductors([ ...conductors, new_conductor ]);
    } catch(e) {

    }
  }

  async function handleSubmitLeftRegister() {
    try {
      if ((!leftRegister?.photo && !leftRegister?.not_accept_check) || !leftRegister?.collaborator_id) {
        setFeedback({
          open: true,
          severity: 'error',
          message: 'Verfique se a foto ou a caixa de checagem foi inseriado/mercado corretamente'
        });
        return
      }
      await createActionOut(leftRegister);
      setOpenLeftRegister(false);
      setLeftRegister({
        "not_accept_check": false,
      });
      setPicture(null);
      const acts = await loadActionsWithoutOut();
      if (acts) {
        setActions(acts);
      } else {
        setActions([]);
      }
      setFeedback({
        open: true,
        severity: "success",
        message: "Registro adicionado com sucesso!"
      });
    } catch (err) {
      setFeedback({
        open: true,
        severity: "error",
        message: "Falha ao concluir a operação. Tente novamente mais tarde ou entre em contato com o Administrador."
      });
    }
  }

  async function handleSave() {
    const new_action = newAction;
    newAction.account_id = account.id;
    newAction.has_action_out = false;
    newAction.location_id = account.location_id;
    try {
      await createAction(new_action);
      handleChangeTab();
      setPicture(null);
      setNewAction({
        "not_accept_check": false,
      });
      const acts = await loadActionsWithoutOut();
      setActions(acts);
      setFeedback({
        open: true,
        severity: 'success',
        message: 'Registro adicionado com sucesso!'
      });
    } catch(e) {
      switch (e.code) {
        case 400:
          setFeedback({
            open: true,
            severity: "error",
            message: e.message.charAt(0).toUpperCase() + e.message.slice(1)
          });
          window.scrollTo(0, 0);
          return;
        default:
          setFeedback({
            open: true,
            severity: "error",
            message: `Falha ao concluir a operação. Tente novamente mais tarde ou entre em contato com o Administrador.`
          });
          window.scrollTo(0, 0);
        return;
      }
    }
  }

  const handleCancel = () => {
    setPicture(null);
    window.scrollTo(0, 0);
    setNewAction({});
  }

  function handleChangeTab() {
    if (tabNumber === "1") {
      setTabNumber("2");
    } else {
      setTabNumber("1");
    }
  }

  const onCloseFeedback = () => setFeedback({ open: false });

  const resizeFile = (file) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      500,
      500,
      "JPEG",
      90,
      0,
      (uri) => {
        resolve(uri);
      },
      "base64",
    );
  });

  async function handleImage(event) {
    if (event.target.files[0].type === "image/png" || event.target.files[0].type === "image/jpg" || event.target.files[0].type === "image/jpeg") {
      setPicture(URL.createObjectURL(event.target.files[0]));
      if (event.target.files[0]) {
        try {
          const photo = await resizeFile(event.target.files[0]);
          setNewAction({ ...newAction, photo, });
        } catch (e) {
          // ...
        }
      }
    } else {
      const image_format = event.target.files[0].type;
      setFeedback({
        open: true,
        severity: 'info',
        message: `Tipo de arquivo (${image_format}) inválido. Tire uma foto ou envie uma imagem.`
      });
    }
  }

  async function handleImageLeftRegister(event) {
    if (event.target.files[0].type === "image/png" || event.target.files[0].type === "image/jpg" || event.target.files[0].type === "image/jpeg") {
      setPicture(URL.createObjectURL(event.target.files[0]));
      if (event.target.files[0]) {
        try {
          const photo = await resizeFile(event.target.files[0]);
          setLeftRegister({ ...leftRegister, photo, });
        } catch (e) {
          // ...
        }
      }
    } else {
      const image_format = event.target.files[0].type;
      setFeedback({
        open: true,
        severity: 'info',
        message: `Tipo de arquivo (${image_format}) inválido. Tire uma foto ou envie uma imagem.`
      });
    }
  }

  function onChangeConductor(_, value) {
    if (value) {
      const { id } = value;
      setNewAction({ ...newAction, "collaborator_id": id });
    }
  }

  function onChangeVehicle(_, value) {
    if (value) {
      const { id } = value;
      setNewAction({ ...newAction, "vehicle_id": id });
    }
  }

  function handleChangeInput(e) {
    const {name, value} = e.target;
    setNewAction({ ...newAction, [name]: parseInt(value, 10) });
  }

  function handleCheckbox({ target: { checked } }) {
    setNewAction({ ...newAction, "not_accept_check": checked });
  }

  useEffect(() => {
    async function loadAllData() {
      try {
        const [c, v, a] = await Promise.all([loadConductors(), loadVehicles(), loadActionsWithoutOut()]);
        setConductors(c);
        setVehicles(v);
        if (a) {
          setActions(a);
        }
        if (params?.path_sequence && params?.path_sequence === 'vehicle' && params?.vehicle_id) {
          setTabNumber("2");
          setNewAction({ ...newAction, "vehicle_id": params.vehicle_id });
        }
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

  const columns = [
    {
      name: 'vehicle',
      label: 'Veículo',
      options: {
        filter: true,
        customBodyRender: (param) => param ? param.name : ""
      }
    },
    {
      name: 'vehicle',
      label: 'Placa',
      options: {
        filter: true,
        customBodyRender: (param) => param ? param.license_plate : ""
      }
    },
    {
      name: 'collaborator',
      label: 'Condutor',
      options: {
        filter: true,
        customBodyRender: (param) => param ? param.name : ""
      }
    },
    {
      name: 'created_at',
      label: 'Entrada',
      options: {
        filter: true,
        customBodyRender: (param) => param ? moment(param).format('DD/MM/Y, HH:mm') : ""
      }
    },
    {
      name: "id",
      label: "Ação",
      options: {
        customBodyRender: (param) => (
          <Button variant="contained" size='small' color="info" disableElevation onClick={() => handleClickOpenLeftRegister(param)}>
            <RestoreIcon />
          </Button>
        )
      }
    }
  ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Feedback open={feedback.open} severity={feedback.severity} message={feedback.message} onClose={onCloseFeedback}/>
      <AppBar position="static" elevation={0}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Vehicle CTRL
          </Typography>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleLogout}
          >
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box component="main" sx={{ p: 3 }}>
        { account?.account_type_id === 1 ? (
          <Box sx={classes.main}>
            <Button variant='contained' component='label' color='secondary' disableElevation onClick={handleClickMovements}>
              <TransferWithinAStationIcon /> &nbsp; Movimentações
            </Button>
          </Box>
        ) : (
          <Box sx={classes.main2}>
            <Button variant='contained' component='label' color='info' disableElevation onClick={onAddConductor}>
              <PeopleAlt /> &nbsp; Condutor/Motorista
            </Button>
          </Box>
        ) }
        <Tabs tabValue={tabNumber} onChangeTab={handleChangeTab}>
          <TabPanel value="1">
            { loading ? <Spinner /> : <Datatable title="Registros de Entrada" data={actions} columns={columns}/> }
            
            {/* Adicionar registro de saída */}
            <FormDialog open={openLeftRegister} title="Registro de Saída" onCancelClose={handleCancelLeftRegister} onSubmit={handleSubmitLeftRegister}>
              <Autocomplete label="Condutor/Motorista" data={conductors} fullWidth onChange={handleChangeConductorLeftRegister} />
              <br />
              <FormControlLabel
                control={<Checkbox defaultChecked={leftRegister.not_accept_check}
                onClick={handleCheckboxLeftRegister}/>}
                label="Condutor não permitiu a vistoria"
                sx={{ mb: 2 }}
              />
              <br />
              {!picture && !leftRegister.not_accept_check &&
                <div>
                  <Button variant="contained" component="label" size='large' disableElevation fullWidth>
                  <AddAPhotoIcon /> &nbsp; Foto do Porta-Malas
                    <input type="file" hidden onChange={handleImageLeftRegister}/>
                  </Button>
                  <br />
                </div>
              }
              { picture && !leftRegister.not_accept_check && <img src={picture} alt="foto" width='100%' height='50%' /> }
            </FormDialog>
          </TabPanel>

          {/* Adicionar registro de entrada */}
          <TabPanel value="2">
            <Typography variant='h5' style={{ display: 'flex', justifyContent: 'center'}}>
              Registro de Movimentação
            </Typography>
            <br />
            <Autocomplete label="Condutor/Motorista" data={conductors} fullWidth onChange={onChangeConductor} />
            <br />
            <Autocomplete label="Veículo" getOptionLabel={(option) => `${option.license_plate} - ${option.name}`} data={vehicles} fullWidth onChange={onChangeVehicle} defaultValue={vehicles[vehicles.findIndex(vehicle => vehicle.id === params?.vehicle_id)] || null}/>
            <br />
            <TextField label="Quilometragem" type='number' name='milage' variant="outlined" fullWidth onChange={handleChangeInput} />
            <br />
            <br />
            <FormControlLabel control={<Checkbox defaultChecked={newAction.not_accept_check} onClick={handleCheckbox}/>} label="Condutor não permitiu a vistoria"/>
            <br />
            <br />
            {!picture && !newAction.not_accept_check &&
              <div>
                <Button variant="contained" component="label" size='large' disableElevation fullWidth>
                <AddAPhotoIcon /> &nbsp; Foto do Porta-Malas
                  <input type="file" hidden onChange={handleImage}/>
                </Button>
                <br />
              </div>
            }
            { picture && !newAction.not_accept_check && <img src={picture} alt="foto" width='100%' height='50%' /> }
            { !newAction.not_accept_check && (<><br /><br /></>) }

            <Button variant="contained" size='large' color='info' disableElevation fullWidth onClick={handleSave}>
              Registrar
            </Button>
            <br />
            <br />
            <Button variant="contained" size='large' color='error' disableElevation fullWidth onClick={handleCancel}>
              Cancelar / Limpar
            </Button>
          </TabPanel>
        </Tabs>
        <Dialog
          title="Adicionar Condutor / Motorista"
          open={addConductor}
          onCancelClose={onCloseAddConductor}
          onSubmit={onAddNewConductor}
        >
          <form autoComplete="off">
            <TextField
              id="outlined-basic"
              autoFocus
              name='name'
              label="Nome"
              variant="outlined"
              fullWidth
              onChange={handleChangeAddConductor}
            />
          </form>
        </Dialog>
      </Box>
    </Box>
  );
}

export default AgentPage;