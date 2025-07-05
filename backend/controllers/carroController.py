from fastapi import APIRouter
from models import carro
from schemas.carro import CarroCreate, CarroUpdate

router = APIRouter()

@router.get('/')
def index():
    return carro.index()

@router.post('/')
def create(data: CarroCreate):
    return carro.create(**data.model_dump())

@router.get('/{placa}')
def show(placa: str):
    return carro.show(placa)

@router.put('/{placa}')
def update(placa: str, data: CarroUpdate):
    return carro.update(placa, **data.model_dump())

@router.delete('/{placa}')
def delete(placa: str):
    return carro.delete(placa)