from fastapi import APIRouter
from models import vendedor
from schemas.vendedor import VendedorCreate, VendedorUpdate

router = APIRouter()

@router.get('/')
def index():
    return vendedor.index()

@router.post('/')
def create(data: VendedorCreate):
    return vendedor.create(data)

@router.get('/{cpf}')
def show(cpf: str):
    return vendedor.show(cpf)

@router.put('/{cpf}')
def update(cpf: str, data: VendedorUpdate):
    return vendedor.update(cpf, **data.model_dump())

@router.delete('/{cpf}')
def delete(cpf: str):
    return vendedor.delete(cpf)