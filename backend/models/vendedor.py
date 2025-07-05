from db import get_connection

def index():
    connection = None
    cursor = None

    try:
        connection = get_connection()
        cursor = connection.cursor(dictionary=True)
        cursor.execute("SELECT * FROM vendedor")

        result = cursor.fetchall()

        return {
            "status": True,
            "message": "Vendedores buscados com sucesso!",
            "data": result
        }
    except Exception as e:
        return {
            "status": False,
            "message": "Erro ao buscar os vendedores!",
            "erro": str(e)
        }
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

        return {
            "status": True,
            "message": "Vendedor criado com sucesso!"
        }
    except Exception as e:
        return {
            "status": False,
            "message": "Erro ao criar o vendedor!",
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
            "SELECT * FROM vendedor WHERE cpf=%s",
            (cpf,)
        )

        result = cursor.fetchone()

        return {
            "status": True,
            "message": "Vendedor buscado com sucesso!",
            "data": result
        }
    except Exception as e:
        return {
            "status": False,
            "message": "Erro ao buscar o vendedor!",
            "erro": str(e)
        }
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

        return {
            "status": True,
            "message": "Vendedor atualizado com sucesso!"
        }
    except Exception as e:
        return {
            "status": False,
            "message": "Erro ao atualizar o vendedor!",
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
            "DELETE FROM vendedor WHERE cpf=%s",
            (cpf,)
        )

        connection.commit()

        return {
            "status": True,
            "message": "Vendedor deletado com sucesso!"
        }
    except Exception as e:
        return {
            "status": False,
            "message": "Erro ao deletar o vendedor!",
            "erro": str(e)
        }
    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()