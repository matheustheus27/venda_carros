import React, { useState, useEffect } from 'react';
import '../css/Modal.css';

export default function Modal({
  isOpen,
  onClose,
  entityData,
  onSave,
  title,
  lockedFieldsConfig,
  editableFieldsConfig,
}) {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (entityData) {
      const initialData = {};
      [...lockedFieldsConfig, ...editableFieldsConfig].forEach(field => {
        initialData[field.name] = entityData[field.name] || '';
      });
      setFormData(initialData);
    }
  }, [entityData, lockedFieldsConfig, editableFieldsConfig]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const formatDateForInput = (dateString) => {
    if (!dateString) return '';
    const parts = dateString.split('/');
    if (parts.length === 3) {
      return `${parts[2]}-${parts[1]}-${parts[0]}`;
    }
    return dateString;
  };

  const renderField = (field, isLocked) => {
    let inputValue = formData[field.name];
    let inputType = field.type || 'text';

    if (field.type === 'date' && inputValue) {
      inputValue = formatDateForInput(inputValue);
    } else if (field.type === 'number' && typeof inputValue === 'number') {
        // Para números, não formata aqui, deixa o input type="number" lidar
    } else if (field.format === 'currency' && typeof inputValue === 'number') {
      // O input type="number" lida melhor com números puros
      // Se precisar de máscara de moeda no display, isso é mais complexo com input type="number"
      // Para edição, é melhor manter o número puro
    }


    return (
      <div className="modal-input-group" key={field.name}>
        <label className="modal-input-label" htmlFor={field.name}>{field.label}:</label>
        <input
          type={inputType}
          name={field.name}
          id={field.name}
          value={inputValue}
          onChange={isLocked ? null : handleChange}
          className={`modal-input ${isLocked ? 'read-only' : ''}`}
          readOnly={isLocked}
          disabled={isLocked}
        />
      </div>
    );
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {}
        <div className="modal-header">
          <h3>{title}</h3> {}
          <button
            onClick={onClose}
            className="modal-close-button"
            aria-label="Fechar"
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {lockedFieldsConfig && lockedFieldsConfig.length > 0 && (
            <div className="mb-6">
              <h4 className="modal-section-title">Campos Bloqueados:</h4>
              <div className="modal-grid-container locked-fields">
                {lockedFieldsConfig.map(field => renderField(field, true))}
              </div>
            </div>
          )}

          {editableFieldsConfig && editableFieldsConfig.length > 0 && (
            <div className="mb-6">
              <h4 className="modal-section-title">Campos Editáveis:</h4>
              <div className="modal-grid-container editable-fields">
                {editableFieldsConfig.map(field => renderField(field, false))}
              </div>
            </div>
          )}

          {}
          <div className="modal-actions">
            <button
              type="button"
              onClick={onClose}
              className="modal-button cancel"
            >
              <span className="mr-2">❌</span> Cancelar
            </button>
            <button
              type="submit"
              className="modal-button save"
            >
              <span className="mr-2">💾</span> Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}