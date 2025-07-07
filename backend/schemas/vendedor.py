from typing import Optional, Annotated
from pydantic import BaseModel, Field, constr, condecimal
from datetime import date

class VendedorCreate(BaseModel):
    cpf: Annotated[str, constr(min_length=11, max_length=11)] = Field(..., example="1234567900")
    nome: str  = Field(..., example="José da Silva")
    telefone: Optional[str] = Field(None, example="3199999999")
    email: str = Field(..., example="jose@teste.com")
    cnpj_concessionaria: Annotated[str, constr(min_length=14, max_length=14)] = Field(..., example="1234567900000")

class VendedorUpdate(BaseModel):
    nome: str  = Field(..., example="José da Silva")
    telefone: Optional[str] = Field(None, example="3199999999")
    email: str = Field(..., example="jose@teste.com")
    cnpj_concessionaria: Annotated[str, constr(min_length=14, max_length=14)] = Field(..., example="1234567900000")