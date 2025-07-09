import React from 'react';
import '../css/ListStyles.css';

export default function GenericTable({ headers, data, renderRow, actions }) {
  if (!data || data.length === 0) {
    return <p className="no-data-message">Nenhum dado disponível.</p>;
  }

  return (
    <div className="generic-table-container">
      <table>
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
            {actions && <th>Ações</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item.id || index} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
              {renderRow(item, index)}
              {actions && (
                <td className="actions-cell">
                  {actions(item, index)}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}