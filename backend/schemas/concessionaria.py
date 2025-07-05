from typing import Optional, Annotated
from pydantic import BaseModel, constr

class ConcessionariaCreate(BaseModel):
    cnpj: Annotated[str, constr(min_length=14, max_length=14)]
    nome: str
    telefone: Optional[str] = None
    endereco: str

class ConcessionariaUpdate(BaseModel):
    nome: str
    nome: str
    telefone: Optional[str] = None
    endereco: str
