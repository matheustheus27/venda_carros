from decimal import Decimal
from typing import Annotated
from pydantic import BaseModel, constr, condecimal

class CarroCreate(BaseModel):
    placa: Annotated[str, constr(min_length=7, max_length=7)]
    marca: str
    modelo: str
    ano: int
    cor: str
    quilometragem: Annotated[Decimal, condecimal(max_digits=20, decimal_places=2)]
    preco: Annotated[Decimal, condecimal(max_digits=15, decimal_places=2)]
    status: str
    cnpj_concessionaria: Annotated[str, constr(min_length=14, max_length=14)]

class CarroUpdate(BaseModel):
    marca: str
    modelo: str
    ano: int
    cor: str
    quilometragem: Annotated[Decimal, condecimal(max_digits=20, decimal_places=2)]
    preco: Annotated[Decimal, condecimal(max_digits=15, decimal_places=2)]
    status: str
    cnpj_concessionaria: Annotated[str, constr(min_length=14, max_length=14)]
