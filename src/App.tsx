import { useEffect } from "react";
import { BrowserRouter as Router,Routes,Route, Navigate } from "react-router-dom";
import UserManagementApp from "./components/UserManagementApp";
import { AuthProvider } from "./context/AuthContext";
import axios from "axios";
import { setupMock } from "./mocks/api";
import Home from "./components/Home";
import ProtectedRoute from "./ProtectedRoot";
import { useAuth } from "./context/AuthContext";


setupMock();

function App() {
  useEffect(() => {
    axios.get("/api/users").then((response) => {
      console.log(response.data);
    });
  }, []);

  // const { isAuthenticated } = useAuth();
  // if (!isAuthenticated){
  //   return <Navigate to="login" replace/>;
  // }

  return (
    <>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<ProtectedRoute><Home/></ProtectedRoute>}/>
            <Route path="/login" element={<UserManagementApp/>}/>
          </Routes>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
