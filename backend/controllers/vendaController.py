from fastapi import APIRouter
from datetime import date
from models import venda
from schemas.venda import VendaCreate, VendaUpdate

router = APIRouter()

@router.get('/')
def index():
    return venda.index()

@router.post('/')
def create(data: VendaCreate):
    return venda.create(data)

@router.get('/{cpf_vendedor}/{cpf_cliente}/{placa}/{data_venda}')
def show(cpf_vendedor: str, cpf_cliente: str, placa: str, data_venda: date):
    return venda.show(cpf_vendedor, cpf_cliente, placa, data_venda)

@router.put('/{cpf_vendedor}/{cpf_cliente}/{placa}/{data_venda}')
def update(cpf_vendedor: str, cpf_cliente: str, placa: str, data_venda, data: VendaUpdate):
    return venda.update(cpf_vendedor, cpf_cliente, placa, data_venda, **data.model_dump())

@router.delete('/{cpf_vendedor}/{cpf_cliente}/{placa}/{data_venda}')
def delete(cpf_vendedor: str, cpf_cliente: str, placa: str, data_venda: date):
    return venda.delete(cpf_vendedor, cpf_cliente, placa, data_venda)

@router.get('/vendedor/{cpf_vendedor}')
def find_by_vendedor(cpf_vendedor: str):
    return venda.find_by_vendedor(cpf_vendedor)

@router.get('/cliente/{cpf_cliente}')
def find_by_cliente(cpf_cliente: str):
    return venda.find_by_cliente(cpf_cliente)