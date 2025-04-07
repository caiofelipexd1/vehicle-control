import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import ReactDOM from 'react-dom';
import LoginPage from './pages/Login';
import ResetPasswordPage from './pages/ResetPassword';
import AgentPage from './pages/Agent';
import MovementPage from './pages/Movement';
import VehiclesPage from './pages/Vehicle';
import VehiclesTypesPage from './pages/VehicleTypes';
import ConductorPage from './pages/Conductor';
import LocationPage from './pages/Location';
import AccountPage from './pages/Account';
import { getToken } from './helpers/token';

import theme from './theme';
import './index.css';

const ProtectedRoute = () => {
  const token = getToken()
  if (token) {
    return <Outlet />
  } else {
    return <Navigate to="/" />
  }
}

ReactDOM.render(
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path='/' exact element={<LoginPage />} />
          <Route path='/reset_password/:account_id' exact element={<ResetPasswordPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path='/agent/:path_sequence?/:vehicle_id?' exact element={<AgentPage />} />
            <Route path='/movements' exact element={<MovementPage />} />
            <Route path='/vehicles' exact element={<VehiclesPage />} />
            <Route path='/vehicles/types' exact element={<VehiclesTypesPage />} />
            <Route path='/conductors' exact element={<ConductorPage />} />
            <Route path='/locations' exact element={<LocationPage />} />
            <Route path='/accounts' exact element={<AccountPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>,
  document.getElementById('root')
);
