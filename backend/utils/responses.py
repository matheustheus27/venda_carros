from fastapi.responses import JSONResponse

def response_ok(message: str, data= None, status_code: int = 200):
    return JSONResponse({
        "status": True,
        "message": message,
        "data": data
    }, status_code)

def response_error(message: str, error= None, status_code: int = 400):
    return JSONResponse({
        "status": False,
        "message": message,
        "error": str(error) if error else None
    }, status_code)