from typing import Annotated
from pydantic import BaseModel, Field, constr, condecimal
from datetime import date

class VendaCreate(BaseModel):
    cpf_cliente: Annotated[str, constr(min_length=11, max_length=11)] = Field(..., example="12345678900")
    cpf_vendedor: Annotated[str, constr(min_length=11, max_length=11)] = Field(..., example="12345678900")
    placa_carro: Annotated[str, constr(min_length=7, max_length=7)] = Field(..., example="AAA1234")
    cnpj_concessionaria: Annotated[str, constr(min_length=14, max_length=14)] = Field(..., example="12345678900000")
    data: date = Field(..., example="2025-07-07")
    valor: Annotated[float, condecimal(max_digits=20, decimal_places=2)] = Field(..., example=250000.55)
    tipo_pagamento: str = Field(..., example="PIX")
    total_pago: Annotated[float, condecimal(max_digits=20, decimal_places=2)] = Field(..., example=250000.55)

class VendaUpdate(BaseModel):
    valor: Annotated[float, condecimal(max_digits=20, decimal_places=2)] = Field(..., example=250000.55)
    tipo_pagamento: str = Field(..., example="PIX")
    total_pago: Annotated[float, condecimal(max_digits=20, decimal_places=2)] = Field(..., example=250000.55)
