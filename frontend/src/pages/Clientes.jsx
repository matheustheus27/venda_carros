import { useEffect, useState } from "react";
import axios from "../services/api";
import GenericTable from "../components/GenericTable";

export default function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get("/clientes")
      .then((res) => {
        setClientes(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Erro ao carregar os dados de clientes.");
        setLoading(false);
      });
  }, []);

  const handleEdit = (cli) => {
    console.log("Editar carro:", cli);
  };

  const handleDelete = (cli) => {
    if (window.confirm(`Tem certeza que deseja excluir o cliente ${cli.cpf}?`)) {
      axios.delete(`/clientes/${cli.cpf}`)
      .then(() => {
        setClientes(clientes.filter(c => c.cpf !== cli.cpf));
      })
      .catch(err => console.error("Erro ao excluir cliente:", err));
    }
  };

  const carHeaders = [
    "CPF", "Nome", "Telefone", "Email", "Endereço"
  ];

  const renderCarRow = (c) => (
    <>
      <td className="py-2 px-4 border-b border-gray-200">{c.cpf}</td>
      <td className="py-2 px-4 border-b border-gray-200">{c.nome}</td>
      <td className="py-2 px-4 border-b border-gray-200">{c.telefone}</td>
      <td className="py-2 px-4 border-b border-gray-200">{c.email}</td>
      <td className="py-2 px-4 border-b border-gray-200">{c.endereco}</td>
    </>
  );

  const carActions = (c) => (
    <>
      <button
        onClick={() => handleEdit(c)}
        className="text-gray-600 hover:text-blue-500 transition-colors duration-200 text-lg px-2"
        title="Editar"
      >
        ✏️
      </button>
      <button
        onClick={() => handleDelete(c)}
        className="text-gray-600 hover:text-red-500 transition-colors duration-200 text-lg px-2"
        title="Excluir"
      >
        🗑️
      </button>
    </>
  );

  if (loading) {
    return <p className="text-center p-4">Carregando clientes...</p>;
  }

  if (error) {
    return <p className="text-center p-4 text-red-600">{error}</p>;
  }

  return (
    <div className="p-4"> {}
      <h2 className="text-2xl font-bold mb-4">Lista de Clientes</h2>
      <GenericTable
        headers={carHeaders}
        data={clientes}
        renderRow={renderCarRow}
        actions={carActions}
      />
    </div>
  );
}