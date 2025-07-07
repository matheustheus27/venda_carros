from typing import Optional, Annotated
from pydantic import BaseModel, Field, constr

class ClienteCreate(BaseModel):
    cpf: Annotated[str, constr(min_length=11, max_length=11)] = Field(..., example="12345678900")
    nome: str = Field(..., example="José da Silva")
    telefone: Optional[str] = Field(None, example="3199999999")
    email: str = Field(..., example="jose@teste.com")
    endereco: str = Field(..., example="Rua dos Bobos, 0")

class ClienteUpdate(BaseModel):
    nome: str = Field(..., example="José da Silva")
    telefone: Optional[str] = None, Field(..., example="3199999999")
    email: str = Field(..., example="jose@teste.com")
    endereco: str = Field(..., example="Rua dos Bobos, 0")
