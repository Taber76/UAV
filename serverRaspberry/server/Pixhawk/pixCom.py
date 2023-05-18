import serial
from serial.tools import list_ports
import time

# Libreria Drone
from pymavlink import mavutil


######################## Funciones

# Devuelve estado del UAV
def getPixStatus(master):
    globalPosition = master.recv_match(type='GLOBAL_POSITION_INT', blocking=True)
    return {
        'lat': globalPosition.lat,
        'lon': globalPosition.lon,
        'alt': globalPosition.alt,
        'relative_alt': globalPosition.relative_alt,
        'hdg': globalPosition.hdg,
        'vx': globalPosition.vx,
        'vy': globalPosition.vy,
        'vz': globalPosition.vz
    }
        

# Devuelve estado de la batería
def getBatteryStatus(master):
    batteryStatus = master.recv_match(type='BATTERY_STATUS', blocking=True)
    return {
        'voltage': batteryStatus.voltage / 1000.0,  # Convertir de mV a V
        'current': batteryStatus.current / 100.0,  # Convertir de 0.1A a A
        'remaining_capacity': batteryStatus.current_consumed / 1000.0,  # Convertir de mAh a Ah
        'battery_percentage': batteryStatus.battery_remaining
    }


def armPix(master):
    
    armar = master.mav.command_long_encode(
                0, 0,  # Sistema y componente
                mavutil.mavlink.MAV_CMD_COMPONENT_ARM_DISARM,  # Comando de armado
                0,  # Confirmación automática
                1,  # Param1: 1 para armar
                0,  # Param2: Ignorado en el armado
                0,  # Param3: Ignorado en el armado
                0,  # Param4: Ignorado en el armado
                0,  # Param5: Ignorado en el armado
                0,  # Param6: Ignorado en el armado
                0   # Param7: Ignorado en el armado
            )
    print(armar)

    max_wait_time = 10
    start_time = time.time()
    while not armar and time.time() - start_time < max_wait_time:
        time.sleep(1)

    if not armar:
        return ({'status': 'Disarmed'})

    return ({'status': 'Armed'})



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

