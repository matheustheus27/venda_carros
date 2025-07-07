from fastapi import APIRouter, Path
from models import concessionaria
from schemas.concessionaria import ConcessionariaCreate, ConcessionariaUpdate

router = APIRouter()

@router.get(
    '/',
    summary= "Retorna a lista de todas as concessionárias",
    responses= {
        200: {
            "content": {
                "application/json": {
                    "example": {
                        "status": True,
                        "message": "Concessionarias buscados com sucesso!",
                        "data": [
                            {
                               "cnpj": "12345678900000",
                               "nome": "Auto Car BH",
                               "telefone": "3199999999",
                               "endereco": "Alameda dos Anjos, 10"
                            }
                        ]
                    }
                }
            }
        }
    }
)
def index():
    return concessionaria.index()

@router.post(
    '/',
    summary= "Registra uma nova concessionária no banco de dados",
    responses= {
        201: {
            "content": {
                "application/json": {
                    "example": {
                        "status": True,
                        "message": "Concessionaria criado com sucesso!"
                    }
                }
            }
        }
    }
)
def create(data: ConcessionariaCreate):
    return concessionaria.create(**data.model_dump())

@router.get(
    '/{cnpj}',
    summary= "Retorna uma concessionária pelo CNPJ",
    responses= {
        200: {
            "content": {
                "application/json": {
                    "example": {
                       "status": True,
                        "message": "Concessionaria buscada com sucesso!",
                        "data": {
                            "cnpj": "12345678900000",
                            "nome": "Auto Car BH",
                            "telefone": "3199999999",
                            "endereco": "Alameda dos Anjos, 10"
                        }
                    }
                }
            }
        }
    }
)
def show(cnpj: str = Path(
    ...,
    title="CNPJ da concessionária",
    description="CNPJ da concessionária no formato 12345678900000",
    example="12345678900"
)):
    return concessionaria.show(cnpj)

@router.put(
    '/{cnpj}',
    summary= "Atualiza os dados de uma concessionária pelo CNPJ",
    responses= {
        200: {
            "content": {
                "application/json": {
                    "example": {
                        "status": True,
                        "message": "Concessionaria atualizada com sucesso!"
                    }
                }
            }
        }
    }
)
def update(data: ConcessionariaUpdate, cnpj: str = Path(
    ...,
    title="CNPJ da concessionária",
    description="CNPJ da concessionária no formato 12345678900000",
    example="12345678900"
)):
    return concessionaria.update(cnpj, **data.model_dump())

@router.delete(
    '/{cnpj}',
    summary= "Remove os dados de uma concessionária pelo CNPJ",
    responses= {
        200: {
            "content": {
                "application/json": {
                    "example": {
                        "status": True,
                        "message": "Concessionaria deletada com sucesso!"
                    }
                }
            }
        }
    }
)
def delete(cnpj: str = Path(
    ...,
    title="CNPJ da concessionária",
    description="CNPJ da concessionária no formato 12345678900000",
    example="12345678900"
)):
    return concessionaria.delete(cnpj)