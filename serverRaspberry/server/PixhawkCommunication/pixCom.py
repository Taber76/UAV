def getPixParameters(master):
    # Position Info
    return master.recv_match(type='GLOBAL_POSITION_INT', blocking=True)
        

# Devuelve el puerto en el que está conectado el PixHawk
def pixPort():  
    import serial

    try:
        ser = serial.Serial('/dev/ttyACM0')
        return '/dev/ttyACM0'
    
    except serial.serialutil.SerialException:
        return '/dev/tty/ACM1'

