from typing import Annotated
from pydantic import BaseModel, constr, condecimal

class CarroCreate(BaseModel):
    placa: Annotated[str, constr(min_length=7, max_length=7)]
    marca: str
    modelo: str
    ano: int
    cor: str
    quilometragem: Annotated[float, condecimal(max_digits=20, decimal_places=2)]
    preco: Annotated[float, condecimal(max_digits=15, decimal_places=2)]
    status: str
    cnpj_concessionaria: str

class CarroUpdate(BaseModel):
    marca: str
    modelo: str
    ano: int
    cor: str
    quilometragem: Annotated[float, condecimal(max_digits=20, decimal_places=2)]
    preco: Annotated[float, condecimal(max_digits=15, decimal_places=2)]
    status: str
    cnpj_concessionaria: str
