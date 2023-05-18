from flask import jsonify, Blueprint, current_app
from flask_cors import cross_origin

from Pixhawk.pixCom import getPixStatus, getBatteryStatus, armPix 


pixhawkRoutes = Blueprint('pixhawkRoutes', __name__)

@cross_origin()
@pixhawkRoutes.route('/position', methods=['GET'])
def get_pix():
    master = current_app.config.get('MASTER')
    if master:
        return jsonify(getPixStatus(master))
    else:
        return jsonify({'error': 'No se pudo conectar con UAV'})


@cross_origin()
@pixhawkRoutes.route('/battery', methods=['GET'])
def get_battery():
    master = current_app.config.get('MASTER')
    if master:
        return jsonify(getBatteryStatus(master))
    else:
        return jsonify({'error': 'No se pudo conectar con UAV'})


@cross_origin()
@pixhawkRoutes.route('/arm', methods=['PUT'])
def arm():
    master = current_app.config.get('MASTER')
    if master:
        return jsonify(armPix(master))
    else:
        return jsonify({'error': 'No se pudo armar UAV'})