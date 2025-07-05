from typing import Optional, Annotated
from pydantic import BaseModel, constr

class ClienteCreate(BaseModel):
    cpf: Annotated[str, constr(min_length=11, max_length=11)]
    nome: str
    telefone: Optional[str] = None
    email: str
    endereco: str

class ClienteUpdate(BaseModel):
    nome: str
    telefone: Optional[str] = None
    email: str
    endereco: str
