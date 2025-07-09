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