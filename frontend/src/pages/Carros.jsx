import { useEffect, useState } from "react";
import { formatCnpj, formatCurrency } from "../utils/formattypes";
import axios from "../services/api";
import GenericTable from "../components/GenericTable";
import Modal from "../components/Modal";
import '../css/Modal.css';
import '../css/Header.css';

export default function Carros() {
  const [carros, setCarros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isModalOpen, setIsEditModalOpen] = useState(false);
  const [currentCarro, setCurrentCarro] = useState(null);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false); 
  const [newCarroData, setNewCarroData] = useState(null);

  useEffect(() => {
    axios.get("/carros")
      .then((res) => {
        setCarros(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erro ao carregar carros:", err);
        setError("Erro ao carregar os dados de carros.");
        setLoading(false);
      });
  }, []);

  const handleAdd = () => {
      setNewCarroData({});
      setIsAddModalOpen(true);
    };
  
  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
    setNewCarroData(null);
  };
  
  const handleSaveAdd = (newCarroFormData) => {
    console.log("Adicionando novo carro:", newCarroFormData);
  
    axios.post("/carros", {
      placa: newCarroFormData.placa,
      marca: newCarroFormData.marca,
      modelo: newCarroFormData.modelo,
      ano: parseInt(newCarroFormData.ano),
      cor: newCarroFormData.cor,
      quilometragem: parseFloat(newCarroFormData.quilometragem),
      preco: parseFloat(newCarroFormData.preco),
      status: newCarroFormData.status,
      cnpj_concessionaria: newCarroFormData.cnpj_concessionaria,
    })
    .then(res => {
      setCarros([...carros, newCarroFormData]);
      handleCloseAddModal();
      window.alert(res.data.message);
    })
    .catch(err => {
      console.error("Erro ao adicionar carro:", err);
      handleCloseAddModal();
      window.alert(err.response.data.message);
    });
  };

  const handleEdit = (con) => {
    setCurrentCarro(con);
    setIsEditModalOpen(true);
  };
  
  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setCurrentCarro(null);
  };
  
  const handleSaveEdit = (updateCarroData) => {
    console.log("Salvando carro:", updateCarroData);
    
    axios.put(
      `/carros/${updateCarroData.placa}`,
      {
        marca: updateCarroData.marca,
        modelo: updateCarroData.modelo,
        ano: updateCarroData.ano,
        cor: updateCarroData.cor,
        quilometragem: updateCarroData.quilometragem,
        preco: updateCarroData.preco,
        status: updateCarroData.status,
        cnpj_concessionaria: updateCarroData.cnpj_concessionaria
      }
    )
    .then(res => {
      console.log("Carro atualizada com sucesso!", res.data);
      setCarros(carros.map(c =>
        c.placa === updateCarroData.placa
          ? { ...c, ...updateCarroData }
          : c
      ));
      handleCloseEditModal();
      window.alert(res.data.message);
    })
    .catch(err => {
      console.error("Erro ao atualizar carro:", err);
      handleCloseEditModal();
      window.alert(err.response.data.message);
    });
  };

  const handleDelete = (car) => {
    if (window.confirm(`Tem certeza que deseja excluir o carro ${car.placa}?`)) {
      axios.delete(`/carros/${car.placa}`)
      .then(() => {
        setCarros(carros.filter(c => c.placa !== car.placa));
      })
      .catch(err => console.error("Erro ao excluir carro:", err));
    }
  };

  const carroHeaders = [
    "Placa", "Marca", "Modelo", "Ano", "Cor",
    "Quilometragem", "Preço", "Status", "CNPJ da Concessionária"
  ];

  const renderCarroRow = (c) => (
    <>
      <td className="py-2 px-4 border-b border-gray-200">{c.placa}</td>
      <td className="py-2 px-4 border-b border-gray-200">{c.marca}</td>
      <td className="py-2 px-4 border-b border-gray-200">{c.modelo}</td>
      <td className="py-2 px-4 border-b border-gray-200">{c.ano}</td>
      <td className="py-2 px-4 border-b border-gray-200">{c.cor}</td>
      <td className="py-2 px-4 border-b border-gray-200">
        {c.quilometragem.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
      </td>
      <td className="py-2 px-4 border-b border-gray-200">{formatCurrency(c.preco)}
      </td>
      <td className="py-2 px-4 border-b border-gray-200">{c.status}</td>
      <td className="py-2 px-4 border-b border-gray-200">{formatCnpj(c.cnpj_concessionaria)}</td>
    </>
  );

  const carroActions = (c) => (
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

  const carrosLockedFields = [
    { name: 'placa', label: 'Placa do Carro' },
  ];

  const carrosEditableFields = [
    { name: 'marca', label: 'Marca' },
    { name: 'modelo', label: 'Modelo' },
    { name: 'ano', label: 'Ano' },
    { name: 'cor', label: 'Cor' },
    { name: 'quilometragem', label: 'Quilometragem', type: 'number' },
    { name: 'preco', label: 'Preço', type: 'number' },
    { name: 'status', label: 'Status' },
    { name: 'cnpj_concessionaria', label: 'cnpj_concessionaria', formatter: formatCnpj },
  ];

  const carrosAddFields = [
    { name: 'placa', label: 'Placa do Carro' },
    { name: 'marca', label: 'Marca' },
    { name: 'modelo', label: 'Modelo' },
    { name: 'ano', label: 'Ano', type: 'number' },
    { name: 'cor', label: 'Cor' },
    { name: 'quilometragem', label: 'Quilometragem', type: 'number' },
    { name: 'preco', label: 'Preço', type: 'number' },
    { name: 'status', label: 'Status' },
    { name: 'cnpj_concessionaria', label: 'CNPJ da Concessionária', formatter: formatCnpj },
  ];

  if (loading) {
    return <p className="text-center p-4">Carregando carros...</p>;
  }

  if (error) {
    return <p className="text-center p-4 text-red-600">{error}</p>;
  }

  return (
    <div className="p-4"> {}
      <h2 className="header-left-spacing">Lista de Carros</h2>
      <div className="mb-4"> {}
        <button
          onClick={handleAdd}
          className="add-button-style"
        >
          <span className="mr-2">➕</span> Adicionar
        </button>
      </div>
      <GenericTable
        headers={carroHeaders}
        data={carros}
        renderRow={renderCarroRow}
        actions={carroActions}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseEditModal}
        entityData={currentCarro}
        onSave={handleSaveEdit}
        title="Editar Carro"
        lockedFieldsConfig={carrosLockedFields}
        editableFieldsConfig={carrosEditableFields}
      />

      <Modal
        isOpen={isAddModalOpen}
        onClose={handleCloseAddModal}
        entityData={newCarroData}
        onSave={handleSaveAdd}
        title="Adicionar Novo Carro"
        lockedFieldsConfig={[]}
        editableFieldsConfig={carrosAddFields}
      />
    </div>
  );
}