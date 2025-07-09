import { useEffect, useState } from "react";
import axios from "../services/api";

export default function Concessionarias() {
  const [concessionarias, setConcessionarias] = useState([]);

  useEffect(() => {
    axios.get("/concessionarias").then((res) => {
      setConcessionarias(res.data.data);
    });
  }, []);

  return (
    <div className="p-4">
      <table className="w-full table-auto border-collapse bg-gray-100 text-sm">
        <thead className="bg-indigo-200 text-left">
          <tr>
            <th>CNPJ</th>
            <th>Nome</th>
            <th>Telefone</th>
            <th>Endereço</th>
          </tr>
        </thead>
        <tbody>
          {concessionarias.map((c, i) => (
            <tr key={i} className="hover:bg-indigo-50">
              <td>{c.cnpj}</td>
              <td>{c.nome}</td>
              <td>{c.telefone}</td>
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
