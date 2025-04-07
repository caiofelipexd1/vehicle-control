import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Grid, Container, Stack, TextField, Button } from '@mui/material';
import Feedback from '../../components/Feedback';
import Request from '../../interceptor/Request';

export default function ResetPasswordPage() {
  const params = useParams();
  const request = new Request();
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState({ open: false });
  const [credentials, setCredentials] = useState({});

  const onCloseFeedback = () => setFeedback({ open: false });

  const handleInput = ({ target: { name, value }}) => {
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async () => {
    const { password, password_confirmation } = credentials;
    if (password && password_confirmation && (password === password_confirmation)) {
      await request.exec('POST', `/reset_password/${params.account_id}`, { 'password': credentials.password });
      setCredentials({});
      setFeedback({ open: true, severity: 'info', message: 'Senha atualizada com sucesso. Você será redirecionado em 5 segundos...' });
      setCredentials({});
      (setTimeout(() => {
        navigate('/');
      }, [5000]))
    } else {
      setFeedback({ open: true, severity: 'error', message: 'Woops, error. Check if the fields were filled in correctly or are equals.' });
    }
  };

  return (
    <div>
      <Feedback open={feedback.open || false} severity={feedback.severity || ''} message={feedback.message || ''} onClose={onCloseFeedback}/>
      <Grid container>
        <Grid className="presentation" sx={{ display: { xs: 'none', lg: 'flex' } }} md={8}>
        </Grid>
        <Grid item xs={12} md={12} lg={4} >
          <Container fixed>
            <Stack className="fullHeight" direction="column" justifyContent="center" alignItems="center" spacing={2}>
              <img src="../../images/logo.png" alt="logo" width={320}/>
              <br />
              <br />
              <TextField
                id="username"
                name="password"
                type="password"
                label="Nova Senha"
                fullWidth
                autoFocus
                onChange={handleInput}
                InputLabelProps={{ shrink: true }}
                value={credentials.password || ''}
              />
              <TextField
                id="password_confirmation"
                name="password_confirmation"
                type="password"
                label="Confirmação da Senha"
                value={credentials.password_confirmation || ''}
                fullWidth
                onChange={handleInput}
                InputLabelProps={{ shrink: true }}
              />
              <br />
              <Button fullWidth size="large" variant="contained" disableElevation onClick={handleSubmit}>
                Salvar
              </Button>
            </Stack>
          </Container>
        </Grid>
      </Grid>
    </div>
  );
}
