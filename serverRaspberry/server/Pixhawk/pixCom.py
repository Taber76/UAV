import serial
from serial.tools import list_ports

# Libreria Drone
from pymavlink import mavutil


######################## Funciones

# Devuelve estado del UAV
def getPixParameters(master):

    # Position Info
    return master.recv_match(type='GLOBAL_POSITION_INT', blocking=True)
        


# Devuelve el puerto en el que está conectado el PixHawk
def pixPort():
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
    


# Conexion UAV
def connect_uav():
    try:
        master = mavutil.mavlink_connection(pixPort(), baud=9600)
        master.wait_heartbeat()
        print('UAV conectado en puerto '+ pixPort())
        return master
    except Exception as e:
        print(f'Error al conectar con UAV: {e}')
        return None

