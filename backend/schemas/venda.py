from typing import Annotated
from pydantic import BaseModel, constr, condecimal
from datetime import date

class VendaCreate(BaseModel):
    cpf_cliente: Annotated[str, constr(min_length=11, max_length=11)]
    cpf_vendedor: Annotated[str, constr(min_length=11, max_length=11)]
    placa: Annotated[str, constr(min_length=7, max_length=7)]
    data: date
    valor: Annotated[float, condecimal(max_digits=20, decimal_places=2)]
    tipo_pagamento: str
    total_pago: Annotated[float, condecimal(max_digits=20, decimal_places=2)]

class VendaUpdate(BaseModel):
    valor: Annotated[float, condecimal(max_digits=20, decimal_places=2)]
    tipo_pagamento: str
    total_pago: Annotated[float, condecimal(max_digits=20, decimal_places=2)]
