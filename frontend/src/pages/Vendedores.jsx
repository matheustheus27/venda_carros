import { useEffect, useState } from "react";
import axios from "../services/api";
import GenericTable from "../components/GenericTable";
import ModalEditar from "../components/ModalEditar";

export default function Vendedores() {
  const [vendedores, setVendedores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentVendedor, setCurrentVendedor] = useState(null);

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
    setCurrentVendedor(ven);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
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
      handleCloseModal();
      window.alert(res.data.message);
    })
    .catch(err => {
      console.error("Erro ao atualizar vendedor:", err);
      handleCloseModal();
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
        headers={vendedorHeaders}
        data={vendedores}
        renderRow={renderVendedorRow}
        actions={vendedorActions}
      />
    
      <ModalEditar
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        entityData={currentVendedor}
        onSave={handleSaveEdit}
        title="Editar Vendedor"
        lockedFieldsConfig={vendedoresLockedFields}
        editableFieldsConfig={vendedoresEditableFields}
      />
    </div>
  );
}