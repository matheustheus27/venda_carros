from db import get_connection
from fastapi.responses import JSONResponse

def index():
    connection = None
    cursor = None

    try:
        connection = get_connection()
        cursor = connection.cursor(dictionary=True)
        cursor.execute("SELECT * FROM concessionaria")

        result = cursor.fetchall()

        return  JSONResponse({
            "status": True,
            "message": "Concessionarias buscados com sucesso!",
            "data": result
        }, 200)
    except Exception as e:
        return  JSONResponse({
            "status": False,
            "message": "Erro ao buscar os concessionarias!",
            "erro": str(e)
        }, 400)
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

        return  JSONResponse({
            "status": True,
            "message": "Concessionaria criado com sucesso!"
        }, 201)
    except Exception as e:
        return  JSONResponse({
            "status": False,
            "message": "Erro ao criar o concessionaria!",
            "erro": str(e)
        }, 400)
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

        return  JSONResponse({
            "status": True,
            "message": "Concessionaria buscado com sucesso!",
            "data": result
        }, 200)
    except Exception as e:
        return  JSONResponse({
            "status": False,
            "message": "Erro ao buscar o concessionaria!",
            "erro": str(e)
        }, 400)
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

        return  JSONResponse({
            "status": True,
            "message": "Concessionaria atualizado com sucesso!"
        }, 200)
    except Exception as e:
        return  JSONResponse({
            "status": False,
            "message": "Erro ao atualizar o concessionaria!",
            "erro": str(e)
        }, 400)
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

        return  JSONResponse({
            "status": True,
            "message": "Concessionaria deletado com sucesso!"
        }, 200)
    except Exception as e:
        return  JSONResponse({
            "status": False,
            "message": "Erro ao deletar o concessionaria!",
            "erro": str(e)
        }, 400)
    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()