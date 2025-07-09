import { NavLink } from "react-router-dom";
import '../css/Header.css';

export default function Header() {
  return (
    <>
      <header className="Header-title">
        <h1>Gerenciamento de Venda de Carros</h1>
      </header>

      <nav className="Nav-bar">
        {}
        <NavLink
          to="/vendas"
          className={({ isActive }) =>
            isActive ? "nav-link-item active-tab" : "nav-link-item"
          }
        >
          🚗 Vendas
        </NavLink>
        <NavLink
          to="/concessionarias"
          className={({ isActive }) =>
            isActive ? "nav-link-item active-tab" : "nav-link-item"
          }
        >
          🏢 Concessionárias
        </NavLink>
        <NavLink
          to="/clientes"
          className={({ isActive }) =>
            isActive ? "nav-link-item active-tab" : "nav-link-item"
          }
        >
          👤 Clientes
        </NavLink>
        <NavLink
          to="/vendedores"
          className={({ isActive }) =>
            isActive ? "nav-link-item active-tab" : "nav-link-item"
          }
        >
          🧍 Vendedores
        </NavLink>
        <NavLink
          to="/carros"
          className={({ isActive }) =>
            isActive ? "nav-link-item active-tab" : "nav-link-item"
          }
        >
          🚘 Carros
        </NavLink>
      </nav>
    </>
  );
}