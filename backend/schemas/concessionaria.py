from typing import Optional, Annotated
from pydantic import BaseModel, Field, constr

class ConcessionariaCreate(BaseModel):
    cnpj: Annotated[str, constr(min_length=14, max_length=14)] = Field(..., example="12345678900000")
    nome: str = Field(..., example="Auto Car BH")
    telefone: Optional[str] = Field(None, example="3199999999")
    endereco: str = Field(..., example="Alameda dos Anjos, 10")

class ConcessionariaUpdate(BaseModel):
    nome: str = Field(..., example="Auto Car BH")
    telefone: Optional[str] = Field(None, example="3199999999")
    endereco: str = Field(..., example="Alameda dos Anjos, 10")
