from fastapi import APIRouter
from models import cliente
from schemas.cliente import ClienteCreate, ClienteUpdate

router = APIRouter()

@router.get('/')
def index():
    return cliente.index()

@router.post('/')
def create(data: ClienteCreate):
    return cliente.create(**data.model_dump())

@router.get('/{cpf}')
def show(cpf: str):
    return cliente.show(cpf)

@router.put('/{cpf}')
def update(cpf: str, data: ClienteUpdate):
    return cliente.update(cpf, **data.model_dump())

@router.delete('/{cpf}')
def delete(cpf: str):
    return cliente.delete(cpf)