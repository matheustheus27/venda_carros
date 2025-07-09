from fastapi import APIRouter, Path
from models import carro
from schemas.carro import CarroCreate, CarroUpdate

router = APIRouter()

@router.get(
    '/',
    summary= "Retorna a lista de todos os veiculos",
    responses= {
        200: {
            "content": {
                "application/json": {
                    "example": {
                        "status": True,
                        "message": "Carros buscados com sucesso!",
                        "data": [
                            {
                                "placa": "AAA1234",
                                "marca": "Ford",
                                "modelo": "Mustang",
                                "ano": 2020,
                                "cor": "Preto",
                                "quilometragem": 120000.55,
                                "preco": 250000,
                                "status": "Disponivel",
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
    return carro.index()

@router.post(
    '/',
    summary= "Registra um novo veiculo no banco de dados",
    responses= {
        201: {
            "content": {
                "application/json": {
                    "example": {
                        "status": True,
                        "message": "Carro criado com sucesso!",
                    }
                }
            }
        }
    }
)
def create(data: CarroCreate):
    return carro.create(**data.model_dump())

@router.get(
    '/{placa}',
    summary= "Retorna um veiculo pela placa",
    responses= {
        200: {
            "content": {
                "application/json": {
                    "example": {
                        "status": True,
                        "message": "Carro buscado com sucesso!",
                        "data": {
                            "placa": "AAA1234",
                            "marca": "Ford",
                            "modelo": "Mustang",
                            "ano": 2020,
                            "cor": "Preto",
                            "quilometragem": 120000.55,
                            "preco": 250000,
                            "status": "Vendido",
                            "cnpj_concessionaria": "12345678900000"
                        }
                    }
                }
            }
        }
    }
)
def show(placa: str = Path(
    ...,
    title="Placa do veículo",
    description="Placa do carro no formato ABC1234",
    example="AAA1234"
)):
    return carro.show(placa)

@router.put(
    '/{placa}',
    summary= "Atualiza os dados de um veiculo pela placa",
    responses= {
        200: {
            "content": {
                "application/json": {
                    "example": {
                        "status": True,
                        "message": "Carro atualizado com sucesso!"
                    }
                }
            }
        }
    }
)
def update(data: CarroUpdate, placa: str = Path(
    ...,
    title="Placa do veículo",
    description="Placa do carro no formato ABC1234",
    example="AAA1234"
)):
    return carro.update(placa, **data.model_dump())

@router.delete(
    '/{placa}',
    summary= "Remove os dados de um veiculo pela placa",
    responses= {
        200: {
            "content": {
                "application/json": {
                    "example": {
                        "status": True,
                        "message": "Carro deletado com sucesso!"
                    }
                }
            }
        }
    }
)
def delete(placa: str = Path(
    ...,
    title="Placa do veículo",
    description="Placa do carro no formato ABC1234",
    example="AAA1234"
)):
    return carro.delete(placa)

@router.get(
    '/concessionaria/{cnpj_concessionaria}',
    summary= "Retorna a lista de todos os veiculos de uma concessionaria",
    responses= {
        200: {
            "content": {
                "application/json": {
                    "example": {
                        "status": True,
                        "message": "Carros da concessionária 12345678900000 buscados com sucesso!!",
                        "data": [
                            {
                                "placa": "AAA1234",
                                "marca": "Ford",
                                "modelo": "Mustang",
                                "ano": 2020,
                                "cor": "Preto",
                                "quilometragem": 120000.55,
                                "preco": 250000,
                                "status": "Vendido",
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
    return carro.find_by_concessionaria(cnpj_concessionaria)