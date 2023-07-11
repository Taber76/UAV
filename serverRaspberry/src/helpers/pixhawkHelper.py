import time
import json
from pymavlink import mavutil

from config.connectToUav import connectToUav

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
                print('---------------> ', json_msg)  # <---------------------
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
        0, 0,                                          # System and component ID
        mavutil.mavlink.MAV_CMD_NAV_TAKEOFF,           # Takeoff
        15,                                            # Param1: Pitch angle (degrees)
        0, 0,                                          # Param2 and Param3: Ignored
        launch_angle,                                  # Param4: Yaw angle (degrees)
        latitude,                                      # Param5: Latitude
        longitude,                                     # Param6: Longitude
        altitude                                       # Param7: Altitude
    )
    takeoff_msg = self.get_msg_type('COMMAND_ACK', 10)
    if takeoff_msg['response']:
        return ({'status': 'Takeoff'})
    return ({'status': 'Takeoff failed'})


master = connectToUav()
Pixhawk = pixhawk(master)

