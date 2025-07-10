import React, { useState, useEffect } from 'react';
import '../css/Modal.css';
import { formatCpf, formatCnpj, formatPhoneNumber, formatDateForDisplay } from '../utils/formattypes';

export default function Modal({
  isOpen,
  onClose,
  entityData,
  onSave,
  title,
  lockedFieldsConfig = [],
  editableFieldsConfig = [],
}) {
  const [formData, setFormData] = useState({});
  
  useEffect(() => {
    if (isOpen && entityData) {
      const initialForm = {};
      const allFields = [...lockedFieldsConfig, ...editableFieldsConfig];

      allFields.forEach(field => {
        let value = entityData[field.name];

        if (field.name === 'data' && value) {
          if (typeof value === 'string' && value.includes('/')) {
            const parts = value.split('/');
            value = `${parts[2]}-${parts[1]}-${parts[0]}`;
          } else if (value instanceof Date) {
            value = value.toISOString().split('T')[0];
          }
        } else if (field.formatter && typeof value === 'string') {
          value = value.replace(/\D/g, '');
        }
        
        initialForm[field.name] = value || '';
      });
      setFormData(initialForm);
    } else {
      setFormData({});
    }
  }, [isOpen, entityData, lockedFieldsConfig, editableFieldsConfig]);


  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    const fieldConfig = [...lockedFieldsConfig, ...editableFieldsConfig].find(f => f.name === name);
    let cleanedValue = value;

    if (fieldConfig && fieldConfig.type === 'number') {
        cleanedValue = parseFloat(value) || 0;
    } else if (fieldConfig.formatter) {
      cleanedValue = String(value).replace(/\D/g, '');
    }

    setFormData(prev => ({ ...prev, [name]: cleanedValue }));
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const renderField = (field, isLocked) => {
    let inputValue = formData[field.name];
    let inputType = field.type || 'text';

    if (field.formatter && inputType !== 'date' && inputType !== 'number') {
      inputValue = field.formatter(inputValue);
    }

    return (
      <div className="modal-input-group" key={field.name}>
        <label className="modal-input-label" htmlFor={field.name}>
          {field.label}:
          {isLocked && <span className="text-gray-500 text-sm ml-1">(Não Editável)</span>}
        </label>
        <input
          type={inputType}
          name={field.name}
          id={field.name}
          value={inputValue || ''}
          onChange={isLocked ? null : handleChange}
          className={`modal-input ${isLocked ? 'read-only' : ''}`}
          readOnly={isLocked}
          disabled={isLocked}
          step={inputType === 'number' ? 'any' : undefined}
        />
      </div>
    );
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>{title}</h3>
          <button
            onClick={onClose}
            className="modal-close-button"
            aria-label="Fechar"
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {lockedFieldsConfig.length > 0 && (
            <div className="mb-6">
              <h4 className="modal-section-title">Campos Bloqueados:</h4>
              <div className="modal-grid-container locked-fields">
                {lockedFieldsConfig.map(field => renderField(field, true))}
              </div>
            </div>
          )}

          {editableFieldsConfig.length > 0 && (
            <div className="mb-6">
              <h4 className="modal-section-title">Campos Editáveis:</h4>
              <div className="modal-grid-container editable-fields">
                {editableFieldsConfig.map(field => renderField(field, false))}
              </div>
            </div>
          )}

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