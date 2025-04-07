import React, { useState } from 'react';
import { Grid, Container, Stack, TextField, Button, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Feedback from '../../components/Feedback';
import Request from '../../interceptor/Request';

const request = new Request();

const Login = () => {
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState({ open: false });
  const [credentials, setCredentials] = useState({});

  const onCloseFeedback = () => setFeedback({ open: false });

  const handleInput = ({ target: { name, value }}) => {
    setCredentials({ ...credentials, [name]: value });
  };
  
  async function handleSubmit() {
    const { username, password } = credentials;
    if (username && password) {
      try {
        const authentication = await request.exec('POST', '/auth', credentials);
        setCredentials({});
        const { token } = authentication;
        if (token) {
          localStorage.setItem('token', token);
        }
        const { account_status_id } = authentication.user;
        switch(account_status_id) {
          case 1:
            break;
          case 2:
            navigate(`/reset_password/${authentication.user.id}`);
            return;
          default:
            setFeedback({
              open: true,
              severity: "error",
              message: "Você não possui permissão para acessar o sistema. Entre em contato com o Administrador.",
            });
            break;
        }
        const { account_type_id } = authentication.user;
        if (account_type_id === 1) {
          navigate('/movements');
        } else {
          navigate('/agent');
        }
        return
      } catch(e) {
        setFeedback({
          open: true,
          severity: "error",
          message: "Falha na conexão com o servidor. Tente novamente mais tarde ou entre em contato com o Administrador."
        });
        return
      }
    } else {
      setFeedback({ open: true, severity: 'error', message: 'Woops, error. Check if the fields were filled in correctly.' });
    }
  };

  const handleKeypress = event => {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  }

  return (
    <div>
      <Feedback open={feedback.open || false} severity={feedback.severity || ''} message={feedback.message || ''} onClose={onCloseFeedback}/>
      <Grid container>
        <Grid className="presentation" sx={{ display: { xs: 'none', lg: 'flex' } }} md={8} />
        <Grid item xs={12} md={12} lg={4} >
          <Container fixed>
            <Stack className="fullHeight" direction="column" justifyContent="center" alignItems="center" spacing={2}>
              <Alert icon={false} severity="info" sx={{ textAlign: 'center' }}>
                <p>Use following credentials to access in order.</p>
                <p>
                  <span><b>username:</b> admin</span> &nbsp;
                  <span><b>password:</b> admin</span> <br />
                  <span><b>username:</b> user</span> &nbsp;
                  <span><b>password:</b> user</span>
                </p>
              </Alert>
              <br />
              <img src="../../images/logo.png" alt="logo" width={320}/>
              <br />
              <TextField
                id="username"
                name="username"
                type="text"
                label="Username"
                autoFocus
                fullWidth
                onChange={handleInput}
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                id="password"
                name="password"
                type="password"
                label="Password"
                fullWidth
                onChange={handleInput}
                InputLabelProps={{ shrink: true }}
                onKeyPress={(e) => handleKeypress(e)}
              />
              {
                /*
                <Link to="/recovery_password" style={{color: 'black'}} >
                  Esqueceu sua senha?
                </Link>
                */
              }
              <br />
              <Button fullWidth size="large" variant="contained" disableElevation onClick={handleSubmit}>
                Login
              </Button>
              {
                /*
                <div>
                Don't have an account yet? &nbsp;
                <Link to="/create_account" style={{color: 'black'}} >
                  Create Account
                </Link>
                </div>
                */
              }
            </Stack>
          </Container>
        </Grid>
      </Grid>
    </div>
  );
}

export default Login;
