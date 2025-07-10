from fastapi import APIRouter, Path
from datetime import date
from models import venda
from schemas.venda import VendaCreate, VendaUpdate

router = APIRouter()

@router.get(
    '/',
    summary= "Retorna a lista de todas as vendas",
    responses= {
        200: {
            "content": {
                "application/json": {
                    "example": {
                        "status": True,
                        "message": "Vendas buscadas com sucesso!",
                        "data": [
                            {
                                "cpf_cliente": "12345678900",
                                "cpf_vendedor": "12345678911",
                                "placa_carro": "AAA1234",
                                "cnpj_concessionaria": "12345678900000",
                                "data": "2025-07-07",
                                "valor": 250000.55,
                                "tipo_pagamento": "PIX",
                                "total_pago": 250000.55
                            }
                        ]
                    }
                }
            }
        }
    }
)
def index():
    return venda.index()

@router.post(
    '/',
    summary= "Registra uma nova venda no banco de dados",
    responses= {
        201: {
            "content": {
                "application/json": {
                    "example": {
                        "status": True,
                        "message": "Venda criada com sucesso!"
                    }
                }
            }
        }
    }
)
def create(data: VendaCreate):
    return venda.create(**data.model_dump())

@router.get(
    '/{cpf_vendedor}/{cpf_cliente}/{placa_carro}/{cnpj_concessionaria}/{data_venda}',
    summary= "Retorna uma venda pelo CPF do vendedor, CPF do cliente, placa do carro, CNPJ da concessionaria e data da venda",
    responses= {
        200: {
            "content": {
                "application/json": {
                    "example": {
                       "status": True,
                        "message": "Concessionaria buscada com sucesso!",
                        "data": {
                            "cpf_cliente": "12345678900",
                            "cpf_vendedor": "12345678911",
                            "placa_carro": "AAA1234",
                            "cnpj_concessionaria": "12345678900000",
                            "data": "2025-07-07",
                            "valor": 250000.55,
                            "tipo_pagamento": "PIX",
                            "total_pago": 250000.55
                        }
                    }
                }
            }
        }
    }
)
def show(cpf_vendedor: str = Path(
    ...,
    title="CPF do vendedor",
    description="CPF do vendedor no formato 12345678911",
    example="12345678911"
), cpf_cliente: str = Path(
    ...,
    title="CPF do cliente",
    description="CPF do cliente no formato 12345678900",
    example="12345678900"
), placa_carro: str = Path(
    ...,
    title="Placa do carro",
    description="Placa do carro no formato AAA1234",
    example="12345678900"
), cnpj_concessionaria: str = Path(
    ...,
    title="CNPJ da concessionária",
    description="CNPJ da concessionária no formato 12345678900000",
    example="12345678900000"
), data_venda: date = Path(
    ...,
    title="Data da venda",
    description="Data da venda no formato 2025-07-07",
    example="2025-07-07"
)):
    return venda.show(cpf_vendedor, cpf_cliente, placa_carro, cnpj_concessionaria, data_venda)

@router.put(
    '/{cpf_vendedor}/{cpf_cliente}/{placa_carro}/{cnpj_concessionaria}/{data_venda}',
    summary= "Atualiza os dados de uma venda pelo CPF do vendedor, CPF do cliente, placa do carro, CNPJ da concessionaria e data da venda",
    responses= {
        200: {
            "content": {
                "application/json": {
                    "example": {
                        "status": True,
                        "message": "Venda atualizada com sucesso!"
                    }
                }
            }
        }
    }
)
def update(data: VendaUpdate,
    cpf_vendedor: str = Path(
    ...,
    title="CPF do vendedor",
    description="CPF do vendedor no formato 12345678911",
    example="12345678911"
), cpf_cliente: str = Path(
    ...,
    title="CPF do cliente",
    description="CPF do cliente no formato 12345678900",
    example="12345678900"
), placa_carro: str = Path(
    ...,
    title="Placa do carro",
    description="Placa do carro no formato AAA1234",
    example="12345678900"
), cnpj_concessionaria: str = Path(
    ...,
    title="CNPJ da concessionária",
    description="CNPJ da concessionária no formato 12345678900000",
    example="12345678900000"
), data_venda: date = Path(
    ...,
    title="Data da venda",
    description="Data da venda no formato 2025-07-07",
    example="2025-07-07"
)
):
    return venda.update(cpf_vendedor, cpf_cliente, placa_carro, cnpj_concessionaria, data_venda, **data.model_dump())

@router.delete(
    '/{cpf_vendedor}/{cpf_cliente}/{placa_carro}/{cnpj_concessionaria}/{data_venda}',
    summary= "Remove os dados de uma venda pelo CPF do vendedor, CPF do cliente, placa do carro, CNPJ da concessionaria e data da venda",
    responses= {
        200: {
            "content": {
                "application/json": {
                    "example": {
                        "status": True,
                        "message": "Venda deletada com sucesso!"
                    }
                }
            }
        }
    }
)
def delete(cpf_vendedor: str = Path(
    ...,
    title="CPF do vendedor",
    description="CPF do vendedor no formato 12345678911",
    example="12345678911"
), cpf_cliente: str = Path(
    ...,
    title="CPF do cliente",
    description="CPF do cliente no formato 12345678900",
    example="12345678900"
), placa_carro: str = Path(
    ...,
    title="Placa do carro",
    description="Placa do carro no formato AAA1234",
    example="12345678900"
), cnpj_concessionaria: str = Path(
    ...,
    title="CNPJ da concessionária",
    description="CNPJ da concessionária no formato 12345678900000",
    example="12345678900000"
), data_venda: date = Path(
    ...,
    title="Data da venda",
    description="Data da venda no formato 2025-07-07",
    example="2025-07-07"
)):
    return venda.delete(cpf_vendedor, cpf_cliente, placa_carro, cnpj_concessionaria, data_venda)

@router.get(
    '/vendedor/{cpf_vendedor}',
    summary= "Retorna a lista de todas as vendas feitas por um vendedor",
    responses= {
        200: {
            "content": {
                "application/json": {
                    "example": {
                        "status": True,
                        "message": "Vendas do vendedor 12345678911 buscadas com sucesso!",
                        "data": [
                            {
                                "cpf_cliente": "12345678900",
                                "cpf_vendedor": "12345678911",
                                "placa_carro": "AAA1234",
                                "cnpj_concessionaria": "12345678900000",
                                "data": "2025-07-07",
                                "valor": 250000.55,
                                "tipo_pagamento": "PIX",
                                "total_pago": 250000.55
                            }
                        ]
                    }
                }
            }
        }
    }
)
def find_by_vendedor(cpf_vendedor: str = Path(
    ...,
    title="CPF do vendedor",
    description="CPF do vendedor no formato 12345678911",
    example="12345678911"
)):
    return venda.find_by_vendedor(cpf_vendedor)

@router.get(
    '/cliente/{cpf_cliente}',
    summary= "Retorna a lista de todas as vendas feitas para um cliente",
    responses= {
        200: {
            "content": {
                "application/json": {
                    "example": {
                        "status": True,
                        "message": "Vendas para o cliente 12345678900 buscadas com sucesso!",
                        "data": [
                            {
                                "cpf_cliente": "12345678900",
                                "cpf_vendedor": "12345678911",
                                "placa_carro": "AAA1234",
                                "cnpj_concessionaria": "12345678900000",
                                "data": "2025-07-07",
                                "valor": 250000.55,
                                "tipo_pagamento": "PIX",
                                "total_pago": 250000.55
                            }
                        ]
                    }
                }
            }
        }
    }
)
def find_by_cliente(cpf_cliente: str = Path(
    ...,
    title="CPF do cliente",
    description="CPF do cliente no formato 12345678900",
    example="12345678900"
)):
    return venda.find_by_cliente(cpf_cliente)

@router.get(
    '/concessionaria/{cnpj_concessionaria}',
    summary= "Retorna a lista de todas as vendas feitas por uma concessionária",
    responses= {
        200: {
            "content": {
                "application/json": {
                    "example": {
                        "status": True,
                        "message": "Vendas da concessionária 12345678900000 buscadas com sucesso!",
                        "data": [
                            {
                                "cpf_cliente": "12345678900",
                                "cpf_vendedor": "12345678911",
                                "placa_carro": "AAA1234",
                                "cnpj_concessionaria": "12345678900000",
                                "data": "2025-07-07",
                                "valor": 250000.55,
                                "tipo_pagamento": "PIX",
                                "total_pago": 250000.55
                            }
                        ]
                    }
                }
            }
        }
    }
)
def find_by_concessionaria(cnpj_concessionaria: str = Path(
    ...,
    title="CNPJ da concessionária",
    description="CNPJ da concessionária no formato 12345678900000",
    example="12345678900000"
)):
    return venda.find_by_concessionaria(cnpj_concessionaria)

@router.get(
    '/detalhes',
    summary= "Retorna a lista de todas as vendas detalhadas",
    responses= {
        200: {
            "content": {
                "application/json": {
                    "example": {
                        "status": True,
                        "message": "Detalhes de vendas buscados com sucesso!",
                        "data": [
                            {
                                "data": "2025-07-07",
                                "carro_modelo": "Mustang",
                                "cliente_nome": "José da Silva",
                                "vendedor_nome": "Marcos Teixeira",
                                "concessionaria_nome": "Auto Car BH",
                                "valor": 250000.55,
                            }
                        ]
                    }
                }
            }
        }
    }
)
def show_details():
    return venda.show_details()

@router.get(
    '/media',
    summary= "Retorna a lista de todas as vendas acima da media de preços",
    responses= {
        200: {
            "content": {
                "application/json": {
                    "example": {
                        "status": True,
                        "message": "Vendas com preço acima da media buscadas com sucesso!",
                        "data": [
                            {
                                "cliente_nome": "José da Silva",
                                "carro_modelo": "Mustang",
                                "preco": 250000.55,
                            }
                        ]
                    }
                }
            }
        }
    }
)
def show_above_avg_sales():
    return venda.show_above_avg_sales()