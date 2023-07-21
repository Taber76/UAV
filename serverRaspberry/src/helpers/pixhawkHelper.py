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

    # Long message
    def get_message(self, message, param1, param2, param3, param4, param5, param6, param7):
        command = getattr(mavutil.mavlink, message)
        self.master.mav.command_long_send(
            0, 0,                           # System and component ID
            command, 0,                     # Automatic confirmation
            param1, param2, param3, param4, param5, param6, param7
        )
        msg = self.get_msg_type('COMMAND_ACK', 10)
        return msg


# Declare Pixhawk's class instance
master = connect_to_uav()
Pixhawk = pixhawk(master)
