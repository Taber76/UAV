from flask import jsonify, Blueprint, current_app, request
from flask_cors import cross_origin
import asyncio

from controllers.pixhawkController import *


pixhawkRoutes = Blueprint('pixhawkRoutes', __name__)

# GET number msgs
#@cross_origin()
#@pixhawkRoutes.route('/msg', methods=['GET'])
#async def get_all_msgs():
#    number = 10
#    master = current_app.config.get('MASTER')
#    if master:
#        loop = asyncio.get_event_loop()
#        result = await loop.run_in_executor(None, get_pix_msg_controller, master, number)
#        return jsonify(result)
#    else:
#        return jsonify({'error': 'No se pudo conectar con UAV'})


# GET msg_type in max_time
@cross_origin()
@pixhawkRoutes.route('/', methods=['GET'])
async def get_uav_msg_route():
    msg_type = request.args.get('msg_type')
    max_time = int(request.args.get('max_time'))
    try:
        loop = asyncio.get_event_loop()
        result = await loop.run_in_executor(None, get_uav_msg_controller, msg_type, max_time)
        return jsonify(result)
    except Exception as e:
        return jsonify({'error': 'No se pudo conectar con UAV'})


@cross_origin()
@pixhawkRoutes.route('/arm', methods=['PUT'])
async def arm_uav_route():
    arm = int(request.args.get('arm'))  # Arm (arm = 1) / Disarm (arm = 0)
    try:
        loop = asyncio.get_event_loop()
        result = await loop.run_in_executor(None, arm_uav_controller, arm)
        return jsonify(result)
    except Exception as e:
        return jsonify({'error': 'No se pudo armar UAV'})


@cross_origin()
@pixhawkRoutes.route('/takeoff', methods=['POST'])
async def takeoff_uav_route():
    request_data = await request.json  # Obtener los datos del cuerpo de la solicitud
    launch_angle = int(request_data.get('launch_angle'))
    latitude = float(request_data.get('latitude'))
    longitude = float(request_data.get('longitude'))
    altitude = float(request_data.get('altitude'))
    try:
        loop = asyncio.get_event_loop()
        result = await loop.run_in_executor(None, takeoff_uav_controller, launch_angle, latitude, longitude, altitude)
        return jsonify(result)
    except Exception as e:
        return jsonify({'error': 'No se pudo takeoff UAV'})




# POST Add WAYPOINT
#@cross_origin()
#@pixhawkRoutes.route('/', methods=['POST'])
#async def add_waypoint():
#    data = request.get_json()
#    lat = data.get('lat')
#    lon = data.get('lon')
#    alt = data.get('alt')
#    master = current_app.config.get('MASTER')
#    if master:
#        loop = asyncio.get_event_loop()
#        result = await loop.run_in_executor(None, add_waypoint_controller, master, lat, lon, alt)
#        return jsonify(result)
#    else:
#        return jsonify({'error': 'No se pudo conectar con UAV'})





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
