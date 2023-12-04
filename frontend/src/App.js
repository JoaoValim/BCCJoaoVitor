import { BrowserRouter, Routes, Route } from "react-router-dom";
import CadastroUsuario from "./Telas/CadastroUsuario";
import BatePapoTela from "./Telas/BatePapoTela";
import Home from "./Telas/Home";
import store from "./redux/store";
import Mensagem from "./Telas/Mensagem";
import { Provider } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
function App() {
  return (
    <div className="App">
      <Provider store={store}>
      <BrowserRouter>
        <Routes>
          {
          }
          
          <Route path="/mensagem" element={<Mensagem />} />
          <Route path="/batepapogeral" element={<BatePapoTela />} />
          <Route path="/usuario" element={<CadastroUsuario />} />
          <Route path="/BCCJoaoVitor/" element={<Home />} />
          {
          }
        </Routes>
      </BrowserRouter>
      </Provider>
     <ToastContainer/>
    </div>
  );
}

export default App;
