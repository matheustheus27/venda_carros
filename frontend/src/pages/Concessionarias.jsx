import { useEffect, useState } from "react";
import axios from "../services/api";
import GenericTable from "../components/GenericTable";

export default function Concessionarias() {
  const [concessionarias, setConcessionarias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get("/concessionarias")
      .then((res) => {
        setConcessionarias(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Erro ao carregar os dados de concessionárias.");
        setLoading(false);
      });
  }, []);

  const handleEdit = (con) => {
    console.log("Editar concessionaria:", con);
  };

  const handleDelete = (con) => {
    if (window.confirm(`Tem certeza que deseja excluir a concessionária ${con.cnpj}?`)) {
      axios.delete(`/concessionarias/${con.cnpj}`)
      .then(() => {
        setConcessionarias(concessionarias.filter(c => c.cnpj !== con.cnpj));
      })
      .catch(err => console.error("Erro ao excluir concessionaria:", err));
    }
  };

  const carHeaders = [
    "CNPJ", "Nome", "Telefone", "Endereço"
  ];

  const renderCarRow = (c) => (
    <>
      <td className="py-2 px-4 border-b border-gray-200">{c.cnpj}</td>
      <td className="py-2 px-4 border-b border-gray-200">{c.nome}</td>
      <td className="py-2 px-4 border-b border-gray-200">{c.telefone}</td>
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
    return <p className="text-center p-4">Carregando concessionarias...</p>;
  }

  if (error) {
    return <p className="text-center p-4 text-red-600">{error}</p>;
  }

  return (
    <div className="p-4"> {}
      <h2 className="text-2xl font-bold mb-4">Lista de Concessionárias</h2>
      <GenericTable
        headers={carHeaders}
        data={concessionarias}
        renderRow={renderCarRow}
        actions={carActions}
      />
    </div>
  );
}