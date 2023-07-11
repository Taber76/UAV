import math
from pymavlink import mavutil

# Class for formating the Mission Item.


class mission_item:
    def __init__(self, current, x, y, z):
        self.seq = 0
        # Use Global Lat y Long for position data
        self.frame = mavutil.mavlink.MAV_FRAME_GLOBAL_RELATIVE_ALT
        self.command = mavutil.mavlink.MAV_CMD_NAV_WAYPOINT        # Move to waypoint
        self.current = current
        self.auto = 1                                              # Autocontinue
        # Hold time: Ignored for fixed wing
        self.param1 = 0
        # Accept radius (m)
        self.param2 = 20
        self.param3 = 20.00                                        # Pass radius
        # Yaw: Ignored for fixed wing
        self.param4 = math.nan
        self.param5 = x                                            # Latitude
        self.param6 = y                                            # Longitude
        self.param7 = z                                            # Altitude
        # The MAV_MISSION_TYPE value for MAV_MISSION_TYPE_MISSION
        self.mission_type = 0

# Arm the UAV


def arm(master):
    print('-- Arming UAV')

    master.mav.command_long_send(
        master.target_system, master.target_component,
        mavutil.mavlink.MAV_CMD_COMPONENT_ARM_DISARM, 0, 1, 0, 0, 0, 0, 0, 0
    )

    ack(master, 'COMMAND_ACK')

# Takeoff the UAV


def takeoff(master):
    print('-- Taking off UAV')

    master.mav.command_long_send(
        master.target_system, master.target_component,
        mavutil.mavlink.MAV_CMD_NAV_TAKEOFF, 0, 0, 0, 0, math.nan, 0, 0, 20
    )

    ack(master, 'COMMAND_ACK')

# Upload mission items to UAV


def upload_mission(master, mission_items):
    n = len(mission_items)
    print('-- Uploading mission')

    master.mav.mission_count_send(
        master.target_system, master.target_component, n, 0)

    ack(master, 'MISSION_REQUEST')

    for waypoint in mission_items:
        print('-- Waypoint: ', waypoint.param5,
              waypoint.param6, waypoint.param7)

        master.mav.mission_item_send(
            master.target_system, master.target_component,
            waypoint.seq, waypoint.frame, waypoint.command, waypoint.current,
            waypoint.auto,               # Autoconinue
            waypoint.param1,             # Hold Time
            waypoint.param2,             # Accept Radius
            waypoint.param3,             # Pass Radius
            waypoint.param4,             # Yaw
            waypoint.param5,             # Local X
            waypoint.param6,             # Local Y
            waypoint.param7,             # Local Z
            waypoint.mission_type        # Mission Type
        )

    if waypoint != mission_items[n-1]:
        ack(master, 'MISSION_REQUEST')

    ack(master, 'MISSION_ACK')

    print('-- Mission uploaded', master.recv_match())

    master.mav.send(master.mav.mission_request_list_encode(
        master.target_system,
        master.target_component))

    waypoints = []
    while True:
        msg = master.recv_match()
        if msg:
            print(msg)
            if msg.get_type() == 'MISSION_ITEM':
                waypoints.append(msg)
            elif msg.get_type() == 'MISSION_COUNT':
                total_waypoints = msg.count
                break

        # Imprimir la lista de waypoints
        for waypoint in waypoints:
            print("Waypoint:", waypoint)


# Send message for the UAV to return to the launch site
def set_return(master):
    print('-- Returning to launch site')

    master.mav.command_long_send(
        master.target_system, master.target_component,
        mavutil.mavlink.MAV_CMD_NAV_RETURN_TO_LAUNCH, 0, 0, 0, 0, 0, 0, 0, 0
    )

    ack(master, 'COMMAND_ACK')

# Start mission


def start_mission(master):
    print('-- Starting mission')

    master.mav.command_long_send(
        master.target_system, master.target_component,
        mavutil.mavlink.MAV_CMD_MISSION_START, 0, 0, 0, 0, 0, 0, 0, 0
    )

    ack(master, 'COMMAND_ACK')
    ack(master, 'MISSION_CURRENT')

# Acknowledge from the UAV


def ack(master, keyword):
    print('-- Acknowledging from UAV: ',
          str(master.recv_match(type=keyword, blocking=True)))


# Main program
if __name__ == '__main__':
    print('-- Starting Pymavlinkex')

    # master = mavutil.mavlink_connection(pixPort(), baud=9600)
    master = mavutil.mavlink_connection('COM4', baud=9600)

    while (master.target_system == 0):
        print('-- Waiting for UAV Heartbeat')
        master.wait_heartbeat()
        print('-- UAV Heartbeat: ', master.target_system, master.target_component)

    mission_waypoints = []

    mission_waypoints.append(mission_item(0, 0.0, 0.0, 0.0))  # Takeoff
    mission_waypoints.append(mission_item(0, 5.0, 0.0, 0.0))  # Waypoint 1
    mission_waypoints.append(mission_item(0, 55.0, 0.0, 0.0))  # Waypoint 2
    mission_waypoints.append(mission_item(0, -55.0, 0.0, 0.0))  # Waypoint 3

    upload_mission(master, mission_waypoints)

    arm(master)

    start_mission(master)

#    for mission_item in mission_waypoints:
#        print('-- Waypoint: ', mission_item.param5,
#              mission_item.param6, mission_item.param7)

    set_return(master)
