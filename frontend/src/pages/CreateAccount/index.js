import { useState } from 'react';
import { Grid, Container, Stack, TextField, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import Feedback from '../../components/Feedback';

const CreateAccount = () => {
  const [feedback, setFeedback] = useState({ open: false });
  const [credentials, setCredentials] = useState({});

  const onCloseFeedback = () => setFeedback({ open: false });

  const handleInput = ({ target: { name, value }}) => {
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async () => {
    const { username, password, password_confirmation, email } = credentials;
    if (username && password && email && (password === password_confirmation)) {
      setFeedback({ open: true, severity: 'success', message: 'Account created successfully!' });
      setCredentials({});
    } else {
      setFeedback({ open: true, severity: 'error', message: 'Woops, error. Check if the fields were filled in correctly.' });
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
              <TextField name="username" type="text" value={credentials.username || ''} fullWidth label="Username" id="username" onChange={handleInput} />
              <TextField name="password" type="password" value={credentials.password || ''} fullWidth label="Password" id="password" onChange={handleInput} />
              <TextField name="password_confirmation" type="password" value={credentials.password_confirmation || ''} fullWidth label="Password Confirmation" id="password" onChange={handleInput} />
              <TextField name="email" type="email" value={credentials.email || ''} fullWidth label="E-mail" id="email" onChange={handleInput} />
              <Button fullWidth size="large" variant="contained" disableElevation onClick={handleSubmit}>
                Create
              </Button>
              <Link to="/" style={{ color: 'black' }} >
                Back to Login
              </Link>
            </Stack>
          </Container>
        </Grid>
      </Grid>
    </div>
  );
}

export default CreateAccount;
