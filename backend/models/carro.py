from db import get_connection

def index():
    connection = None
    cursor = None

    try:
        connection = get_connection()
        cursor = connection.cursor(dictionary=True)
        cursor.execute("SELECT * FROM carro")

        result = cursor.fetchall()

        return {
            "status": True,
            "message": "Carros buscados com sucesso!",
            "data": result
        }
    except Exception as e:
        return {
            "status": False,
            "message": "Erro ao buscar os carros!",
            "erro": str(e)
        }
    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()

def create(placa, marca, modelo, ano, cor, quilometragem, preco, status, cnpj_concessionaria):
    connection = None
    cursor = None

    try:
        connection = get_connection()

        cursor = connection.cursor()
        cursor.execute(
            "INSERT INTO carro (placa, marca, modelo, ano, cor, quilometragem, preco, status, cnpj_concessionaria) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)",
            (placa, marca, modelo, ano, cor, quilometragem, preco, status, cnpj_concessionaria)
        )

        connection.commit()

        return {
            "status": True,
            "message": "Carro criado com sucesso!"
        }
    except Exception as e:
        return {
            "status": False,
            "message": "Erro ao criar o carro!",
            "erro": str(e)
        }
    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()

def show(placa):
    connection = None
    cursor = None

    try:
        connection = get_connection()

        cursor = connection.cursor(dictionary=True)
        cursor.execute(
            "SELECT * FROM carro WHERE placa=%s",
            (placa,)
        )

        result = cursor.fetchone()

        return {
            "status": True,
            "message": "Carro buscado com sucesso!",
            "data": result
        }
    except Exception as e:
        return {
            "status": False,
            "message": "Erro ao buscar o carro!",
            "erro": str(e)
        }
    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()

def update(placa, marca, modelo, ano, cor, quilometragem, preco, status, cnpj_concessionaria):
    connection = None
    cursor = None

    try:
        connection = get_connection()

        cursor = connection.cursor()
        cursor.execute(
            "UPDATE carro set marca=%s, modelo=%s, ano=%s, cor=%s, quilometragem=%s, preco=%s, status=%s, cnpj_concessionaria=%s WHERE placa = %s",
            (marca, modelo, ano, cor, quilometragem, preco, status, cnpj_concessionaria, placa)
        )

        connection.commit()

        return {
            "status": True,
            "message": "Carro atualizado com sucesso!"
        }
    except Exception as e:
        return {
            "status": False,
            "message": "Erro ao atualizar o carro!",
            "erro": str(e)
        }
    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()

def delete(placa):
    connection = None
    cursor = None

    try:
        connection = get_connection()

        cursor = connection.cursor()
        cursor.execute(
            "DELETE FROM carro WHERE placa=%s",
            (placa,)
        )

        connection.commit()

        return {
            "status": True,
            "message": "Carro deletado com sucesso!"
        }
    except Exception as e:
        return {
            "status": False,
            "message": "Erro ao deletar o carro!",
            "erro": str(e)
        }
    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()