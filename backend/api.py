from fastapi import APIRouter
from controllers import carroController, clienteController, concessionariaController, vendaController, vendedorController

router = APIRouter();

router.include_router(carroController.router, prefix="/carros", tags=["Carros"])
router.include_router(clienteController.router, prefix="/clientes", tags=["Clientes"])
router.include_router(concessionariaController.router, prefix="/concessionarias", tags=["Concessionarias"])
router.include_router(vendaController.router, prefix="/vendas", tags=["Vendas"])
router.include_router(vendedorController.router, prefix="/vendedores", tags=["Vendedores"])