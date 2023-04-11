import serial
from serial.tools import list_ports
from time import sleep


######################## Funciones
  
# Devuelve el puerto en el que está conectado el Sim7600
def sim7600Port():
    ports = list_ports.comports()
    for port in ports:
        if 'SimTech' in port.description:
            try:
                ser = serial.Serial(port.device)
                ser.close()
                return port.device
            except (OSError, serial.SerialException):
                pass
    return None
    
    
# pureba sim
def connect_sim():
    try:
        print('intentando en: ', sim7600Port())
        ser = serial.Serial('/dev/ttyUSB2', 115200, timeout=0.5) 
        ser.write(b'ATI\r')
        print('write hecho')
        response = ser.read(64)
        print(response.decode('utf-8'))
        ser.close()
        return 
    except Exception as e:
        print(f'Error al conectar con Sim7600: {e}')
        return None

#connect_sim()
