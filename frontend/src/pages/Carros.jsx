import { useEffect, useState } from "react";
import axios from "../services/api";

export default function Carros() {
  const [carros, setcarros] = useState([]);

  useEffect(() => {
    axios.get("/carros").then((res) => {
      setcarros(res.data.data);
    });
  }, []);

  return (
    <div className="p-4">
      <table className="w-full table-auto border-collapse bg-gray-100 text-sm">
        <thead className="bg-indigo-200 text-left">
          <tr>
            <th>Placa</th>
            <th>Marca</th>
            <th>Modelo</th>
            <th>Ano</th>
            <th>Cor</th>
            <th>Quilometragem</th>
            <th>Preço</th>
            <th>Status</th>
            <th>CNPJ da Concessionária</th>
          </tr>
        </thead>
        <tbody>
          {carros.map((c, i) => (
            <tr key={i} className="hover:bg-indigo-50">
              <td>{c.placa}</td>
              <td>{c.marca}</td>
              <td>{c.modelo}</td>
              <td>{c.ano}</td>
              <td>{c.cor}</td>
              <td>{c.quilometragem}</td>
              <td>R$ {parseFloat(c.preco).toLocaleString("pt-BR")}</td>
              <td>{c.status}</td>
              <td>{c.cnpj_concessionaria}</td>
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
