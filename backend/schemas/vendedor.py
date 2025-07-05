from typing import Optional, Annotated
from pydantic import BaseModel, constr, condecimal
from datetime import date

class VendedorCreate(BaseModel):
    cpf: Annotated[str, constr(min_length=11, max_length=11)]
    nome: str
    telefone: Optional[str] = None
    email: str
    cnpj_concessionaria: Annotated[str, constr(min_length=14, max_length=14)]

class VendedorUpdate(BaseModel):
    nome: str
    telefone: Optional[str] = None
    email: str
    cnpj_concessionaria: Annotated[str, constr(min_length=14, max_length=14)]