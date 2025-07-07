from decimal import Decimal
from typing import Annotated
from pydantic import BaseModel, Field, constr, condecimal

class CarroCreate(BaseModel):
    placa: Annotated[str, constr(min_length=7, max_length=7)] = Field(..., example="AAA1234")
    marca: str = Field(..., example="Ford")
    modelo: str = Field(..., example="Mustang")
    ano: int = Field(..., example=2020)
    cor: str = Field(..., example="Preto")
    quilometragem: Annotated[Decimal, condecimal(max_digits=20, decimal_places=2)] = Field(..., example=120000.55)
    preco: Annotated[Decimal, condecimal(max_digits=15, decimal_places=2)] = Field(..., example=250000)
    status: str = Field(..., example="Vendido")
    cnpj_concessionaria: Annotated[str, constr(min_length=14, max_length=14)] = Field(..., example="12345678900000")

class CarroUpdate(BaseModel):
    marca: str = Field(..., example="Ford")
    modelo: str = Field(..., example="Mustang")
    ano: int = Field(..., example=2020)
    cor: str = Field(..., example="Preto")
    quilometragem: Annotated[Decimal, condecimal(max_digits=20, decimal_places=2)] = Field(..., example=120000.55)
    preco: Annotated[Decimal, condecimal(max_digits=15, decimal_places=2)] = Field(..., example=250000)
    status: str = Field(..., example="Vendido")
    cnpj_concessionaria: Annotated[str, constr(min_length=14, max_length=14)] = Field(..., example="12345678900000")
