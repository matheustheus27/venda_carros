from fastapi import APIRouter, Path
from models import vendedor
from schemas.vendedor import VendedorCreate, VendedorUpdate

router = APIRouter()

@router.get(
    '/',
    summary= "Retorna a lista de todos os vendedores",
    responses= {
        200: {
            "content": {
                "application/json": {
                    "example": {
                        "status": True,
                        "message": "Vendedores buscados com sucesso!",
                        "data": [
                            {
                                "cpf": "12345678913",
                                "nome": "José da Silva",
                                "telefone": "3199999999",
                                "email": "jose@teste.com",
                                "cnpj_concessionaria": "12345678900000"
                            }
                        ]
                    }
                }
            }
        }
    }
)
def index():
    return vendedor.index()

@router.post(
    '/',
    summary= "Registra um novo vendedor no banco de dados",
    responses= {
        201: {
            "content": {
                "application/json": {
                    "example": {
                        "status": True,
                        "message": "Vendedor criado com sucesso!"
                    }
                }
            }
        }
    }
)
def create(data: VendedorCreate):
    return vendedor.create(**data.model_dump())

@router.get(
    '/{cpf}',
    summary= "Retorna um vendedor pelo CPF",
    responses= {
        200: {
            "content": {
                "application/json": {
                    "example": {
                        "status": True,
                        "message": "Vendedor buscado com sucesso!",
                        "data": {
                            "cpf": "12345678913",
                            "nome": "José da Silva",
                            "telefone": "3199999999",
                            "email": "jose@teste.com",
                            "cnpj_concessionaria": "12345678900000"
                        }
                    }
                }
            }
        }
    }
)
def show(cpf: str = Path(
    ...,
    title="CPF do vendedor",
    description="CPF do vendedor no formato 12345678900",
    example="12345678900"
)):
    return vendedor.show(cpf)

@router.put(
    '/{cpf}',
    summary= "Atualiza os dados de um vendedor pelo CPF",
    responses= {
        200: {
            "content": {
                "application/json": {
                    "example": {
                        "status": True,
                        "message": "Vendedor atualizado com sucesso!"
                    }
                }
            }
        }
    }
)
def update(data: VendedorUpdate, cpf: str = Path(
    ...,
    title="CPF do vendedor",
    description="CPF do vendedor no formato 12345678900",
    example="12345678900"
)):
    return vendedor.update(cpf, **data.model_dump())

@router.delete(
    '/{cpf}',
    summary= "Remove os dados de um vendedor pelo CPF",
    responses= {
        200: {
            "content": {
                "application/json": {
                    "example": {
                        "status": True,
                        "message": "Vendedor deletado com sucesso!"
                    }
                }
            }
        }
    }
)
def delete(cpf: str = Path(
    ...,
    title="CPF do vendedor",
    description="CPF do vendedor no formato 12345678900",
    example="12345678900"
)):
    return vendedor.delete(cpf)

@router.get(
    '/concessionaria/{cnpj_concessionaria}',
    summary= "Retorna a lista de todos os vendedores de uma concessionaria",
    responses= {
        200: {
            "content": {
                "application/json": {
                    "example": {
                        "status": True,
                        "message": "Vendedores da concessionária 12345678900000 buscados com sucesso!!",
                        "data": [
                            {
                                "cpf": "12345678913",
                                "nome": "José da Silva",
                                "telefone": "3199999999",
                                "email": "jose@teste.com",
                                "cnpj_concessionaria": "12345678900000"
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
    return vendedor.find_by_concessionaria(cnpj_concessionaria)

@router.get(
    '/vendas/listagem',
    summary= "Retorna todos os vendedores e os detalhes de cada venda que realizaram",
    responses= {
        200: {
            "content": {
                "application/json": {
                    "example": {
                        "status": True,
                        "message": "Vendedores buscados com sucesso!",
                        "data": [
                            {
                                "nome_vendedor": "José da Silva",
                                "cpf": "12345678913",
                                "placa_carro": "AAA1234",
                                "data": "2025-07-07",
                                "valor": 250000.45
                            }
                        ]
                    }
                }
            }
        }
    }
)
def show_sales():
    return vendedor.show_sales()

@router.get(
    '/vendas/contagem',
    summary= "Retorna o número de vendas para cada vendedor",
    responses= {
        200: {
            "content": {
                "application/json": {
                    "example": {
                        "status": True,
                        "message": "Vendedores buscados com sucesso!",
                        "data": [
                            {
                                "nome": "José da Silva",
                                "total_vendas": 2
                            }
                        ]
                    }
                }
            }
        }
    }
)
def show_sales_count():
    return vendedor.show_sales_count()

@router.get(
    '/vendas/contagem/{min_vendas}',
    summary= "Retorna os vendedores que possuem o numero minimo de vendas passadas como parâmetro",
    responses= {
        200: {
            "content": {
                "application/json": {
                    "example": {
                        "status": True,
                        "message": "Vendedores buscados com sucesso!",
                        "data": [
                            {
                                "nome": "José da Silva",
                                "total_vendas": 2
                            }
                        ]
                    }
                }
            }
        }
    }
)
def show_min_sales_count(min_vendas: int = Path(
    ...,
    title="Quantidade de Vendas",
    description="Quantidade minima de vendas para os vendedores",
    example=1
)):
    return vendedor.show_min_sales_count(min_vendas)