import { useState } from 'react';
import { Grid, Container, Stack, TextField, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import Feedback from '../../components/Feedback';

const RecoveryPassword = () => {
  const [feedback, setFeedback] = useState({ open: false });
  const [email, setEmail] = useState('');

  const onCloseFeedback = () => setFeedback({ open: false });

  const handleInput = ({ target: { value }}) => {
    setEmail(value);
  };

  const handleSubmit = () => {
    if (email) {
      setFeedback({ open: true, severity: 'success', message: 'Password reset successfully! Check your email inbox.' });
      setEmail('');
    } else {
      setFeedback({ open: true, severity: 'error', message: 'Woops, error. Check if the field "E-mail" were filled in correctly.' });
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
              <TextField
                id="email"
                name="email"
                type="text"
                label="E-mail"
                fullWidth
                autoFocus
                onChange={handleInput}
                InputLabelProps={{ shrink: true }}
              />
              <br />
              <Button fullWidth size="large" variant="contained" disableElevation onClick={handleSubmit}>
                Resetar
              </Button>
              <br />
              <Link to="/" style={{ color: 'black' }} >
                Voltar para o Login
              </Link>
            </Stack>
          </Container>
        </Grid>
      </Grid>
    </div>
  );
}

export default RecoveryPassword;
