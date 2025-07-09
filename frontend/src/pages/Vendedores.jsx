import { useEffect, useState } from "react";
import axios from "../services/api";

export default function Vendedores() {
  const [vendedores, setVendedores] = useState([]);

  useEffect(() => {
    axios.get("/vendedores").then((res) => {
      setVendedores(res.data.data);
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
            <th>CNPJ da Concessionaria</th>
          </tr>
        </thead>
        <tbody>
          {vendedores.map((v, i) => (
            <tr key={i} className="hover:bg-indigo-50">
              <td>{v.cpf}</td>
              <td>{v.nome}</td>
              <td>{v.telefone}</td>
              <td>{v.email}</td>
              <td>{v.cnpj_concessionaria}</td>
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
