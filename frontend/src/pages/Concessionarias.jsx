import { useEffect, useState } from "react";
import axios from "../services/api";
import GenericTable from "../components/GenericTable";
import ModalEditar from "../components/ModalEditar";

export default function Concessionarias() {
  const [concessionarias, setConcessionarias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentConcessionaria, setCurrentConcessionaria] = useState(null);

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
    setCurrentConcessionaria(con);
    setIsModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentConcessionaria(null);
  };
  
  const handleSaveEdit = (updateConcessionariaData) => {
    console.log("Salvando concessionária:", updateConcessionariaData);
    
    axios.put(
      `/concessionarias/${updateConcessionariaData.cnpj}`,
      {
        nome: updateConcessionariaData.nome,
        telefone: updateConcessionariaData.telefone,
        endereco: updateConcessionariaData.endereco
      }
    )
    .then(res => {
      console.log("Concessionaria atualizada com sucesso!", res.data);
      setConcessionarias(concessionarias.map(c =>
        c.cpf === updateConcessionariaData.cpf
          ? { ...c, ...updateConcessionariaData }
          : c
      ));
      handleCloseModal();
      window.alert(res.data.message);
    })
    .catch(err => {
      console.error("Erro ao atualizar concessionaria:", err);
      handleCloseModal();
      window.alert(err.response.data.message);
    });
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

  const concessionariaHeaders = [
    "CNPJ", "Nome", "Telefone", "Endereço"
  ];

  const renderConcessionariaRow = (c) => (
    <>
      <td className="py-2 px-4 border-b border-gray-200">{c.cnpj}</td>
      <td className="py-2 px-4 border-b border-gray-200">{c.nome}</td>
      <td className="py-2 px-4 border-b border-gray-200">{c.telefone}</td>
      <td className="py-2 px-4 border-b border-gray-200">{c.endereco}</td>
    </>
  );

  const concessionariaActions = (c) => (
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

  const concessionariasLockedFields = [
    { name: 'cnpj', label: 'CNPJ' },
  ];

  const concessionariasEditableFields = [
    { name: 'nome', label: 'Nome' },
    { name: 'telefone', label: 'Telefone' },
    { name: 'endereco', label: 'Endereço' },
  ];

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
        headers={concessionariaHeaders}
        data={concessionarias}
        renderRow={renderConcessionariaRow}
        actions={concessionariaActions}
      />

      <ModalEditar
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        entityData={currentConcessionaria}
        onSave={handleSaveEdit}
        title="Editar Concessionária"
        lockedFieldsConfig={concessionariasLockedFields}
        editableFieldsConfig={concessionariasEditableFields}
      />
    </div>
  );
}