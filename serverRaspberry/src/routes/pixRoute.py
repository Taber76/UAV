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


# PUT arm /pix/arm?arm=1
@cross_origin()
@pixhawkRoutes.route('/pix/arm', methods=['PUT'])
async def arm_uav_route():
    arm = int(request.args.get('arm'))  # Arm (arm = 1) / Disarm (arm = 0)
    try:
        loop = asyncio.get_event_loop()
        result = await loop.run_in_executor(None, arm_uav_controller, arm)
        return jsonify(result)
    except Exception as e:
        return jsonify({'error': 'No se pudo armar UAV'})


# PUT takeoff /pix/takeoff {"launch_angle": 0, "latitude": 0, "longitude": 0, "altitude": 0}
@cross_origin()
@pixhawkRoutes.route('/pix/takeoff', methods=['PUT'])
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


# POST add waypoint /pix/waypoint {"lat": 0, "lon": 0, "alt": 0}
@cross_origin()
@pixhawkRoutes.route('/pix/waypoint', methods=['POST'])
async def go_to_waypoint():
    data = request.get_json()
    lat = data.get('lat')
    lon = data.get('lon')
    alt = data.get('alt')
    try:
        loop = asyncio.get_event_loop()
        result = await loop.run_in_executor(None, go_to_waypoint_controller, lat, lon, alt)
        return jsonify(result)
    except Exception as e:
        return jsonify({'error': 'No se pudo conectar con UAV'})


# GET number msgs
# @cross_origin()
# @pixhawkRoutes.route('/msg', methods=['GET'])
# async def get_all_msgs():
#    number = 10
#    master = current_app.config.get('MASTER')
#    if master:
#        loop = asyncio.get_event_loop()
#        result = await loop.run_in_executor(None, get_pix_msg_controller, master, number)
#        return jsonify(result)
#    else:
#        return jsonify({'error': 'No se pudo conectar con UAV'})


# POST Add WAYPOINT
# @cross_origin()
# @pixhawkRoutes.route('/', methods=['POST'])
# async def add_waypoint():
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
