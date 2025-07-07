from fastapi import APIRouter, Path
from models import cliente
from schemas.cliente import ClienteCreate, ClienteUpdate

router = APIRouter()

@router.get(
    '/',
    summary= "Retorna a lista de todos os clientes",
    responses= {
        200: {
            "content": {
                "application/json": {
                    "example": {
                        "status": True,
                        "message": "Clientes buscados com sucesso!",
                        "data": [
                            {
                                "cpf": "12345678913",
                                "nome": "José da Silva",
                                "telefone": "3199999999",
                                "email": "jose@teste.com",
                                "endereco": "Rua Jose Augusto, 99, Jose"
                            }
                        ]
                    }
                }
            }
        }
    }
)
def index():
    return cliente.index()

@router.post(
    '/',
    summary= "Registra um novo cliente no banco de dados",
    responses= {
        201: {
            "content": {
                "application/json": {
                    "example": {
                        "status": True,
                        "message": "Cliente criado com sucesso!"
                    }
                }
            }
        }
    }
)
def create(data: ClienteCreate):
    return cliente.create(**data.model_dump())

@router.get(
    '/{cpf}',
    summary= "Retorna um cliente pelo CPF",
    responses= {
        200: {
            "content": {
                "application/json": {
                    "example": {
                        "status": True,
                        "message": "Cliente buscado com sucesso!",
                        "data": {
                            "cpf": "12345678913",
                            "nome": "Jose da Silva",
                            "telefone": "3199999999",
                            "email": "jose@teste.com",
                            "endereco": "Rua Jose Augusto, 99, Jose"
                        }
                    }
                }
            }
        }
    }
)
def show(cpf: str = Path(
    ...,
    title="CPF do cliente",
    description="CPF do cliente no formato 12345678900",
    example="12345678900"
)):
    return cliente.show(cpf)

@router.put(
    '/{cpf}',
    summary= "Atualiza os dados de um cliente pelo CPF",
    responses= {
        200: {
            "content": {
                "application/json": {
                    "example": {
                        "status": True,
                        "message": "Cliente atualizado com sucesso!"
                    }
                }
            }
        }
    }
)
def update(data: ClienteUpdate, cpf: str = Path(
    ...,
    title="CPF do cliente",
    description="CPF do cliente no formato 12345678900",
    example="12345678900"
)):
    return cliente.update(cpf, **data.model_dump())

@router.delete(
    '/{cpf}',
    summary= "Remove os dados de um cliente pelo CPF",
    responses= {
        200: {
            "content": {
                "application/json": {
                    "example": {
                        "status": True,
                        "message": "Cliente deletado com sucesso!"
                    }
                }
            }
        }
    }
)
def delete(cpf: str = Path(
    ...,
    title="CPF do cliente",
    description="CPF do cliente no formato 12345678900",
    example="12345678900"
)):
    return cliente.delete(cpf)