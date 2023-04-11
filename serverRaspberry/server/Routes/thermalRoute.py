from flask import jsonify
from flask_cors import cross_origin

from ThermalCamera.thermalCamera import getThermalFrame

@cross_origin()
def get_thermal(mlx, thermalFrame):
    if mlx and thermalFrame is not None:
        thermalImageArray = getThermalFrame (mlx, thermalFrame)
        return jsonify({ 'thermalImageArray' : thermalImageArray.tolist()})
    else:
        return jsonify({'error': 'No se pudo conectar con cámara térmica'})
