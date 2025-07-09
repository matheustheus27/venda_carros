import { useEffect, useState } from "react";
import axios from "../services/api";
import GenericTable from "../components/GenericTable";
import Modal from "../components/Modal";
import '../css/Header.css';

export default function Vendedores() {
  const [vendedores, setVendedores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isModalOpen, setIsEditModalOpen] = useState(false);
  const [currentVendedor, setCurrentVendedor] = useState(null);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false); 
  const [newVendedorData, setNewVendedorData] = useState(null);

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

  const handleAdd = () => {
      setNewVendedorData({});
      setIsAddModalOpen(true);
    };
  
  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
    setNewVendedorData(null);
  };
  
  const handleSaveAdd = (newVendedorFormData) => {
    console.log("Adicionando novo vendedor:", newVendedorFormData);
  
    axios.post("/vendedores", {
      cpf: newVendedorFormData.cpf,
      nome: newVendedorFormData.nome,
      telefone: newVendedorFormData.telefone,
      email: newVendedorFormData.email,
      cnpj_concessionaria: newVendedorFormData.cnpj_concessionaria,
    })
    .then(res => {
      setVendedores([...vendedores, newVendedorFormData]);
      handleCloseAddModal();
      window.alert(res.data.message);
    })
    .catch(err => {
      console.error("Erro ao adicionar vendedor:", err);
      handleCloseAddModal();
      window.alert(err.response.data.message);
    });
  };

  const handleEdit = (ven) => {
    setCurrentVendedor(ven);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setCurrentVendedor(null);
  };

  const handleSaveEdit = (updateVendedorData) => {
    console.log("Salvando vendedor:", updateVendedorData);
  
    axios.put(
      `/vendedores/${updateVendedorData.cpf}`,
      {
        nome: updateVendedorData.nome,
        telefone: updateVendedorData.telefone,
        email: updateVendedorData.email,
        cnpj_concessionaria: updateVendedorData.cnpj_concessionaria
      }
    )
    .then(res => {
      console.log("Vendedor atualizada com sucesso!", res.data);
      setVendedores(vendedores.map(v =>
        v.cpf === updateVendedorData.cpf
          ? { ...v, ...updateVendedorData }
          : v
      ));
      handleCloseEditModal();
      window.alert(res.data.message);
    })
    .catch(err => {
      console.error("Erro ao atualizar vendedor:", err);
      handleCloseEditModal();
      window.alert(err.response.data.message);
    });
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

  const vendedorHeaders = [
    "CPF", "Nome", "Telefone", "Email", "CNPJ da Concessionária"
  ];

  const renderVendedorRow = (v) => (
    <>
      <td className="py-2 px-4 border-b border-gray-200">{v.cpf}</td>
      <td className="py-2 px-4 border-b border-gray-200">{v.nome}</td>
      <td className="py-2 px-4 border-b border-gray-200">{v.telefone}</td>
      <td className="py-2 px-4 border-b border-gray-200">{v.email}</td>
      <td className="py-2 px-4 border-b border-gray-200">{v.cnpj_concessionaria}</td>
    </>
  );

  const vendedorActions = (v) => (
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

  const vendedoresLockedFields = [
    { name: 'cpf', label: 'CPF' },
  ];

  const vendedoresEditableFields = [
    { name: 'nome', label: 'Nome' },
    { name: 'telefone', label: 'Telefone' },
    { name: 'email', label: 'Email' },
    { name: 'cnpj_concessionaria', label: 'CNPJ da Concessionária' },
  ];

  const vendedoresAddFields = [
    { name: 'cpf', label: 'CPF' },
    { name: 'nome', label: 'Nome' },
    { name: 'telefone', label: 'Telefone' },
    { name: 'email', label: 'Email' },
    { name: 'cnpj_concessionaria', label: 'cnpj_concessionaria' },
  ];

  if (loading) {
    return <p className="text-center p-4">Carregando vendedores...</p>;
  }

  if (error) {
    return <p className="text-center p-4 text-red-600">{error}</p>;
  }

  return (
    <div className="p-4"> {}
      <h2 className="header-left-spacing">Lista de Vendedores</h2>
      <div className="mb-4"> {}
        <button
          onClick={handleAdd}
          className="add-button-style"
        >
          <span className="mr-2">➕</span> Adicionar
        </button>
      </div>
      <GenericTable
        headers={vendedorHeaders}
        data={vendedores}
        renderRow={renderVendedorRow}
        actions={vendedorActions}
      />
    
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseEditModal}
        entityData={currentVendedor}
        onSave={handleSaveEdit}
        title="Editar Vendedor"
        lockedFieldsConfig={vendedoresLockedFields}
        editableFieldsConfig={vendedoresEditableFields}
      />

      <Modal
        isOpen={isAddModalOpen}
        onClose={handleCloseAddModal}
        entityData={newVendedorData}
        onSave={handleSaveAdd}
        title="Adicionar Novo Vendedor"
        lockedFieldsConfig={[]}
        editableFieldsConfig={vendedoresAddFields}
      />
    </div>
  );
}