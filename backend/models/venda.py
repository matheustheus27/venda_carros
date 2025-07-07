from db import get_connection
from fastapi.responses import JSONResponse

def index():
    connection = None
    cursor = None

    try:
        connection = get_connection()
        cursor = connection.cursor(dictionary=True)
        cursor.execute("SELECT * FROM venda")

        result = cursor.fetchall()

        return  JSONResponse({
            "status": True,
            "message": "Vendas buscadas com sucesso!",
            "data": result
        }, 200)
    except Exception as e:
        return  JSONResponse({
            "status": False,
            "message": "Erro ao buscar as vendas!",
            "erro": str(e)
        }, 400)
    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()

def create(cpf_cliente, cpf_vendedor, placa_carro, cnpj_concessionaria, data, valor, tipo_pagamento, total_pago):
    connection = None
    cursor = None
    
    try:
        connection = get_connection()

        cursor = connection.cursor()
        cursor.execute(
            "INSERT INTO venda (cpf_cliente, cpf_vendedor, placa_carro, cnpj_concessionaria, data, valor, tipo_pagamento, total_pago) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)",
            (cpf_cliente, cpf_vendedor, placa_carro, cnpj_concessionaria, data, valor, tipo_pagamento, total_pago)
        )

        connection.commit()

        return  JSONResponse({
            "status": True,
            "message": "Venda criada com sucesso!"
        }, 201)
    except Exception as e:
        return  JSONResponse({
            "status": False,
            "message": "Erro ao criar a venda!",
            "erro": str(e)
        }, 400)
    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()

def show(cpf_cliente, cpf_vendedor, placa_carro, cnpj_concessionaria, data):
    connection = None
    cursor = None
    
    try:
        connection = get_connection()

        cursor = connection.cursor(dictionary=True)
        cursor.execute(
            "SELECT * FROM venda WHERE cpf_cliente=%s AND cpf_vendedor=%s AND placa_carro=%s AND cnpj_concessionaria=%s AND data=%s",
            (cpf_cliente, cpf_vendedor, placa_carro, cnpj_concessionaria, data)
        )

        result = cursor.fetchone()

        return  JSONResponse({
            "status": True,
            "message": "Venda buscada com sucesso!",
            "data": result
        }, 200)
    except Exception as e:
        return  JSONResponse({
            "status": False,
            "message": "Erro ao buscar a venda!",
            "erro": str(e)
        }, 400)
    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()

def update(cpf_cliente, cpf_vendedor, placa_carro, cnpj_concessionaria, data, valor, tipo_pagamento, total_pago):
    connection = None
    cursor = None
    
    try:
        connection = get_connection()

        cursor = connection.cursor()
        cursor.execute(
            "UPDATE venda set valor=%s, tipo_pagamento=%s, total_pago=%s WHERE cpf_cliente=%s AND cpf_vendedor=%s AND placa_carro=%s AND cnpj_concessionaria=%s AND data=%s",
            (valor, tipo_pagamento, total_pago, cpf_cliente, cpf_vendedor, placa_carro, cnpj_concessionaria, data)
        )

        connection.commit()

        return  JSONResponse({
            "status": True,
            "message": "Venda atualizada com sucesso!"
        }, 200)
    except Exception as e:
        return  JSONResponse({
            "status": False,
            "message": "Erro ao atualizar a venda!",
            "erro": str(e)
        }, 400)
    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()

def delete(cpf_cliente, cpf_vendedor, placa_carro, cnpj_concessionaria, data):
    connection = None
    cursor = None
    
    try:
        connection = get_connection()

        cursor = connection.cursor()
        cursor.execute(
            "DELETE FROM venda WHERE cpf_cliente=%s AND cpf_vendedor=%s AND placa_carro=%s AND cnpj_concessionaria=%s AND data=%s",
            (cpf_cliente, cpf_vendedor, placa_carro, cnpj_concessionaria, data)
        )

        connection.commit()

        return  JSONResponse({
            "status": True,
            "message": "Venda deletada com sucesso!"
        }, 200)
    except Exception as e:
        return  JSONResponse({
            "status": False,
            "message": "Erro ao deletar a venda!",
            "erro": str(e)
        }, 400)
    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()

def find_by_vendedor(cpf_vendedor):
    connection = None
    cursor = None
    
    try:
        connection = get_connection()

        cursor = connection.cursor(dictionary=True)
        cursor.execute(
            "SELECT * FROM venda WHERE cpf_vendedor=%s",
            (cpf_vendedor,)
        )

        result = cursor.fetchall()

        return  JSONResponse({
            "status": True,
            "message": f"Vendas do vendedor {cpf_vendedor} buscadas com sucesso!",
            "data": result
        }, 200)
    except Exception as e:
        return  JSONResponse({
            "status": False,
            "message": "Erro ao buscar as vendas!",
            "erro": str(e)
        }, 400)
    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()

def find_by_cliente(cpf_cliente):
    connection = None
    cursor = None
    
    try:
        connection = get_connection()

        cursor = connection.cursor(dictionary=True)
        cursor.execute(
            "SELECT * FROM venda WHERE cpf_cliente=%s",
            (cpf_cliente,)
        )

        result = cursor.fetchall()

        return  JSONResponse({
            "status": True,
            "message": f"Vendas para o cliente {cpf_cliente} buscadas com sucesso!",
            "data": result
        }, 200)
    except Exception as e:
        return  JSONResponse({
            "status": False,
            "message": "Erro ao buscar as vendas!",
            "erro": str(e)
        }, 400)
    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()

def find_by_concessionaria(cnpj_concessionaria):
    connection = None
    cursor = None
    
    try:
        connection = get_connection()

        cursor = connection.cursor(dictionary=True)
        cursor.execute(
            "SELECT * FROM venda WHERE cnpj_concessionaria=%s",
            (cnpj_concessionaria,)
        )

        result = cursor.fetchall()

        return  JSONResponse({
            "status": True,
            "message": f"Vendas da concessionária {cnpj_concessionaria} buscadas com sucesso!",
            "data": result
        }, 200)
    except Exception as e:
        return  JSONResponse({
            "status": False,
            "message": "Erro ao buscar as vendas!",
            "erro": str(e)
        }, 400)
    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()