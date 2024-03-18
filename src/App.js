import './App.scss';
import Header from './components/Header';
import Container from 'react-bootstrap/Container';
import { ToastContainer } from 'react-toastify';
import { useContext } from 'react';
import { UserContext } from './components/contexts/UseContext';
import { useEffect } from 'react';
import AppRoutes from './routes/AppRoutes';

function App() {
  const { loginContext } = useContext(UserContext);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      loginContext(localStorage.getItem("token"), localStorage.getItem("email"));
    }
  }, [loginContext])

  return (
    <>
      <div className="app-container">
        <Header />
        <Container>
          <AppRoutes />
        </Container>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
