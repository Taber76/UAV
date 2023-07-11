from helpers.pixhawkHelper import Pixhawk


def get_uav_msg_controller(msgType, maxTime):
  # verificacion valor de variables
  try:
    Pixhawk.get_msg_type(msgType, maxTime)
  except:
    print(f"--> Error get UAV msg {msgType}")
    pass

# Arm UAV -> Arm (arm = 1) / Disarm (arm = 0)
def arm_uav_controller(arm):
  # verificacion valor de arm 
  try:
    Pixhawk.arm(arm)
  except:
    print("--> Error arm/disarm UAV")
    pass

def takeoff_uav_controller(launch_angle, latitude, longitude, altitude):
  # verificacion valor de variables
  try:
    Pixhawk.takeoff(launch_angle, latitude, longitude, altitude)
  except:
    print("--> Error takeoff UAV")
    pass

