import { useEffect, useState } from "react";
import { formatCnpj, formatPhoneNumber } from "../utils/formattypes";
import axios from "../services/api";
import GenericTable from "../components/GenericTable";
import Modal from "../components/Modal";
import '../css/Modal.css';
import '../css/Header.css';

export default function Concessionarias() {
  const [concessionarias, setConcessionarias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isModalOpen, setIsEditModalOpen] = useState(false);
  const [currentConcessionaria, setCurrentConcessionaria] = useState(null);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false); 
  const [newConcessionariaData, setNewConcessionariaData] = useState(null);

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

  const handleAdd = () => {
      setNewConcessionariaData({});
      setIsAddModalOpen(true);
    };
  
  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
    setNewConcessionariaData(null);
  };
  
  const handleSaveAdd = (newConcessionariaFormData) => {
    console.log("Adicionando nova concessionária:", newConcessionariaFormData);
  
    axios.post("/concessionarias", {
      cnpj: newConcessionariaFormData.cnpj,
      nome: newConcessionariaFormData.nome,
      telefone: newConcessionariaFormData.telefone,
      endereco: newConcessionariaFormData.endereco,
    })
    .then(res => {
      setConcessionarias([...concessionarias, newConcessionariaFormData]);
      handleCloseAddModal();
      window.alert(res.data.message);
    })
    .catch(err => {
      console.error("Erro ao adicionar concessionária:", err);
      handleCloseAddModal();
      window.alert(err.response.data.message);
    });
  };

  const handleEdit = (con) => {
    setCurrentConcessionaria(con);
    setIsEditModalOpen(true);
  };
  
  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
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
        c.cnpj === updateConcessionariaData.cnpj
          ? { ...c, ...updateConcessionariaData }
          : c
      ));
      handleCloseEditModal();
      window.alert(res.data.message);
    })
    .catch(err => {
      console.error("Erro ao atualizar concessionaria:", err);
      handleCloseEditModal();
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
      <td className="py-2 px-4 border-b border-gray-200">{formatCnpj(c.cnpj)}</td>
      <td className="py-2 px-4 border-b border-gray-200">{c.nome}</td>
      <td className="py-2 px-4 border-b border-gray-200">{formatPhoneNumber(c.telefone)}</td>
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
    { name: 'cnpj', label: 'CNPJ', formatter: formatCnpj },
  ];

  const concessionariasEditableFields = [
    { name: 'nome', label: 'Nome' },
    { name: 'telefone', label: 'Telefone', formatter: formatPhoneNumber },
    { name: 'endereco', label: 'Endereço' },
  ];

  const concessionariasAddFields = [
    { name: 'cnpj', label: 'CNPJ', formatter: formatCnpj },
    { name: 'nome', label: 'Nome' },
    { name: 'telefone', label: 'Telefone', formatter: formatPhoneNumber },
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
      <h2 className="header-left-spacing">Lista de Concessionárias</h2>
      <div className="mb-4"> {}
        <button
          onClick={handleAdd}
          className="add-button-style"
        >
          <span className="mr-2">➕</span> Adicionar
        </button>
      </div>
      <GenericTable
        headers={concessionariaHeaders}
        data={concessionarias}
        renderRow={renderConcessionariaRow}
        actions={concessionariaActions}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseEditModal}
        entityData={currentConcessionaria}
        onSave={handleSaveEdit}
        title="Editar Concessionária"
        lockedFieldsConfig={concessionariasLockedFields}
        editableFieldsConfig={concessionariasEditableFields}
      />

      <Modal
        isOpen={isAddModalOpen}
        onClose={handleCloseAddModal}
        entityData={newConcessionariaData}
        onSave={handleSaveAdd}
        title="Adicionar Nova Concessionária"
        lockedFieldsConfig={[]}
        editableFieldsConfig={concessionariasAddFields}
      />
    </div>
  );
}