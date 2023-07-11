import serial
from serial.tools import list_ports
import time
import json
import math

# Drone library
from pymavlink import mavutil, mavwp


####################### Classes ########################

class mission_item:
    def __init__(self, current, latitude, longitude, altitude):
        # Sequence: 0 to add to the end
        self.sequence = 0
        # Relative altitude from sea level
        self.frame = mavutil.mavlink.MAV_FRAME_GLOBAL_RELATIVE_ALT
        self.command = mavutil.mavlink.MAV_CMD_NAV_WAYPOINT        # Move to waypoint
        # Current: 0 is not current
        self.current = current
        self.autocontinue = 1                                      # Autocontinue
        # Hold time: Ignored for fixed wing
        self.param1 = 0
        # Accept radius (m)
        self.param2 = 20
        self.param3 = 20.00                                        # Pass radius
        # Yaw: Ignored for fixed wing
        self.param4 = math.nan
        self.param5 = latitude                                     # Latitude
        self.param6 = longitude                                    # Longitude
        # Altitude (m)
        self.param7 = altitude
        # The MAV_MISSION_TYPE value for MAV_MISSION_TYPE_MISSION
        self.mission_type = 0


######################## COMMON FUNCTIONS ########################

# Conexion Pixhawk Port
def pix_port_controller():
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


# Make connection to UAV
def connect_uav_controller():
    try:
        # master = mavutil.mavlink_connection(pixPort(), baud=9600)
        master = mavutil.mavlink_connection('COM4', baud=9600)

        master.wait_heartbeat()
        print('--> UAV connected')
        # print('UAV conectado en puerto '+ pixPort())
        return master
    except Exception as e:
        print(f'Error al conectar con UAV: {e}')
        return None


# Numbers of waypoints
def waypoint_count_controller(master):
    master.mavwp.waypoint_request_list_send(
        master.target_system, master.target_component)

    # i=0
    # while i < 3 :
    msg = master.recv_match('MISSION_COUNT', blocking=True)
    #    if msg:
    print(msg)
    #        i+=1

    return 1
# json.loads(get_pix_msg_type_controller(master, 'MISSION_COUNT', 5)['message'])['count']


########################## CONTROLLERS ########################

# Get number messages
def get_pix_msg_controller(master, number):
    msgcount = 0
    while msgcount < number:
        print(master.recv_match())
        msgcount += 1
    return

# Get message (pix_msg_type)


def get_pix_msg_type_controller(master, pix_msg_type, max_time):
    init_time = time.time()
    while True:
        msg = master.recv_match()
        if msg:
            if msg.get_type() == pix_msg_type:
                msg = msg.to_dict()
                json_msg = json.dumps(msg)
                print('---------------> ', json_msg)  # <---------------------
                return ({'response': True, 'message': json_msg})

            if time.time() - init_time >= max_time:
                return ({'response': False, 'message': 'Timeout'})


# Arm (arm = 1) / Disarm (arm = 0)
def pix_arm_controller(master, arm):
    print('---> UAV send arm: ' + str(arm))
    arm = master.mav.command_long_send(
        0, 0,                                          # System and component ID
        mavutil.mavlink.MAV_CMD_COMPONENT_ARM_DISARM,  # Arming or disarming
        0,                                             # Automatic confirmation
        arm,                                           # Param1: 1 for arming
        0, 0, 0, 0, 0, 0                               # Ignored params for arming
    )
    arm_msg = get_pix_msg_type_controller(master, 'COMMAND_ACK', 10)
    print(arm_msg)
    if arm_msg['response']:
        print('---> UAV armed: ' + str(arm))
        return ({'status': 'Armed'})
    return ({'status': 'Disarmed'})


# Takeoff
def pix_takeoff_controller(master, launch_angle, latitude, longitude, altitude):
    takeoff = master.mav.command_long_send(
        0, 0,                                          # System and component ID
        mavutil.mavlink.MAV_CMD_NAV_TAKEOFF,           # Takeoff
        # Param1: Pitch angle (degrees)
        15,
        0, 0,                                          # Param2 and Param3: Ignored
        # Param4: Yaw angle (degrees)
        launch_angle,
        latitude,                                      # Param5: Latitude
        longitude,                                     # Param6: Longitude
        altitude                                       # Param7: Altitude
    )
    takeoff_msg = get_pix_msg_type_controller(master, 'COMMAND_ACK', 10)

    if takeoff_msg['response']:
        return ({'status': 'Takeoff'})
    return ({'status': 'Takeoff failed'})


# Add waypoint
def add_waypoint_controller(master, latitude, longitude, altitude):
    print('---> Add waypoint')
    new_waypoint = mission_item(0, latitude, longitude, altitude)

    master.mav.waypoint_item_send(
        master.target_system, master.target_component,
        0, new_waypoint.frame, new_waypoint.command,
        new_waypoint.current, new_waypoint.autocontinue,
        new_waypoint.param1,
        new_waypoint.param2,
        new_waypoint.param3,
        new_waypoint.param4,
        new_waypoint.param5,
        new_waypoint.param6,
        new_waypoint.param7,
        new_waypoint.mission_type
    )

    waypoint_msg = get_pix_msg_type_controller(master, 'MISSION_ACK', 5)

    print(waypoint_count_controller(master))

    if waypoint_msg['response']:
        return ({'status': 'Waypoint added'})
    return ({'status': 'Add waypoint failed'})


'''
# last message type recived
try: 
    altitude = master.messages['GPS_RAW_INT'].alt  # Note, you can access message fields as attributes!
    timestamp = master.time_since('GPS_RAW_INT')
except:
    print('No GPS_RAW_INT message received')
'''
