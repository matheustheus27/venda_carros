export const formatCpf = (cpf) => {
  if (!cpf) return '';
  const cleanCpf = String(cpf).replace(/\D/g, '');
  return cleanCpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
};

export const formatCnpj = (cnpj) => {
  if (!cnpj) return '';
  const cleanCnpj = String(cnpj).replace(/\D/g, '');
  return cleanCnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
};

export const formatDate = (dateString) => {
  if (!dateString) return '';
  return new Date(dateString + 'T00:00:00').toLocaleDateString('pt-BR');
};

export const formatCurrency = (value) => {
  if (value === null || value === undefined || isNaN(value)) {
    return 'R$ 0,00';
  }
  
  const numericValue = parseFloat(value);
  return numericValue.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

export const formatPhoneNumber = (phoneNumber) => {
  if (!phoneNumber) return '';

  const cleanNumber = String(phoneNumber).replace(/\D/g, '');

  let ddd = '';
  let number = '';

  if (cleanNumber.length >= 10) {
    ddd = cleanNumber.substring(0, 2);
    number = cleanNumber.substring(2);
  } else if (cleanNumber.length >= 8) { 
    return cleanNumber;
  } else {
    return cleanNumber;
  }

  if (number.length === 9) {
    return `(${ddd}) ${number.substring(0, 1)} ${number.substring(1, 5)}-${number.substring(5)}`;
  } else if (number.length === 8) {
    return `(${ddd}) ${number.substring(0, 4)}-${number.substring(4)}`;
  }

  return cleanNumber;
};