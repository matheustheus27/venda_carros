from db import get_connection
from utils.responses import response_ok, response_error

def index():
    connection = None
    cursor = None

    try:
        connection = get_connection()
        cursor = connection.cursor(dictionary=True)
        cursor.execute("SELECT * FROM vendedor")

        result = cursor.fetchall()

        return response_ok(
            message= "Vendedores buscados com sucesso!",
            data= result
        )
    except Exception as e:
        return response_error(
            message= "Erro ao buscar os vendedores!",
            error= e
        )
    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()

def create(cpf, nome, email, cnpj_concessionaria, telefone=None):
    connection = None
    cursor = None
    
    try:
        connection = get_connection()

        cursor = connection.cursor()
        cursor.execute(
            "INSERT INTO vendedor (cpf, nome, telefone, email, cnpj_concessionaria) VALUES (%s, %s, %s, %s, %s)",
            (cpf, nome, telefone, email, cnpj_concessionaria)
        )

        connection.commit()

        return response_ok(
            message= "Vendedor criado com sucesso!",
            status_code= 201
        )
    except Exception as e:
        return response_error(
            message= "Erro ao criar o vendedor!",
            error= e
        )
    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()

def show(cpf):
    connection = None
    cursor = None
    
    try:
        connection = get_connection()

        cursor = connection.cursor(dictionary=True)
        cursor.execute(
            "SELECT * FROM vendedor WHERE cpf=%s",
            (cpf,)
        )

        result = cursor.fetchone()

        return response_ok(
            message= "Vendedor buscado com sucesso!",
            data= result
        )
    except Exception as e:
        return response_error(
            message= "Erro ao buscar o vendedor!",
            error= e
        )
    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()

def update(cpf, nome, email, cnpj_concessionaria, telefone=None):
    connection = None
    cursor = None
    
    try:
        connection = get_connection()

        cursor = connection.cursor()
        cursor.execute(
            "UPDATE vendedor set nome=%s, telefone=%s, email=%s, cnpj_concessionaria=%s WHERE cpf = %s",
            (nome, telefone, email, cnpj_concessionaria, cpf)
        )

        connection.commit()

        return response_ok(
            message= "Vendedor atualizado com sucesso!"
        )
    except Exception as e:
        return response_error(
            message= "Erro ao atualizar o vendedor!",
            error= e
        )
    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()

def delete(cpf):
    connection = None
    cursor = None
    
    try:
        connection = get_connection()

        cursor = connection.cursor()
        cursor.execute(
            "DELETE FROM vendedor WHERE cpf=%s",
            (cpf,)
        )

        connection.commit()

        return response_ok(
            message= "Vendedor deletado com sucesso!"
        )
    except Exception as e:
        return response_error(
            message= "Erro ao deletar o vendedor!",
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
            "SELECT * FROM vendedor WHERE cnpj_concessionaria=%s",
            (cnpj_concessionaria,)
        )

        result = cursor.fetchall()

        return response_ok(
            message= f"Vendedores da concessionária {cnpj_concessionaria} buscados com sucesso!",
            data= result
        )
    except Exception as e:
        return response_error(
            message= "Erro ao buscar os vendedores!",
            error= e
        )
    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()

def show_sales():
    connection = None
    cursor = None

    try:
        connection = get_connection()

        cursor = connection.cursor(dictionary=True)
        cursor.execute(
            "SELECT v.nome AS nome_vendedor, v.cpf AS cpf_vendedor, ve.placa_carro, ve.data AS data_venda, ve.valor AS valor_venda " \
            "FROM vendedor v " \
            "LEFT JOIN venda ve ON v.cpf = ve.cpf_vendedor " \
            "ORDER BY v.nome"
        )

        result = cursor.fetchall()

        for venda in result:
            if venda["valor_venda"] is not None:
                venda["valor_venda"] = float(venda["valor_venda"])
            if venda["data_venda"] is not None:
                venda["data_venda"] = venda["data_venda"].isoformat()

        return response_ok(
            message= "Vendas por vendedor buscados com sucesso!",
            data= result
        )
    except Exception as e:
        return response_error(
            message= "Erro ao buscar as vendas por vendedor!",
            error= e
        )
    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()

def show_sales_count():
    connection = None
    cursor = None

    try:
        connection = get_connection()

        cursor = connection.cursor(dictionary=True)
        cursor.execute(
            "SELECT v.nome, COUNT(ve.placa_carro) AS total_vendas " \
            "FROM vendedor v " \
            "LEFT JOIN venda ve ON v.cpf = ve.cpf_vendedor " \
            "GROUP BY v.nome, v.cpf " \
            "ORDER BY v.nome"
        )

        result = cursor.fetchall()

        return response_ok(
            message= "Total de vendas por vendedor buscados com sucesso!",
            data= result
        )
    except Exception as e:
        return response_error(
            message= "Erro ao buscar o total de vendas por vendedor!",
            error= e
        )
    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()

def show_min_sales_count(min_vendas):
    connection = None
    cursor = None

    try:
        connection = get_connection()

        cursor = connection.cursor(dictionary=True)
        cursor.execute(
            "SELECT v.nome, COUNT(ve.placa_carro) AS total_vendas " \
            "FROM vendedor v " \
            "LEFT JOIN venda ve ON v.cpf = ve.cpf_vendedor " \
            "GROUP BY v.nome, v.cpf " \
            "HAVING COUNT(ve.placa_carro) >= %s " \
            "ORDER BY v.nome", (min_vendas,)
        )

        result = cursor.fetchall()

        return response_ok(
            message= "Total de vendas por vendedor buscados com sucesso!",
            data= result
        )
    except Exception as e:
        return response_error(
            message= "Erro ao buscar o total de vendas por vendedor!",
            error= e
        )
    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()