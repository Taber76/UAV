from flask import jsonify, Blueprint, current_app
from flask_cors import cross_origin

thermalRoutes = Blueprint('thermalRoutes', __name__)

from ThermalCamera.thermalCamera import getThermalFrame

@cross_origin()
@thermalRoutes.route('/', methods=['GET'])
def get_thermal():
    mlx = current_app.config.get('MLX')
    thermalFrame = current_app.config.get('THERMAL_FRAME')
    if mlx and thermalFrame is not None:
        thermalImageArray = getThermalFrame (mlx, thermalFrame)
        return jsonify({ 'thermalImageArray' : thermalImageArray.tolist()})
    else:
        return jsonify({'error': 'No se pudo conectar con cámara térmica'})
