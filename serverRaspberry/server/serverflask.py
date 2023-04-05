# Librerias server
from flask import Flask, jsonify, request
from flask_cors import cross_origin

import json
import sys
sys.path.append("./PixhawkCommunication")

# Libreria Drone
from pymavlink import mavutil

# Librerias Thermal camera
import time
import board
import busio
import adafruit_mlx90640
import matplotlib.pyplot as plt
import numpy as np

# Librerias propias
from PixhawkCommunication.pixCom import getPixParameters, pixPort 
from ThermalCamera.thermalCamera import getThermalFrame


# ----------------------------------------------------------------
# Crea conexion UAV
master = mavutil.mavlink_connection(pixPort(), baud=9600)

# Espera a que se establezca la conexión
master.wait_heartbeat()
print('UAV conactado en puerto '+ pixPort())

# -----------------------------------------------------------------
# Crea conexion camara termica
i2c = busio.I2C(board.SCL, board.SDA, frequency=800000)

mlx = adafruit_mlx90640.MLX90640(i2c)
print("MLX addr detected on I2C", [hex(i) for i in mlx.serial_number])

# if using higher refresh rates yields a 'too many retries' exception,
# try decreasing this value to work with certain pi/camera combinations
mlx.refresh_rate = adafruit_mlx90640.RefreshRate.REFRESH_2_HZ #2
thermalFrame = np.zeros((24*32,))


# -----------------------------------------------------------------
# SERVIDOR
app = Flask(__name__)


# Manejador de solicitudes
# datos pixhawk
@app.route('/pix', methods=['GET'])
@cross_origin()
def get_pix():
    pixParam = getPixParameters(master)
    print(pixParam)
    return { 'lat' : pixParam.lat,
             'lon' : pixParam.lon,
             'alt' : pixParam.alt,
             'heading' : pixParam.hdg / 100
            }

# captura camara termica
@app.route('/thermal', methods=['GET'])
@cross_origin()
def get_thermal():
    thermalImageArray = getThermalFrame (mlx, thermalFrame)
    return { 'thermalImageArray' : thermalImageArray.tolist()}



# inicio Servidor
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)


