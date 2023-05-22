from flask import jsonify, Blueprint, current_app, request
from flask_cors import cross_origin
import asyncio

from Pixhawk.pixCom import *


pixhawkRoutes = Blueprint('pixhawkRoutes', __name__)


# GET pix_type in max_time
@cross_origin()
@pixhawkRoutes.route('/', methods=['GET'])
async def get_pix_msg_type():
    pix_type = request.args.get('pix_type') 
    max_time = int(request.args.get('max_time')) 
    master = current_app.config.get('MASTER')
    if master:
        loop = asyncio.get_event_loop()
        result = await loop.run_in_executor(None, get_pix_msg_type_controller, master, pix_type, max_time)
        return jsonify(result)
    else:
        return jsonify({'error': 'No se pudo conectar con UAV'})


# POST Add WAYPOINT
@cross_origin()
@pixhawkRoutes.route('/', methods=['POST'])
async def add_waypoint():
    data = request.get_json()
    lat = data.get('lat')
    lon = data.get('lon') 
    alt = data.get('alt')
    master = current_app.config.get('MASTER')
    if master:
        loop = asyncio.get_event_loop()
        result = await loop.run_in_executor(None, add_waypoint_controller, master, lat, lon, alt)
        return jsonify(result)
    else:
        return jsonify({'error': 'No se pudo conectar con UAV'})


@cross_origin()
@pixhawkRoutes.route('/arm', methods=['PUT'])
async def arm():
    master = current_app.config.get('MASTER')
    if master:
        loop = asyncio.get_event_loop()
        result = await loop.run_in_executor(None, pix_arm_controller, master, 1)
        return jsonify(result)
    else:
        return jsonify({'error': 'No se pudo armar UAV'})