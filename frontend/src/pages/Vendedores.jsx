import { useEffect, useState } from "react";
import axios from "../services/api";
import GenericTable from "../components/GenericTable";

export default function Vendedores() {
  const [vendedores, setVendedores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get("/vendedores")
      .then((res) => {
        setVendedores(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Erro ao carregar os dados de vendedores.");
        setLoading(false);
      });
  }, []);

  const handleEdit = (ven) => {
    console.log("Editar carro:", ven);
  };

  const handleDelete = (ven) => {
    if (window.confirm(`Tem certeza que deseja excluir o vendedor ${ven.cpf}?`)) {
      axios.delete(`/vendedores/${ven.cpf}`)
      .then(() => {
        setVendedores(vendedores.filter(v => v.cpf !== ven.cpf));
      })
      .catch(err => console.error("Erro ao excluir vendedor:", err));
    }
  };

  const carHeaders = [
    "CPF", "Nome", "Telefone", "Email", "CNPJ da Concessionária"
  ];

  const renderCarRow = (v) => (
    <>
      <td className="py-2 px-4 border-b border-gray-200">{v.cpf}</td>
      <td className="py-2 px-4 border-b border-gray-200">{v.nome}</td>
      <td className="py-2 px-4 border-b border-gray-200">{v.telefone}</td>
      <td className="py-2 px-4 border-b border-gray-200">{v.email}</td>
      <td className="py-2 px-4 border-b border-gray-200">{v.cnpj_concessionaria}</td>
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
    return <p className="text-center p-4">Carregando vendedores...</p>;
  }

  if (error) {
    return <p className="text-center p-4 text-red-600">{error}</p>;
  }

  return (
    <div className="p-4"> {}
      <h2 className="text-2xl font-bold mb-4">Lista de Vendedores</h2>
      <GenericTable
        headers={carHeaders}
        data={vendedores}
        renderRow={renderCarRow}
        actions={carActions}
      />
    </div>
  );
}