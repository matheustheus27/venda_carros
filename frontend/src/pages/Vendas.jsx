import { useEffect, useState } from "react";
import axios from "../services/api";
import GenericTable from "../components/GenericTable";

export default function Vendas() {
  const [vendas, setVendas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get("/vendas")
      .then((res) => {
        setVendas(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erro ao carregar vendas:", err);
        setError("Erro ao carregar os dados de Vendas.");
        setLoading(false);
      });
  }, []);

  const handleEdit = (ven) => {
    console.log("Editar carro:", ven);
  };

  const handleDelete = (ven) => {
    if (window.confirm(`Tem certeza que deseja excluir a venda ${ven.cpf_vendedor}-${ven.cpf_cliente}-${ven.placa_carro}-${ven.cnpj_concessionaria}-${ven.data}?`)) {
      axios.delete(`/vendas/${ven.cpf_vendedor}/${ven.cpf_cliente}/${ven.placa_carro}/${ven.cnpj_concessionaria}/${ven.data}`)
      .then(() => {
        setVendas(vendas.filter(
          v => !(
            v.cpf_vendedor === ven.cpf_vendedor &&
            v.cpf_cliente === ven.cpf_cliente &&
            v.placa_carro === ven.placa_carro &&
            v.cnpj_concessionaria === ven.cnpj_concessionaria &&
            v.data === ven.data
          )
        ));
      })
      .catch(err => console.error("Erro ao excluir venda:", err));
    }
  };

  const carHeaders = [
    "CPF do Cliente", "CPF do Vendedor", "Placa do Carro", "CNPJ da Concessionária", "Data da Venda",
    "Valor", "Tipo de Pagamento", "Total Pago"
  ];

  const renderCarRow = (v) => (
    <>
      <td className="py-2 px-4 border-b border-gray-200">{v.cpf_cliente}</td>
      <td className="py-2 px-4 border-b border-gray-200">{v.cpf_vendedor}</td>
      <td className="py-2 px-4 border-b border-gray-200">{v.placa_carro}</td>
      <td className="py-2 px-4 border-b border-gray-200">{v.cnpj_concessionaria}</td>
      <td className="py-2 px-4 border-b border-gray-200">{v.data}</td>
      <td className="py-2 px-4 border-b border-gray-200">
        R$ {parseFloat(v.valor).toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
      </td>
      <td className="py-2 px-4 border-b border-gray-200">{v.tipo_pagamento}</td>
      <td className="py-2 px-4 border-b border-gray-200">
        R$ {parseFloat(v.total_pago).toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
      </td>
    </>
  );

  const carActions = (v) => (
    <>
      <button
        onClick={() => handleEdit(v)}
        className="text-gray-600 hover:text-blue-500 transition-colors duration-200 text-lg px-2"
        title="Editar"
      >
        ✏️
      </button>
      <button
        onClick={() => handleDelete(v)}
        className="text-gray-600 hover:text-red-500 transition-colors duration-200 text-lg px-2"
        title="Excluir"
      >
        🗑️
      </button>
    </>
  );

  if (loading) {
    return <p className="text-center p-4">Carregando vendas...</p>;
  }

  if (error) {
    return <p className="text-center p-4 text-red-600">{error}</p>;
  }

  return (
    <div className="p-4"> {}
      <h2 className="text-2xl font-bold mb-4">Lista de Vendas</h2>
      <GenericTable
        headers={carHeaders}
        data={vendas}
        renderRow={renderCarRow}
        actions={carActions}
      />
    </div>
  );
}