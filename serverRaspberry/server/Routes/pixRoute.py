from flask import jsonify
from flask_cors import cross_origin

from Pixhawk.pixCom import getPixParameters

@cross_origin()
def get_pix(master):
    if master:
        pixParam = getPixParameters(master)
        print(pixParam)
        return jsonify({ 'lat' : pixParam.lat,
                 'lon' : pixParam.lon,
                 'alt' : pixParam.alt,
                 'heading' : pixParam.hdg / 100
                })
    else:
        return jsonify({'error': 'No se pudo conectar con UAV'})
