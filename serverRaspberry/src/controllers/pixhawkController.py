from helpers.pixhawkHelper import Pixhawk


def get_uav_msg_controller(msgType, maxTime):
    # verificacion valor de variables
    try:
        response = Pixhawk.get_msg_type(msgType, maxTime)
        return response
    except:
        print(f"--> Error get UAV msg {msgType}")
        pass


# Arm UAV -> Arm (arm = 1) / Disarm (arm = 0)
def arm_uav_controller(arm):
    # verificacion valor de arm
    try:
        response = Pixhawk.arm(arm)
        return response
    except:
        print("--> Error arm/disarm UAV")
        pass


def takeoff_uav_controller(launch_angle, latitude, longitude, altitude):
    # verificacion valor de variables
    try:
        response = Pixhawk.takeoff(launch_angle, latitude, longitude, altitude)
        return response
    except:
        print("--> Error takeoff UAV")
        pass


# Go to waypoint
def go_to_waypoint_controller(lat, lon, alt):
    # verificacion valor de variables
    try:
        response = Pixhawk.go_to_waypoint(lat, lon, alt)
        return response
    except:
        print("--> Error go to waypoint")
        pass
