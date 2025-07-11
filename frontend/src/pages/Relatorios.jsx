import React, { useEffect, useState } from 'react';
import { formatCurrency, formatDate } from '../utils/formattypes';
import axios from '../services/api';
import GenericTable from '../components/GenericTable';
import '../css/Relatorios.css';

export default function Relatorios() {
  const [todasVendas, setTodasVendas] = useState([]);
  const [vendasAcimaMedia, setVendasAcimaMedia] = useState([]);
  const [vendasPorVendedor, setVendasPorVendedor] = useState([]);
  const [vendedoresVendasMinimas, setVendedoresVendasMinimas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        setLoading(true);

        const resTodasVendas = await axios.get('/vendas/detalhes');
        setTodasVendas(resTodasVendas.data.data || []);

        const resVendasAcimaMedia = await axios.get('/vendas/media');
        setVendasAcimaMedia(resVendasAcimaMedia.data.data || []);

        const resVendasPorVendedor = await axios.get('/vendedores/vendas/contagem');
        setVendasPorVendedor(resVendasPorVendedor.data.data || []);

        const resVendedoresVendasMinimas = await axios.get('/vendedores/vendas/contagem/1');
        setVendedoresVendasMinimas(resVendedoresVendasMinimas.data.data || []);

        setLoading(false);
      } catch (err) {
        console.error('Erro ao buscar relatórios:', err);
        setError('Não foi possível carregar os relatórios. Tente novamente mais tarde.');
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  if (loading) {
    return <div className="loading-message">Carregando relatórios...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  const todasVendasHeaders = [
    "Data da Venda", "Modelo do Carro", "Nome do Cliente",
    "Nome do Vendedor", "Concessionária", "Valor"
  ];

  const vendasAcimaMediaHeaders = [
    "Nome do Cliente", "Modelo do Carro", "Preço"
  ];

  const vendasPorVendedorHeaders = [
    "Vendedor", "Nº de Vendas", "Valor Total"
  ];

  const vendedoresVendasMinimasHeaders = [
    "Vendedor", "Nº de Vendas", "Valor Total"
  ];

  const renderTodasVendasRow = (venda) => (
    <>
      <td className="py-2 px-4 border-b border-gray-200">{formatDate(venda.data)}</td>
      <td className="py-2 px-4 border-b border-gray-200">{venda.carro_modelo}</td>
      <td className="py-2 px-4 border-b border-gray-200">{venda.cliente_nome}</td>
      <td className="py-2 px-4 border-b border-gray-200">{venda.vendedor_nome}</td>
      <td className="py-2 px-4 border-b border-gray-200">{venda.concessionaria_nome}</td>
      <td className="py-2 px-4 border-b border-gray-200">{formatCurrency(venda.valor)}</td>
    </>
  );

  const renderVendasAcimaMediaRow = (venda) => (
    <>
      <td className="py-2 px-4 border-b border-gray-200">{venda.cliente_nome}</td>
      <td className="py-2 px-4 border-b border-gray-200">{venda.carro_modelo}</td>
      <td className="py-2 px-4 border-b border-gray-200">{formatCurrency(venda.preco)}</td>
    </>
  );

  const renderVendasPorVendedorRow = (vendedor) => (
    <>
      <td className="py-2 px-4 border-b border-gray-200">{vendedor.nome}</td>
      <td className="py-2 px-4 border-b border-gray-200">{vendedor.total_vendas}</td>
      <td className="py-2 px-4 border-b border-gray-200">{formatCurrency(vendedor.valor_total)}</td>
    </>
  );

  const renderVendedoresVendasMinimasRow = (vendedor) => (
    <>
      <td className="py-2 px-4 border-b border-gray-200">{vendedor.nome}</td>
      <td className="py-2 px-4 border-b border-gray-200">{vendedor.total_vendas}</td>
      <td className="py-2 px-4 border-b border-gray-200">{formatCurrency(vendedor.valor_total)}</td>
    </>
  );

  return (
    <div className="relatorios-container">
      <h1>Relatórios de Vendas</h1>

      <div className="reports-grid">
        <div className="report-card">
          <h2>Todas as Vendas</h2>
          <GenericTable
            headers={todasVendasHeaders}
            data={todasVendas}
            renderRow={renderTodasVendasRow}
          />
        </div>

        <div className="report-card">
          <h2>Vendas Acima da Média</h2>
          <GenericTable
            headers={vendasAcimaMediaHeaders}
            data={vendasAcimaMedia}
            renderRow={renderVendasAcimaMediaRow}
          />
        </div>

        <div className="report-card">
          <h2>Número de Vendas por Vendedor</h2>
          <GenericTable
            headers={vendasPorVendedorHeaders}
            data={vendasPorVendedor}
            renderRow={renderVendasPorVendedorRow}
          />
        </div>

        <div className="report-card">
          <h2>Vendedores com Vendas Mínimas</h2>
          <GenericTable
            headers={vendedoresVendasMinimasHeaders}
            data={vendedoresVendasMinimas}
            renderRow={renderVendedoresVendasMinimasRow}
          />
        </div>
      </div>
    </div>
  );
}