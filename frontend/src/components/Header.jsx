import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-indigo-900 text-white p-4">
      <h1 className="text-2xl font-bold mb-2">Gerenciamento de Venda de Carros</h1>
      <nav className="flex gap-4">
        <NavLink to="/vendas" className="hover:underline">🚗 Vendas</NavLink>
        <NavLink to="/concessionarias" className="hover:underline">🏢 Concessionárias</NavLink>
        <NavLink to="/clientes" className="hover:underline">👤 Clientes</NavLink>
        <NavLink to="/vendedores" className="hover:underline">🧍 Vendedores</NavLink>
        <NavLink to="/carros" className="hover:underline">🚘 Carros</NavLink>
      </nav>
    </header>
  );
}
