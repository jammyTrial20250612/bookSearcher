import { useEffect } from "react";
import { Link } from "react-router-dom";
import UserManagementApp from "./components/UserManagementApp";
import AuthProvider from "./context/AuthContext";
import axios from "axios";
import { setupMock } from "./mocks/api";

setupMock();

function App() {
  useEffect(() => {
    axios.get("/api/users").then((response) => {
      console.log(response.data);
    });
  }, []);

  return (
    <>
      {/* <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/search">Search Books</Link></li>
      </ul>     */}
      <AuthProvider>
        <UserManagementApp />
      </AuthProvider>
    </>
  );
}

export default App;
