import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ChatPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('user');
    if (!token) {
      navigate('/login');
    }
  }, []);

  return (
    <div className="Form">
      <p>ChatPage</p>
    </div>
  );
};

export default ChatPage;
