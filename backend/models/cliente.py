from db import get_connection

def index():
    connection = None
    cursor = None

    try:
        connection = get_connection()
        cursor = connection.cursor(dictionary=True)
        cursor.execute("SELECT * FROM cliente")

        result = cursor.fetchall()

        return {
            "status": True,
            "message": "Clientes buscados com sucesso!",
            "data": result
        }
    except Exception as e:
        return {
            "status": False,
            "message": "Erro ao buscar os clientes!",
            "erro": str(e)
        }
    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()

def create(cpf, nome, email, endereco, telefone=None):
    connection = None
    cursor = None
    
    try:
        connection = get_connection()

        cursor = connection.cursor()
        cursor.execute(
            "INSERT INTO cliente (cpf, nome, telefone, email, endereco) VALUES (%s, %s, %s, %s, %s)",
            (cpf, nome, telefone, email, endereco)
        )

        connection.commit()

        return {
            "status": True,
            "message": "Cliente criado com sucesso!"
        }
    except Exception as e:
        return {
            "status": False,
            "message": "Erro ao criar o cliente!",
            "erro": str(e)
        }
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
            "SELECT * FROM cliente WHERE cpf=%s",
            (cpf,)
        )

        result = cursor.fetchone()

        return {
            "status": True,
            "message": "Cliente buscado com sucesso!",
            "data": result
        }
    except Exception as e:
        return {
            "status": False,
            "message": "Erro ao buscar o cliente!",
            "erro": str(e)
        }
    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()

def update(cpf, nome, email, endereco, telefone=None):
    connection = None
    cursor = None
    
    try:
        connection = get_connection()

        cursor = connection.cursor()
        cursor.execute(
            "UPDATE cliente set nome=%s, telefone=%s, email=%s, endereco=%s WHERE cpf = %s",
            (nome, telefone, email, endereco, cpf)
        )

        connection.commit()

        return {
            "status": True,
            "message": "Cliente atualizado com sucesso!"
        }
    except Exception as e:
        return {
            "status": False,
            "message": "Erro ao atualizar o cliente!",
            "erro": str(e)
        }
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
            "DELETE FROM cliente WHERE cpf=%s",
            (cpf,)
        )

        connection.commit()

        return {
            "status": True,
            "message": "Cliente deletado com sucesso!"
        }
    except Exception as e:
        return {
            "status": False,
            "message": "Erro ao deletar o cliente!",
            "erro": str(e)
        }
    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()