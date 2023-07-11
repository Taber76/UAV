import serial
from serial.tools import list_ports

from pymavlink import mavutil

def getUavPort():
    ports = list_ports.comports()
    for port in ports:
        if 'Pixhawk1' in port.description:
            try:
                ser = serial.Serial(port.device)
                ser.close()
                return port.device
            except (OSError, serial.SerialException):
                pass
    return None

isConnected = False

def connectToUav():
    global isConnected
    if not isConnected:
      try:
    # master = mavutil.mavlink_connection(pixPort(), baud=9600) # Raspberry <-> UAV
        master = mavutil.mavlink_connection('COM4', baud=9600)      # PC <-> UAV
        master.wait_heartbeat()
        print('--> UAV connected')
      # print('UAV conectado en puerto '+ pixPort())
        isConnected = True
        return master
      except Exception as e:
        print(f'Error al conectar con UAV: {e}')
        return None