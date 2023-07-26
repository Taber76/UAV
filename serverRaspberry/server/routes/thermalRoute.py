from controllers.thermalController import *
from flask import jsonify, Blueprint, current_app
from flask_cors import cross_origin

thermalRoutes = Blueprint('thermalRoutes', __name__)


@cross_origin()
@thermalRoutes.route('/thermal', methods=['GET'])
def get_thermal():
    try:
        thermal_image_array = get_frame_controller()
        return jsonify({'thermalImageArray': thermal_image_array.tolist()})
    except Exception as e:
        return jsonify({'error': 'No se pudo conectar con cámara térmica'})
