from fastapi import APIRouter
from models import concessionaria
from schemas.concessionaria import ConcessionariaCreate, ConcessionariaUpdate

router = APIRouter()

@router.get('/')
def index():
    return concessionaria.index()

@router.post('/')
def create(data: ConcessionariaCreate):
    return concessionaria.create(**data.model_dump())

@router.get('/{cnpj}')
def show(cnpj: str):
    return concessionaria.show(cnpj)

@router.put('/{cnpj}')
def update(cnpj: str, data: ConcessionariaUpdate):
    return concessionaria.update(cnpj, **data.model_dump())

@router.delete('/{cnpj}')
def delete(cnpj: str):
    return concessionaria.delete(cnpj)