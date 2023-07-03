
import { useSelector } from 'react-redux';
import RoutesPage from './routes/RoutesPage';
import { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import { establishConnection, getSocket } from './socketConnection/socketIo';


function App() {
  let socket = getSocket()

  const user = useSelector(state => state.authReducer.activeUser);
  useEffect(() => {
    establishConnection(user);
    
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [user]);
  return (
    <>
      <Toaster />
      <RoutesPage />
    </>
  );
}

export default App;
