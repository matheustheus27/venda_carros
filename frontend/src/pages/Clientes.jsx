import { useEffect, useState } from "react";
import axios from "../services/api";

export default function Clientes() {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    axios.get("/clientes").then((res) => {
      setClientes(res.data.data);
    });
  }, []);

  return (
    <div className="p-4">
      <table className="w-full table-auto border-collapse bg-gray-100 text-sm">
        <thead className="bg-indigo-200 text-left">
          <tr>
            <th>CPF</th>
            <th>Nome</th>
            <th>Telefone</th>
            <th>Email</th>
            <th>Endereço</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((c, i) => (
            <tr key={i} className="hover:bg-indigo-50">
              <td>{c.cpf}</td>
              <td>{c.nome}</td>
              <td>{c.telefone}</td>
              <td>{c.email}</td>
              <td>{c.endereco}</td>
              <td>
                <button>✏️</button>
                <button>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
