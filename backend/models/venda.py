from db import get_connection
from utils.responses import response_ok, response_error

def index():
    connection = None
    cursor = None

    try:
        connection = get_connection()
        cursor = connection.cursor(dictionary=True)
        cursor.execute("SELECT * FROM venda")

        result = cursor.fetchall()

        for venda in result:
            venda["valor"] = float(venda["valor"])
            venda["total_pago"] = float(venda["total_pago"])
            venda["data"] = venda["data"].isoformat()

        return response_ok(
            message= "Vendas buscadas com sucesso!",
            data= result
        )
    except Exception as e:
        return response_error(
            message= "Erro ao buscar as vendas!",
            error= e
        )
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

        return response_ok(
            message= "Venda criada com sucesso!",
            status_code=201
        )
    except Exception as e:
        return response_error(
            message= "Erro ao criar a venda!",
            error= e
        )
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

        result["valor"] = float(result["valor"])
        result["total_pago"] = float(result["total_pago"])
        result["data"] = result["data"].isoformat()

        return response_ok(
            message= "Venda buscada com sucesso!",
            data= result
        )
    except Exception as e:
        return response_error(
            message= "Erro ao buscar a venda!",
            error= e
        )
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

        return response_ok(
            message= "Venda atualizada com sucesso!"
        )
    except Exception as e:
        return response_error(
            message= "Erro ao atualizar a venda!",
            error= e
        )
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

        return response_ok(
            message= "Venda deletada com sucesso!"
        )
    except Exception as e:
        return response_error(
            message= "Erro ao deletar a venda!",
            error= e
        )
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

        for venda in result:
            venda["valor"] = float(venda["valor"])
            venda["total_pago"] = float(venda["total_pago"])
            venda["data"] = venda["data"].isoformat()

        return response_ok(
            message= f"Vendas do vendedor {cpf_vendedor} buscadas com sucesso!",
            data= result
        )
    except Exception as e:
        return response_error(
            message= "Erro ao buscar as vendas!",
            error= e
        )
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

        for venda in result:
            venda["valor"] = float(venda["valor"])
            venda["total_pago"] = float(venda["total_pago"])
            venda["data"] = venda["data"].isoformat()

        return response_ok(
            message= f"Vendas para o cliente {cpf_cliente} buscadas com sucesso!",
            data= result
        )
    except Exception as e:
        return response_error(
            message= "Erro ao buscar as vendas!",
            error= e
        )
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

        for venda in result:
            venda["valor"] = float(venda["valor"])
            venda["total_pago"] = float(venda["total_pago"])
            venda["data"] = venda["data"].isoformat()

        return  response_ok(
            message= f"Vendas da concessionária {cnpj_concessionaria} buscadas com sucesso!",
            data= result
        )
    except Exception as e:
        return response_error(
            message= "Erro ao buscar as vendas!",
            error= e
        )
    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()

def show_details():
    connection = None
    cursor = None
    
    try:
        connection = get_connection()

        cursor = connection.cursor(dictionary=True)
        cursor.execute(
            "SELECT v.data, ca.modelo AS carro_modelo, cl.nome AS cliente_nome, ve.nome AS vendedor_nome, co.nome AS concessionaria_nome, v.valor " \
            "FROM venda v " \
            "INNER JOIN carro ca ON v.placa_carro = ca.placa " \
            "INNER JOIN cliente cl ON v.cpf_cliente = cl.cpf " \
            "INNER JOIN vendedor ve ON v.cpf_vendedor = ve.cpf " \
            "INNER JOIN concessionaria co ON v.cnpj_concessionaria = co.cnpj"
        )

        result = cursor.fetchall()

        for venda in result:
            venda["valor"] = float(venda["valor"])
            venda["data"] = venda["data"].isoformat()

        return  response_ok(
            message= "Detalhes de vendas buscados com sucesso!",
            data= result
        )
    except Exception as e:
        return response_error(
            message= "Erro ao buscar os detalhes de vendas!",
            error= e
        )
    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()

def show_above_avg_sales():
    connection = None
    cursor = None
    
    try:
        connection = get_connection()

        cursor = connection.cursor(dictionary=True)
        cursor.execute(
            "SELECT cl.nome AS cliente_nome, ca.modelo AS carro_modelo, ca.preco " \
            "FROM venda v " \
            "JOIN carro ca ON v.placa_carro = ca.placa " \
            "JOIN cliente cl ON v.cpf_cliente = cl.cpf " \
            "WHERE ca.preco > (SELECT AVG(preco) FROM carro)"
        )

        result = cursor.fetchall()

        for venda in result:
            venda["preco"] = float(venda["preco"])

        return  response_ok(
            message= "Vendas com preço acima da media buscadas com sucesso!",
            data= result
        )
    except Exception as e:
        return response_error(
            message= "Erro ao buscar as vendas!",
            error= e
        )
    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()