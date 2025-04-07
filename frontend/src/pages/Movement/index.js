import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { loadActions } from '../../services/Action';
import { loadConductors } from '../../services/Conductor';
import { Button, Typography } from '@mui/material';
import Menu from '../../components/Menu';
import Spinner from '../../components/Spinner';
import Datatable from '../../components/Datatable';
import Feedback from '../../components/Feedback';

const classes = {
  main: {
    display: 'flex',
    justifyContent: 'flex-end',
    paddingBottom: '15px'
  },
  denied: {
    color: 'red'
  }
}

const MovementPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState({ open: false });
  const [allActions, setAllActions] = useState([]);
  const [conductors, setConductors] = useState({});

  const handleAddButton = () => {
    navigate('/agent');
  }

  const columns = [
    {
      name: 'vehicle',
      label: 'Placa',
      options: {
        filter: true,
        sort: false,
        customBodyRender: (param) => param ? param.license_plate : "-"
      },
    },
    {
      name: 'collaborator',
      label: 'Condutor Entrada',
      options: {
        filter: true,
        sort: false,
        customBodyRender: (param) => param ? param.name : "-"
      },
    },
    {
      name: 'milage',
      label: 'Quilometragem',
      options: {
        filter: true,
        sort: false,
        customBodyRender: (param) => Number(param).toPrecision(5)
      },
    },
    {
      name: 'created_at',
      label: 'Data/Hora da Entrada',
      options: {
        filter: true,
        customBodyRender: (param) => moment(param).format('DD/MM/YYYY - HH:mm')
      },
    },
    {
      name: 'id',
      label: 'Verificação de Entrada',
      options: {
        filter: true,
        sort: false,
        customBodyRender: (param) => {
          const mov = allActions[allActions.findIndex(action => action.id === param)];
          if (mov.not_accept_check) {
            return <Typography variant="button" display="block" sx={classes.denied}>Negado</Typography>;
          } else {
            return <Button
              variant='contained'
              size='small'
              color='info'
              target='_blank'
              download
              href={mov.photo}
              disableElevation
            >
              Imagem
            </Button>
          }
        }
      },
    },
    {
      name: 'id',
      label: 'Condutor Saída',
      options: {
        filter: true,
        sort: false,
        customBodyRender: (param) => {
          const mov = allActions[allActions.findIndex(action => action.id === param)];
          if (mov.action_out) {
            if (mov.action_out.collaborator_id) {
              return conductors[conductors.findIndex(conductor => conductor.id === mov.action_out.collaborator_id)].name
            } else {
              return '-'
            }
          } else {
            return '-'
          }
        }
      },
    },
    {
      name: 'id',
      label: 'Data/Hora da Saída',
      options: {
        filter: true,
        customBodyRender: (param) => {
          const mov = allActions[allActions.findIndex(action => action.id === param)];
          if (mov.action_out) {
            return moment(mov.action_out.created_at).format('DD/MM/YYYY - HH:mm')
          } else {
            return '-';
          }
        }
      },
    },
    {
      name: 'id',
      label: 'Verificação de Saída',
      options: {
        filter: true,
        sort: false,
        customBodyRender: (param) => {
          const mov = allActions[allActions.findIndex(action => action.id === param)];
          if (mov.action_out) {
            if (mov.action_out.not_accept_check) {
              return <Typography variant="button" display="block" sx={classes.denied}>Negado</Typography>;
            } else {
              return <Button
                variant='contained'
                size='small'
                color='info'
                target='_blank'
                download
                href={mov.action_out.photo}
                disableElevation
              >
                Imagem
              </Button>
            }
          } else {
            return '-'
          }
        }
      },
    },
  ];

  useEffect(() => {
    const loadAllActions = async () => {
      try {
        const [actions, conductors] = await Promise.all([loadActions(), loadConductors()]);
        setAllActions(actions);
        setConductors(conductors);
        setLoading(false);
      } catch(e) {
        setFeedback({
          open: true,
          severity: 'error',
          message: 'Falha ao carregar os dados. Tente novamente mais tarde ou entre em contato com o Administrador'
        });
      }
    }
    loadAllActions();
  }, []);

  return (
    <Menu title='Movimentações'>
      <Feedback open={feedback.open} severity={feedback.severity} message={feedback.message} />
      <div style={classes.main}>
        <Button variant="contained" color="primary" disableElevation onClick={handleAddButton}>
          Adicionar Registro
        </Button>
      </div>
      { loading ? <Spinner /> : <Datatable title="Movimentações" columns={columns} data={allActions} /> }
    </Menu>
  );
}

export default MovementPage;