import { useEffect, useState } from "react";
import axios from "../services/api";

export default function Vendas() {
  const [vendas, setVendas] = useState([]);

  useEffect(() => {
    axios.get("/vendas").then((res) => {
      setVendas(res.data.data);
    });
  }, []);

  return (
    <div className="p-4">
      <table className="w-full table-auto border-collapse bg-gray-100 text-sm">
        <thead className="bg-indigo-200 text-left">
          <tr>
            <th>CPF do Cliente</th>
            <th>CPF do Vendedor</th>
            <th>Placa do Carro</th>
            <th>CNPJ Concessionaria</th>
            <th>Data da Venda</th>
            <th>Valor</th>
            <th>Tipo de Pagamento</th>
            <th>Total Pago</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {vendas.map((v, i) => (
            <tr key={i} className="hover:bg-indigo-50">
              <td>{v.cpf_cliente}</td>
              <td>{v.cpf_vendedor}</td>
              <td>{v.placa_carro}</td>
              <td>{v.cnpj_concessionaria}</td>
              <td>{v.data}</td>
              <td>R$ {parseFloat(v.valor).toLocaleString("pt-BR")}</td>
              <td>{v.tipo_pagamento}</td>
              <td>R$ {parseFloat(v.total_pago).toLocaleString("pt-BR")}</td>
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
