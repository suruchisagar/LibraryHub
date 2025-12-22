import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    // 🔐 Clear any tokens or session data here
    localStorage.removeItem('token'); // if using token
    // sessionStorage.clear(); // optional

    // 👋 Redirect to sign-in page
    navigate('/signin');
  }, [navigate]);

  return null; // nothing to render
}

export default Logout;
