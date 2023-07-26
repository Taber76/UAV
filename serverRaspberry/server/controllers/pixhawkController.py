from helpers.pixhawkHelper import Pixhawk


def get_uav_msg_controller(msgType, maxTime):
    # verificacion valor de variables
    try:
        response = Pixhawk.get_msg_type(msgType, maxTime)
        return response
    except:
        print(f"--> Error get UAV msg {msgType}")
        pass


def post_uav_msg_controller(request_data):
    param1 = int(request_data['param1'])
    param2 = int(request_data['param2'])
    param3 = int(request_data['param3'])
    param4 = int(request_data['param4'])
    param5 = int(request_data['param5'])
    param6 = int(request_data['param6'])
    param7 = int(request_data['param7'])
    command = Pixhawk.get_message(
        request_data['message'], param1, param2, param3, param4, param5, param6, param7)
    return command


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
