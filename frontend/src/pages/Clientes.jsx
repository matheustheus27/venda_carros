import { useEffect, useState } from "react";
import { formatCpf, formatPhoneNumber } from "../utils/formattypes";
import axios from "../services/api";
import GenericTable from "../components/GenericTable";
import Modal from "../components/Modal";
import '../css/Modal.css';
import '../css/Header.css';
import '../css/Header.css';

export default function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isModalOpen, setIsEditModalOpen] = useState(false);
  const [currentCliente, setCurrentCliente] = useState(null);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false); 
  const [newClienteData, setNewClienteData] = useState(null);

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

  const handleAdd = () => {
    setNewClienteData({});
    setIsAddModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
    setNewClienteData(null);
  };

  const handleSaveAdd = (newClienteFormData) => {
    console.log("Adicionando novo cliente:", newClienteFormData);

    axios.post("/clientes", {
      cpf: newClienteFormData.cpf,
      nome: newClienteFormData.nome,
      telefone: newClienteFormData.telefone,
      email: newClienteFormData.email,
      endereco: newClienteFormData.endereco,
    })
    .then(res => {
      setClientes([...clientes, newClienteFormData]);
      handleCloseAddModal();
      window.alert(res.data.message);
    })
    .catch(err => {
      console.error("Erro ao adicionar cliente:", err);
      handleCloseAddModal();
      window.alert(err.response.data.message);
    });
  };

  const handleEdit = (cli) => {
    setCurrentCliente(cli);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setCurrentCliente(null);
  };

  const handleSaveEdit = (updateClienteData) => {
    console.log("Salvando cliente:", updateClienteData);
  
    axios.put(
      `/clientes/${updateClienteData.cpf}`,
      {
        nome: updateClienteData.nome,
        telefone: updateClienteData.telefone,
        email: updateClienteData.email,
        endereco: updateClienteData.endereco
      }
    )
    .then(res => {
      console.log("Cliente atualizada com sucesso!", res.data);
      setClientes(clientes.map(c =>
        c.cpf === updateClienteData.cpf
          ? { ...c, ...updateClienteData }
          : c
      ));
      handleCloseEditModal();
      window.alert(res.data.message);
    })
    .catch(err => {
      console.error("Erro ao atualizar cliente:", err);
      handleCloseEditModal();
      window.alert(err.response.data.message);
    });
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

  const clienteHeaders = [
    "CPF", "Nome", "Telefone", "Email", "Endereço"
  ];

  const renderClienteRow = (c) => (
    <>
      <td className="py-2 px-4 border-b border-gray-200">{formatCpf(c.cpf)}</td>
      <td className="py-2 px-4 border-b border-gray-200">{c.nome}</td>
      <td className="py-2 px-4 border-b border-gray-200">{formatPhoneNumber(c.telefone)}</td>
      <td className="py-2 px-4 border-b border-gray-200">{c.email}</td>
      <td className="py-2 px-4 border-b border-gray-200">{c.endereco}</td>
    </>
  );

  const clienteActions = (c) => (
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

  const clientesLockedFields = [
    { name: 'cpf', label: 'CPF', formatter: formatCpf },
  ];

  const clientesEditableFields = [
    { name: 'nome', label: 'Nome' },
    { name: 'telefone', label: 'Telefone', formatter: formatPhoneNumber },
    { name: 'email', label: 'Email' },
    { name: 'endereco', label: 'Endereço' },
  ];

  const clientesAddFields = [
    { name: 'cpf', label: 'CPF', formatter: formatCpf },
    { name: 'nome', label: 'Nome' },
    { name: 'telefone', label: 'Telefone', formatter: formatPhoneNumber },
    { name: 'email', label: 'Email' },
    { name: 'endereco', label: 'Endereço' },
  ];

  if (loading) {
    return <p className="text-center p-4">Carregando clientes...</p>;
  }

  if (error) {
    return <p className="text-center p-4 text-red-600">{error}</p>;
  }

  return (
    <div className="p-4"> {}
      <h2 className="header-left-spacing">Lista de Clientes</h2>
      <div className="mb-4"> {}
        <button
          onClick={handleAdd}
          className="add-button-style"
        >
          <span className="mr-2">➕</span> Adicionar
        </button>
      </div>
      <GenericTable
        headers={clienteHeaders}
        data={clientes}
        renderRow={renderClienteRow}
        actions={clienteActions}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseEditModal}
        entityData={currentCliente}
        onSave={handleSaveEdit}
        title="Editar Cliente"
        lockedFieldsConfig={clientesLockedFields}
        editableFieldsConfig={clientesEditableFields}
      />

      <Modal
        isOpen={isAddModalOpen}
        onClose={handleCloseAddModal}
        entityData={newClienteData}
        onSave={handleSaveAdd}
        title="Adicionar Novo Cliente"
        lockedFieldsConfig={[]}
        editableFieldsConfig={clientesAddFields}
      />
    </div>
  );
}