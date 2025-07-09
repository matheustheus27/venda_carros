import { useEffect, useState } from "react";
import axios from "../services/api";
import GenericTable from "../components/GenericTable";
import ModalEditar from "../components/ModalEditar";

export default function Carros() {
  const [carros, setCarros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCarro, setCurrentCarro] = useState(null);

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

  const handleEdit = (con) => {
    setCurrentCarro(con);
    setIsModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
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
      handleCloseModal();
      window.alert(res.data.message);
    })
    .catch(err => {
      console.error("Erro ao atualizar carro:", err);
      handleCloseModal();
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
      <td className="py-2 px-4 border-b border-gray-200">
        R$ {parseFloat(c.preco).toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
      </td>
      <td className="py-2 px-4 border-b border-gray-200">{c.status}</td>
      <td className="py-2 px-4 border-b border-gray-200">{c.cnpj_concessionaria}</td>
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
    { name: 'cnpj_concessionaria', label: 'cnpj_concessionaria' },
  ];

  if (loading) {
    return <p className="text-center p-4">Carregando carros...</p>;
  }

  if (error) {
    return <p className="text-center p-4 text-red-600">{error}</p>;
  }

  return (
    <div className="p-4"> {}
      <h2 className="text-2xl font-bold mb-4">Lista de Carros</h2>
      <GenericTable
        headers={carroHeaders}
        data={carros}
        renderRow={renderCarroRow}
        actions={carroActions}
      />

      <ModalEditar
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        entityData={currentCarro}
        onSave={handleSaveEdit}
        title="Editar Carro"
        lockedFieldsConfig={carrosLockedFields}
        editableFieldsConfig={carrosEditableFields}
      />
    </div>
  );
}