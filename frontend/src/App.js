import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Vendas from "./pages/Vendas";
import Clientes from "./pages/Clientes";
import Vendedores from "./pages/Vendedores";
import Concessionarias from "./pages/Concessionarias";
import Carros from "./pages/Carros";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/vendas" element={<Vendas />} />
        <Route path="/clientes" element={<Clientes />} />
        <Route path="/vendedores" element={<Vendedores />} />
        <Route path="/concessionarias" element={<Concessionarias />} />
        <Route path="/carros" element={<Carros />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
