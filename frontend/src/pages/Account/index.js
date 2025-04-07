import React, { useState, useEffect } from 'react';
import { Button, TextField } from '@mui/material';
import { Cached as ResetIcon, Edit as EditIcon, Lock as LockIcon, LockOpen as UnlockIcon } from '@mui/icons-material';
import Menu from '../../components/Menu';
import Feedback from '../../components/Feedback';
import Datatable from '../../components/Datatable';
import Spinner from '../../components/Spinner';
import FormDialog from '../../components/Dialog';
import Autocomplete from '../../components/Autocomplete';
import { loadAccountTypes } from '../../services/AccountTypes';
import { loadLocations } from '../../services/Location';
import { createAccount, loadAccounts, updateAccount } from '../../services/Accounts';
import Chip from '../../components/Chip';

const classes = {
  register: {
    display: 'flex',
    justifyContent: 'flex-end',
    paddingBottom: '15px'
  }
};

const AccountPage = () => {
  const [loading, setLoading] = useState(true);
  const [accounts, setAccounts] = useState([]);
  const [feedback, setFeedback] = useState({ open: false });
  const [showCreate, setShowCreate] = useState(false);
  const [accountTypes, setAccountTypes] = useState([]);
  const [newAccount, setNewAccount] = useState({});
  const [locations, setLocations] = useState([]);
  const [accountToEdit, setAccountToEdit] = useState({});
  const [showEdit, setShowEdit] = useState(false);
  const [lockRegister, setLockRegister] = useState(true);
  const [sync, setSync] = useState(false);

  function handleCloseFeedback() {
    setFeedback({ open: false });
  }

  function handleOpenCreatePage() {
    setShowCreate(true);
  }

  function handleCancelClose() {
    setShowCreate(false);
    setShowEdit(false);
    setNewAccount({});
  }

  function handleChangeInput({ target: { name, value }}) {
    setNewAccount({ ...newAccount, [name]: value });
  }

  function handleChangeAutocompleteAccountType(_, { id }) {
    setNewAccount({ ...newAccount, "account_type_id": id });
  }

  function handleChangeAutocompleteLocation(_, { id }) {
    setNewAccount({ ...newAccount, "location_id": id });
  }

  function handleChangeInputEdit({ target: { name, value }}) {
    setAccountToEdit({ ...accountToEdit, [name]: value });
  }

  function handleChangeAutocompleteAccountTypeEdit(_, { id }) {
    setAccountToEdit({ ...accountToEdit, "account_type_id": id });
  }

  function handleChangeAutocompleteLocationEdit(_, { id }) {
    setAccountToEdit({ ...accountToEdit, "location_id": id });
  }

  async function handleUpdate() {
    try {
      await updateAccount(accountToEdit);
      const accs = await loadAccounts();
      setAccounts(accs);
      setAccountToEdit({});
      setShowEdit(false);
      setFeedback({
        open: true,
        severity: "success",
        message: "Informações da conta atualizada com sucesso!"
      });
    } catch (e) {
      setFeedback({
        open: true,
        severity: 'error',
        message: 'Falha ao carregar os dados. Tente novamente mais tarde ou entre em contato com o Administrador.'
      });
    }
  }

  async function handleSubmit() {
    const { password, password_confirmation } = newAccount;
    if (password === password_confirmation) {
      try {
        await createAccount(newAccount);
        setShowCreate(false);
        setSync(!sync);
        setFeedback({
          open: true,
          severity: 'success',
          message: 'Conta cadastrada com sucesso!'
        });
        setNewAccount({});
      } catch(e) {
        setFeedback({
          open: true,
          severity: 'error',
          message: 'Falha ao carregar os dados. Tente novamente mais tarde ou entre em contato com o Administrador.'
        });
      }
    } else {
      setFeedback({
        open: true,
        severity: 'info',
        message: 'Verifique se a senha e a confirmação da senha são iguais.'
      });
    }
  }

  async function handleEdit(id) {
    setAccountToEdit(accounts[accounts.findIndex(acc => acc.id === id)]);
    setShowEdit(true);
  }

  async function handleReset(id) {
    const accept = window.confirm("Deseja continuar com o processo de reset de conta?");
    if (accept) {
      try {
        const acc = accounts[accounts.findIndex(a => a.id === id)];
        acc.account_status_id = 2;
        await updateAccount(acc);
        const accs = await loadAccounts();
        setAccounts(accs);
        setFeedback({
          open: true,
          severity: "success",
          message: "Conta resetada com sucesso!"
        });
      } catch(e) {
        setFeedback({
          open: true,
          severity: "error",
          message: "Falha na operação. Tente novamente mais tarde ou entre em contato com o Administrador."
        });
      }
    }
  }

  async function handleClickLockOrUnlock(id) {
    const accept = window.confirm("Deseja continuar com o processo de bloqueio/desbloqueio de conta?");
    if (accept) {
      const account = accounts[accounts.findIndex(account => account.id === id)];
      account.account_status_id === 3 && account.account_status_id !== 2 ? account.account_status_id = 1 : account.account_status_id = 3
      try {
        await updateAccount(account);
        const acc = await loadAccounts();
        setAccounts(acc);
        setFeedback({
          open: true,
          severity: "success",
          message: "Status da Conta atualizado com sucesso!"
        });
      } catch(e) {
        setFeedback({
          open: true,
          severity: 'error',
          message: 'Falha ao carregar os dados. Tente novamente mais tarde ou entre em contato com o Administrador.'
        });
      }
    }
  }

  const columns = [
    {
      name: 'name',
      label: 'Nome',
      options: {
        filter: true,
      },
    },
    {
      name: 'username',
      label: 'Usuário',
      options: {
        filter: true,
      },
    },
    {
      name: 'account_type_id',
      label: 'Tipo de Conta',
      options: {
        filter: true,
        customBodyRender: (param) => {
          switch(param) {
            case 1:
              return "Administrador";
            default:
              return "Colaborador";
          }
        }
      },
    },
    {
      name: 'account_status_id',
      label: 'Status da Conta',
      options: {
        filter: true,
        customBodyRender: (param) => {
          switch(param) {
            case 1:
              return <Chip label="Ativa" color="success" />;
            case 2:
              return <Chip label="Resetado" color="info" />;
            default:
              return <Chip label="Bloqueado" color="error" />;
          }
        }
      },
    },
    {
      name: 'id',
      label: 'Ações',
      options: {
        customBodyRender: (param) => {
          const acc = accounts[accounts.findIndex(account => account.id === param)];
          return (
            <div>
              {acc.account_status_id < 2 ? (
                <>
                  <Button variant="contained" size="small" color="info" disableElevation onClick={() => handleReset(param)}>
                    <ResetIcon />
                  </Button>
                  &nbsp;&nbsp;
                </>
              ) : null }
              <Button variant="contained" size="small" color="warning" disableElevation onClick={() => handleEdit(param)}>
                <EditIcon />
              </Button>
              &nbsp;&nbsp;
              <Button variant="contained" size="small" color={acc.account_status_id === 1 && acc.account_status_id !== 2 ? "error": "success"} disableElevation onClick={() => handleClickLockOrUnlock(param)}>
                {acc.account_status_id === 1 && acc.account_status_id !== 2 ? <LockIcon /> : <UnlockIcon />}
              </Button>
            </div>
          )
        }
      }
    }
  ];

  useEffect(() => {
    async function loadAllData() {
      try {
        const [account_types, locations, accounts] = await Promise.all([loadAccountTypes(), loadLocations(), loadAccounts()]);
        setAccountTypes(account_types);
        setLocations(locations);
        setAccounts(accounts);
        setLoading(false);
        if (!account_types.length) {
          setFeedback({
            open: true,
            severity: 'info',
            message: 'Não foi possível carregar os dados prévios, verifique se já existe o tipo de conta cadastrado.'
          });
        } else if (!locations.length) {
          setFeedback({
            open: true,
            severity: 'info',
            message: 'Não foi possível carregar os dados prévios para um novo cadastro, verifique se já existe algum local cadastrado na aba "Locais"'
          });
        } else {
          setLockRegister(false);
        }
      } catch(e) {
        setFeedback({
          open: true,
          severity: 'error',
          message: 'Falha ao carregar os dados. Tente novamente mais tarde ou entre em contato com o Administrador.'
        });
      }
    }
    loadAllData();
  }, [sync]);

  return (
    <Menu title="Contas & Usuários">
      <Feedback open={feedback.open} severity={feedback.severity} message={feedback.message} onClose={handleCloseFeedback}/>
      <div style={classes.register}>
        <Button variant="contained" color="info" disableElevation onClick={handleOpenCreatePage} disabled={lockRegister}>
          Cadastrar
        </Button>
      </div>
      { loading ? <Spinner /> : <Datatable title="Contas & Usuários" data={accounts} columns={columns} /> }
      {/* create page */}
      <FormDialog title="Cadastro de Contas & Usuários" open={showCreate} onCancelClose={handleCancelClose} onSubmit={handleSubmit}>
        <form autoComplete="off">
          <TextField id="name" autoFocus name="name" label="Nome" variant="outlined" fullWidth onChange={handleChangeInput}/>
          <br />
          <br />
          <TextField id="username" name="username" label="Usuário" variant="outlined" fullWidth onChange={handleChangeInput}/>
          <br />
          <br />
          <TextField id="password" name="password" type="password" label="Senha" variant="outlined" fullWidth onChange={handleChangeInput}/>
          <br />
          <br />
          <TextField id="password_confirmation" name="password_confirmation" type="password" label="Confirmação da Senha" variant="outlined" fullWidth onChange={handleChangeInput}/>
          <br />
          <br />
          <Autocomplete label="Tipo de Conta" data={accountTypes} onChange={handleChangeAutocompleteAccountType} />
          <br />
          <Autocomplete label="Local" data={locations} onChange={handleChangeAutocompleteLocation}/>
        </form>
      </FormDialog>
      {/* edit page */ }
      <FormDialog title="Editar Contas & Usuários" open={showEdit} isEditing={true} onCancelClose={handleCancelClose} onSave={handleUpdate}>
        <form autoComplete="off">
          <TextField id="name" autoFocus name="name" label="Nome" defaultValue={accountToEdit.name} variant="outlined" fullWidth onChange={handleChangeInputEdit}/>
          <br />
          <br />
          <TextField id="username" name="username" label="Usuário" defaultValue={accountToEdit.username} variant="outlined" fullWidth onChange={handleChangeInputEdit}/>
          <br />
          <br />
          <Autocomplete label="Tipo de Conta" data={accountTypes} defaultValue={accountTypes[accountTypes.findIndex(at => at.id === accountToEdit.account_type_id)]} onChange={handleChangeAutocompleteAccountTypeEdit} />
          <br />
          <Autocomplete label="Local" data={locations} defaultValue={locations[locations.findIndex(loc => loc.id === accountToEdit.location_id)]} onChange={handleChangeAutocompleteLocationEdit}/>
          </form>
      </FormDialog>
    </Menu>
  );
}

export default AccountPage;