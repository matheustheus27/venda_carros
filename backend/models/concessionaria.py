from db import get_connection
from utils.responses import response_ok, response_error

def index():
    connection = None
    cursor = None

    try:
        connection = get_connection()
        cursor = connection.cursor(dictionary=True)
        cursor.execute("SELECT * FROM concessionaria")

        result = cursor.fetchall()

        return response_ok(
            message= "Concessionarias buscadas com sucesso!",
            data= result
        )
    except Exception as e:
        return response_error(
            message= "Erro ao buscar as concessionarias!",
            error= e
        )
    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()

def create(cnpj, nome, endereco, telefone=None):
    connection = None
    cursor = None
    
    try:
        connection = get_connection()

        cursor = connection.cursor()
        cursor.execute(
            "INSERT INTO concessionaria (cnpj, nome, telefone, endereco) VALUES (%s, %s, %s, %s)",
            (cnpj, nome, telefone, endereco)
        )

        connection.commit()

        return response_ok(
            message= "Concessionaria criada com sucesso!",
            status_code= 201
        )
    except Exception as e:
        return response_error(
            message= "Erro ao criar a concessionaria!",
            error= e
        )
    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()

def show(cnpj):
    connection = None
    cursor = None
    
    try:
        connection = get_connection()

        cursor = connection.cursor(dictionary=True)
        cursor.execute(
            "SELECT * FROM concessionaria WHERE cnpj=%s",
            (cnpj,)
        )

        result = cursor.fetchone()

        return response_ok(
            message= "Concessionaria buscada com sucesso!",
            data= result
        )
    except Exception as e:
        return response_error(
            message= "Erro ao buscar a concessionaria!",
            error= e
        )
    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()

def update(cnpj, nome, endereco, telefone=None):
    connection = None
    cursor = None
    
    try:
        connection = get_connection()

        cursor = connection.cursor()
        cursor.execute(
            "UPDATE concessionaria set nome=%s, telefone=%s, endereco=%s WHERE cnpj = %s",
            (nome, telefone, endereco, cnpj)
        )

        connection.commit()

        return response_ok(
            message= "Concessionaria atualizada com sucesso!"
        )
    except Exception as e:
        return response_error(
            message= "Erro ao atualizar a concessionaria!",
            error= e
        )
    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()

def delete(cnpj):
    connection = None
    cursor = None
    
    try:
        connection = get_connection()

        cursor = connection.cursor()
        cursor.execute(
            "DELETE FROM concessionaria WHERE cnpj=%s",
            (cnpj,)
        )

        connection.commit()

        return response_ok(
            message= "Concessionaria deletada com sucesso!"
        )
    except Exception as e:
        return response_error(
            message= "Erro ao deletar a concessionaria!",
            error= str(e)
        )
    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()