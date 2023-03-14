def getPixParameters():

    # Import mavutil
    from pymavlink import mavutil

    # Create the connection
    # Need to provide the serial port and baudrate
    master = mavutil.mavlink_connection("/dev/ttyACM1", baud=9600)

    # Espera a que se establezca la conexión
    master.wait_heartbeat()
    print('Vehiculo conectado!')

    # Posicion GPS
    print(master.recv_match(type='GLOBAL_POSITION_INT', blocking=True))
    msg = master.recv_match(type='GLOBAL_POSITION_INT', blocking=True)
        
    return msg



# Devuelve el puerto en el que está conectado el PixHawk
def pixPort():
    
    import serial

    try:
        ser = serial.Serial('/dev/ttyACM0')
        return '/dev/ttyACM0'
    
    except serial.serialutil.SerialException:
        return '/dev/tty/ACM1'
    
