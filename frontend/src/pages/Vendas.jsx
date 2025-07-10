import { useEffect, useState } from "react";
import { formatCpf, formatCnpj, formatDate, formatCurrency } from "../utils/formattypes";
import axios from "../services/api";
import GenericTable from "../components/GenericTable";
import Modal from "../components/Modal";
import '../css/Modal.css';
import '../css/Header.css';

export default function Vendas() {
  const [vendas, setVendas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isModalOpen, setIsEditModalOpen] = useState(false);
  const [currentVenda, setCurrentVenda] = useState(null);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false); 
  const [newVendaData, setNewVendaData] = useState(null);

  useEffect(() => {
    axios.get("/vendas")
      .then((res) => {
        setVendas(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erro ao carregar vendas:", err);
        setError("Erro ao carregar os dados de Vendas.");
        setLoading(false);
      });
  }, []);

  const handleAdd = () => {
    setNewVendaData({});
    setIsAddModalOpen(true);
  };
  
  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
    setNewVendaData(null);
  };
  
  const handleSaveAdd = (newVendaFormData) => {
    console.log("Adicionando novo venda:", newVendaFormData);
  
    axios.post("/vendas", {
      cpf_cliente: newVendaFormData.cpf_cliente,
      cpf_vendedor: newVendaFormData.cpf_vendedor,
      placa_carro: newVendaFormData.placa_carro,
      cnpj_concessionaria: newVendaFormData.cnpj_concessionaria,
      data: newVendaFormData.data,
      valor: parseFloat(newVendaFormData.valor),
      tipo_pagamento: newVendaFormData.tipo_pagamento,
      total_pago: parseFloat(newVendaFormData.total_pago),
    })
    .then(res => {
      setVendas([...vendas, newVendaFormData]);
      handleCloseAddModal();
      window.alert(res.data.message);
    })
    .catch(err => {
      console.error("Erro ao adicionar venda:", err);
      handleCloseAddModal();
      window.alert(err.response.data.message);
    });
  };

  const handleEdit = (ven) => {
    setCurrentVenda(ven);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setCurrentVenda(null);
  };

  const handleSaveEdit = (updateVendaData) => {
    console.log("Salvando venda:", updateVendaData);

    axios.put(
      `/vendas/${updateVendaData.cpf_vendedor}/${updateVendaData.cpf_cliente}/${updateVendaData.placa_carro}/${updateVendaData.cnpj_concessionaria}/${updateVendaData.data}`,
      {
        valor: parseFloat(updateVendaData.valor),
        tipo_pagamento: updateVendaData.tipo_pagamento,
        total_pago: parseFloat(updateVendaData.total_pago),
      }
    )
    .then(res => {
      console.log("Venda atualizada com sucesso!", res.data);
      setVendas(vendas.map(v =>
        v.cpf_vendedor === updateVendaData.cpf_vendedor &&
        v.cpf_cliente === updateVendaData.cpf_cliente &&
        v.placa_carro === updateVendaData.placa_carro &&
        v.cnpj_concessionaria === updateVendaData.cnpj_concessionaria &&
        v.data === updateVendaData.data
          ? { ...v, ...updateVendaData }
          : v
      ));
      handleCloseEditModal();
      window.alert(res.data.message);
    })
    .catch(err => {
      console.error("Erro ao atualizar venda:", err);
      handleCloseEditModal();
      window.alert(err.response.data.message);
    });
  };

  const handleDelete = (ven) => {
    if (window.confirm(`Tem certeza que deseja excluir a venda ${ven.cpf_vendedor}-${ven.cpf_cliente}-${ven.placa_carro}-${ven.cnpj_concessionaria}-${ven.data}?`)) {
      axios.delete(`/vendas/${ven.cpf_vendedor}/${ven.cpf_cliente}/${ven.placa_carro}/${ven.cnpj_concessionaria}/${ven.data}`)
      .then(() => {
        setVendas(vendas.filter(
          v => !(
            v.cpf_vendedor === ven.cpf_vendedor &&
            v.cpf_cliente === ven.cpf_cliente &&
            v.placa_carro === ven.placa_carro &&
            v.cnpj_concessionaria === ven.cnpj_concessionaria &&
            v.data === ven.data
          )
        ));
      })
      .catch(err => console.error("Erro ao excluir venda:", err));
    }
  };

  const vendaHeaders = [
    "CPF do Cliente", "CPF do Vendedor", "Placa do Carro", "CNPJ da Concessionária", "Data da Venda",
    "Valor", "Tipo de Pagamento", "Total Pago"
  ];

  const renderVendaRow = (v) => (
    <>
      <td className="py-2 px-4 border-b border-gray-200">{formatCpf(v.cpf_cliente)}</td>
      <td className="py-2 px-4 border-b border-gray-200">{formatCpf(v.cpf_vendedor)}</td>
      <td className="py-2 px-4 border-b border-gray-200">{v.placa_carro}</td>
      <td className="py-2 px-4 border-b border-gray-200">{formatCnpj(v.cnpj_concessionaria)}</td>
      <td className="py-2 px-4 border-b border-gray-200">{formatDate(v.data)}</td>
      <td className="py-2 px-4 border-b border-gray-200">{formatCurrency(v.valor)}</td>
      <td className="py-2 px-4 border-b border-gray-200">{v.tipo_pagamento}</td>
      <td className="py-2 px-4 border-b border-gray-200">{formatCurrency(v.total_pago)}</td>
    </>
  );

  const vendaActions = (v) => (
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

  const vendasLockedFields = [
    { name: 'cpf_cliente', label: 'CPF do Cliente', formatter: formatCpf },
    { name: 'cpf_vendedor', label: 'CPF do Vendedor', formatter: formatCpf },
    { name: 'placa_carro', label: 'Placa do Carro' },
    { name: 'cnpj_concessionaria', label: 'CNPJ da Concessionária', formatter: formatCnpj },
    { name: 'data', label: 'Data da Venda', type: 'date' },
  ];

  const vendasEditableFields = [
    { name: 'valor', label: 'Valor', type: 'number', formatter: formatCurrency },
    { name: 'tipo_pagamento', label: 'Tipo de Pagamento' },
    { name: 'total_pago', label: 'Total Pago', type: 'number', formatter: formatCurrency },
  ];

  const vendasAddFields = [
    { name: 'cpf_cliente', label: 'CPF do Cliente', formatter: formatCpf },
    { name: 'cpf_vendedor', label: 'CPF do Vendedor', formatter: formatCpf },
    { name: 'placa_carro', label: 'Placa do Carro' },
    { name: 'cnpj_concessionaria', label: 'CNPJ da Concessionária', formatter: formatCnpj },
    { name: 'data', label: 'Data da Venda', type: 'date' },
    { name: 'valor', label: 'Valor', type: 'number'},
    { name: 'tipo_pagamento', label: 'Tipo de Pagamento' },
    { name: 'total_pago', label: 'Total Pago', type: 'number'},
  ];

  if (loading) {
    return <p className="text-center p-4">Carregando vendas...</p>;
  }

  if (error) {
    return <p className="text-center p-4 text-red-600">{error}</p>;
  }

  return (
    <div className="p-4"> {}
      <h2 className="header-left-spacing">Lista de Vendas</h2>
      <div className="mb-4"> {}
        <button
          onClick={handleAdd}
          className="add-button-style"
        >
          <span className="mr-2">➕</span> Adicionar
        </button>
      </div>
      <GenericTable
        headers={vendaHeaders}
        data={vendas}
        renderRow={renderVendaRow}
        actions={vendaActions}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseEditModal}
        entityData={currentVenda}
        onSave={handleSaveEdit}
        title="Editar Venda"
        lockedFieldsConfig={vendasLockedFields}
        editableFieldsConfig={vendasEditableFields}
      />

      <Modal
        isOpen={isAddModalOpen}
        onClose={handleCloseAddModal}
        entityData={newVendaData}
        onSave={handleSaveAdd}
        title="Adicionar Nova Venda"
        lockedFieldsConfig={[]}
        editableFieldsConfig={vendasAddFields}
      />
    </div>
  );
}