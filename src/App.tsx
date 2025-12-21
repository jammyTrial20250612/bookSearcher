import { setupMock } from "./mocks/api";
import LoginScreen from "./components/LoginScreen";

setupMock();

function App() {
  return (
    <>
        <LoginScreen />
    </>
  );
}

export default App;
