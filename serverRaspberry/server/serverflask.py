# Librerias server
from flask import Flask, jsonify, request
from flask_cors import cross_origin

import sys
sys.path.append("../rasp_pixhawk")

# Libreria Drone
from pymavlink import mavutil

# Librerias propias
from pixCom import getPixParameters, getPixOneParameter, pixPort 


# ----------------------------------------------------------------
# Crea conexion
master = mavutil.mavlink_connection(pixPort(), baud=9600)

# Espera a que se establezca la conexión
master.wait_heartbeat()


# SERVIDOR
app = Flask(__name__)


# Manejador de solicitudes
@app.route('/', methods=['GET'])
@cross_origin()
def do_GET():
    pixParam = getPixParameters()
    return { 'lat' : pixParam.lat,
             'lon' : pixParam.lon,
             'alt' : pixParam.alt,
             'heading' : pixParam.hdg / 100
            }


@app.route('/put', methods=['PUT'])
def do_PUT():
    print('Solicitud PUT')
    return 'Put'


# inicio Servidor
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)

