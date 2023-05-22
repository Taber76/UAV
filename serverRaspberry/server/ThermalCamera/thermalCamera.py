# Librerias Thermal camera
import time
import board
import busio
import adafruit_mlx90640
import matplotlib.pyplot as plt
import numpy as np


############### FUNCIONESpytho

def getThermalFrame (mlx, frame):
    mlx.getFrame(frame)
    image = (np.reshape(frame, (24,32)))
    return image

# Conexion MLX90640
def connect_thermal_camera():
    try:
        i2c = busio.I2C(board.SCL, board.SDA, frequency=800000)
        mlx = adafruit_mlx90640.MLX90640(i2c)
        print("MLX addr detected on I2C", [hex(i) for i in mlx.serial_number])
        mlx.refresh_rate = adafruit_mlx90640.RefreshRate.REFRESH_2_HZ #2
        thermalFrame = np.zeros((24*32,))
        return mlx, thermalFrame
    except Exception as e:
        print(f'Error al conectar con cámara térmica: {e}')
        return None, None
