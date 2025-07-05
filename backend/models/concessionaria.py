from db import get_connection

def index():
    connection = None
    cursor = None

    try:
        connection = get_connection()
        cursor = connection.cursor(dictionary=True)
        cursor.execute("SELECT * FROM concessionaria")

        result = cursor.fetchall()

        return {
            "status": True,
            "message": "Concessionarias buscados com sucesso!",
            "data": result
        }
    except Exception as e:
        return {
            "status": False,
            "message": "Erro ao buscar os concessionarias!",
            "erro": str(e)
        }
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

        return {
            "status": True,
            "message": "Concessionaria criado com sucesso!"
        }
    except Exception as e:
        return {
            "status": False,
            "message": "Erro ao criar o concessionaria!",
            "erro": str(e)
        }
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

        return {
            "status": True,
            "message": "Concessionaria buscado com sucesso!",
            "data": result
        }
    except Exception as e:
        return {
            "status": False,
            "message": "Erro ao buscar o concessionaria!",
            "erro": str(e)
        }
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

        return {
            "status": True,
            "message": "Concessionaria atualizado com sucesso!"
        }
    except Exception as e:
        return {
            "status": False,
            "message": "Erro ao atualizar o concessionaria!",
            "erro": str(e)
        }
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

        return {
            "status": True,
            "message": "Concessionaria deletado com sucesso!"
        }
    except Exception as e:
        return {
            "status": False,
            "message": "Erro ao deletar o concessionaria!",
            "erro": str(e)
        }
    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()