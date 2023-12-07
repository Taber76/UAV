from flask import jsonify, Blueprint, current_app, request
from flask_cors import cross_origin
import asyncio

from controllers.pixhawkController import *

pixhawkRoutes = Blueprint('pixhawkRoutes', __name__)


# GET mesasage /pix?msg_type=ACK&max_time=10
@cross_origin()
@pixhawkRoutes.route('/pix', methods=['GET'])
async def get_uav_msg_route():
    msg_type = request.args.get('msg_type')
    max_time = int(request.args.get('max_time'))
    try:
        loop = asyncio.get_event_loop()
        result = await loop.run_in_executor(None, get_uav_msg_controller, msg_type, max_time)
        return jsonify(result)
    except Exception as e:
        return jsonify({'error': 'No se pudo conectar con UAV'})


# POST long message to UAV ex: {'message': 'MAV_CMD_NAV_TAKEOFF', 'param1': 15, 'param2': 0, 'param3': 0, 'param4': yaw, 'param5': lat, 'param6': lon, 'param7': alt}
@cross_origin()
@pixhawkRoutes.route('/pix', methods=['POST'])
async def post_uav_msg_route():
    try:
        request_data = request.get_json()
        loop = asyncio.get_event_loop()
        result = await loop.run_in_executor(None, post_uav_msg_controller, request_data)
        # {'response': True, 'message': json_msg} o {'response': False, 'message': 'Timeout'}
        return jsonify(result)
    except Exception as e:
        error_message = str(e)
        return jsonify({'error': 'No se pudo enviar comando a UAV', 'error_message': error_message})

'''
POST MESSAGE TYPES

    Response ex:
    "message": {
        "command": 400,
        "mavpackettype": "COMMAND_ACK",
        "progress": 0,
        "result": 0,
        "result_param2": 0,
        "target_component": 0,
        "target_system": 255
    },
    
    ARM / DISARM
        MAV_CMD_COMPONENT_ARM_DISARM
        1, Arming o 0 -> Disarming
        21196, forced or 0 unforced
        0, 0, 0, 0, 0 Ignored
    
    TAKEOFF
        MAV_CMD_NAV_TAKEOFF
        15, Minimum Pitch angle (degrees)
        0, 0, Ignored
        yaw (degrees), Yaw angle
        lat, lon, alt (m)
    
    LAND
        MAV_CMD_NAV_LAND
        15, Abort landing altitude
        0, Mode landing 0:normal
        0, Ignored
        yaw (degrees), Yaw angle
        lat, lon, alt (m ground level)

    GO TO WAYPOINT
        MAV_CMD_DO_REPOSITON
        10, Speed (m/s)
        0, 0, 0, Ignored
        lat, lon, alt (m)

    SPEED
        MAV_CMD_DO_CHANGE_SPEED
        1, Type of change: 1 for ground speed
        speed (m/s), or -1 no change, -2 return to default
        throttle (%), or -1 no change, -2 return to default
        0, 0, 0, 0 Ignored

    SET NEW HOME
        MAV_CMD_DO_SET_HOME
        0, 1 use current position, 0 use specified location
        0, 0, 0 Ignored
        lat, lon, alt (m)

    MAV_CMD_NAV_CONTINUE_AND_CHANGE_ALT
    MAV_CMD_DO_FOLLOW
    MAV_CMD_NAV_LOITER_UNLIM
    MAV_CMD_NAV_RETURN_TO_LAUNCH
    MAV_CMD_DO_SET_SERVO: Set servo
    MAV_CMD_DO_REPEAT_SERVO: Repeat servo movement
    MAV_CMD_DO_GIMBAL_MANAGER_PITCHYAW: Gimbal manager

master.mav.command_long_send(
master.target_system, master.target_component,
mavutil.mavlink.MAV_CMD_DO_SET_MODE, 0,
217, 3, 0, 0, 0, 0, 0)

88	MAV_MODE_GUIDED_DISARMED	System is allowed to be active, under autonomous control, manual setpoint
216	MAV_MODE_GUIDED_ARMED	System is allowed to be active, under autonomous control, manual setpoint
92	MAV_MODE_AUTO_DISARMED	System is allowed to be active, under autonomous control and navigation (the trajectory is decided onboard and not pre-programmed by waypoints)
220	MAV_MODE_AUTO_ARMED	System is allowed to be active, under autonomous control and navigation (the trajectory is decided onboard and not pre-programmed by waypoints)


GET MESSAGE

- SYS_STATUS
- HEARTBEAT
- GLOBAL_POSITION_INT
- BATTERY_STATUS


'''
