import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { getToken, removeToken } from '../../helpers/token.js';

export default function useAccount() {
  const [account, setAccount] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const token = getToken();
    if (token) {
      const data = jwtDecode(token);
      setAccount(data.account);
    } else {
      removeToken();
      navigate('/');
    }
  }, [navigate]);

  return account;
}