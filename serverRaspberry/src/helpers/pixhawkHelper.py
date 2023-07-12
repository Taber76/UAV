import time
import json
from pymavlink import mavutil

from config.connectToUav import connect_to_uav


class pixhawk(object):
    def __init__(self, master):
        self.master = master

    def __del__(self):
        self.master.close()

    def get_msg_type(self, msgType, maxTime):
        init_time = time.time()
        while True:
            msg = self.master.recv_match()
            if msg:
                if msg.get_type() == msgType:
                    msg = msg.to_dict()
                    json_msg = json.dumps(msg)
                    # <---------------------
                    print('---------------> ', json_msg)
                    return ({'response': True, 'message': json_msg})
                if time.time() - init_time >= maxTime:
                    return ({'response': False, 'message': 'Timeout'})

    # Arm (arm = 1) / Disarm (arm = 0)
    def arm(self, arm):
        print('---> UAV send arm: ' + str(arm))
        arm = self.master.mav.command_long_send(
            0, 0,                                          # System and component ID
            mavutil.mavlink.MAV_CMD_COMPONENT_ARM_DISARM,  # Arming or disarming
            0,                                             # Automatic confirmation
            arm,                                           # Param1: 1 for arming
            0, 0, 0, 0, 0, 0                               # Ignored params for arming
        )
        arm_msg = self.get_msg_type('COMMAND_ACK', 10)
        print(arm_msg)
        if arm_msg['response']:
            print('---> UAV armed: ' + str(arm))
            return ({'status': 'Armed'})
        return ({'status': 'Disarmed'})

    # Takeoff
    def takeoff(self, launch_angle, latitude, longitude, altitude):
        self.master.mav.command_long_send(
            0, 0,                                         # System and component ID
            mavutil.mavlink.MAV_CMD_NAV_TAKEOFF,          # Takeoff
            # Param1: Pitch angle (degrees)
            15,
            0, 0,                                         # Param2 and Param3: Ignored
            # Param4: Yaw angle (degrees)
            launch_angle,
            latitude,                                     # Param5: Latitude
            longitude,                                    # Param6: Longitude
            altitude                                      # Param7: Altitude
        )
        takeoff_msg = self.get_msg_type('COMMAND_ACK', 10)
        if takeoff_msg['response']:
            return ({'status': 'Takeoff'})
        return ({'status': 'Takeoff failed'})

    # Go to waypoint
    def go_to_waypoint(self, lat, lon, alt):
        self.master.mav.command_long_send(
            0, 0,                                        # System and component ID
            mavutil.mavlink.MAV_CMD_NAV_WAYPOINT,        # Waypoint
            0,                                           # Param1: Ignored
            0, 0,                                        # Param2 and Param3: Ignored
            0,                                           # Param4: Ignored
            lat,                                         # Param5: Latitude
            lon,                                         # Param6: Longitude
            alt                                          # Param7: Altitude
        )
        go_to_waypoint_msg = self.get_msg_type('COMMAND_ACK', 10)
        if go_to_waypoint_msg['response']:
            return ({'status': 'Go to waypoint'})
        return ({'status': 'Go to waypoint failed'})

    # Return to launch point
    def return_to_launch_point(self):
        self.master.mav.command_long_send(
            0, 0,                                         # System and component ID
            mavutil.mavlink.MAV_CMD_NAV_RETURN_TO_LAUNCH,  # Return to launch point
            0,                                             # Param1: Ignored
            0, 0, 0, 0, 0, 0                               # Ignored params
        )
        return_to_launch_point_msg = self.get_msg_type('COMMAND_ACK', 10)
        if return_to_launch_point_msg['response']:
            return ({'status': 'Return to launch point'})
        return ({'status': 'Return to launch point failed'})


# Declare Pixhawk's class instance
master = connect_to_uav()
Pixhawk = pixhawk(master)


'''
COMANDOS
7 params each:
example: master.mav.command_long_send(
            master.target_system, master.target_component,
            mavutil.mavlink.MAV_CMD_NAV_RETURN_TO_LAUNCH, -------> command
            0,                                            -------> 0 first confirmation
            0, 0, 0, 0, 0, 0, 0                           -------> params
        )

    MAV_CMD_NAV_WAYPOINT: Navigate to the specified position
    MAV_CMD_NAV_LOITER_UNLIM: Loiter at the specified location for an unlimited amount of time
    MAV_CMD_NAV_RETURN_TO_LAUNCH: Return to launch or nearest rally point
    MAV_CMD_JUMP_TAG: Jump to location 1 to 65535
    MAV_CMD_DO_CHANGE_SPEED: Change the speed
    MAV_CMD_DO_SET_HOME: Set home
    MAV_CMD_DO_SET_SERVO: Set servo
    MAV_CMD_DO_REPEAT_SERVO: Repeat servo movement
    MAV_CMD_DO_GIMBAL_MANAGER_PITCHYAW: Gimbal manager
    MAV_CMD_MISSION_START (300 ): Empezar a ejecutar una misión
    MAV_CMD_DO_SET_MISSION_CURRENT (224 ):Establezca el elemento de misión con el número de secuencia seq como el elemento actual y emita MISSION_CURRENT (independientemente de si el número de misión cambió o no).

    
MENSAJES
example: master.recv_match() recibir

master.mav.send(message)

'''
