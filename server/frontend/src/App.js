import LoginPanel from "./components/Login/Login"
import Dealers from './components/Dealers/Dealers';
import { Routes, Route } from "react-router-dom";
import Dealer from './components/Dealers/Dealer';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPanel />} />
      <Route path="/dealers" element={<Dealers />} />
      <Route path="/dealer/:id" element={<Dealer />} />
    </Routes>
  );
}
export default App;
