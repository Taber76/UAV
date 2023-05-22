# Librerias server
from flask import Flask

# Routes modules
from Routes.pixRoute import pixhawkRoutes
#from Routes.thermalRoute import thermalRoutes

# Modules
from Pixhawk.pixCom import connect_uav_controller 
#from ThermalCamera.thermalCamera import connect_thermal_camera
#from Sim7600.sim7600Com import connect_sim

# ----------------------------------------------------------------
# UAV CONNECT
master = connect_uav_controller()

# THERMAL CAMERA
#mlx, thermalFrame = connect_thermal_camera()

# SIM COM
#connect_sim()

# -----------------------------------------------------------------
# ROUTES
app = Flask(__name__)

# /pix
app.config['MASTER'] = master
app.register_blueprint(pixhawkRoutes, url_prefix='/pix')

# /thermal
#app.config['MLX'] = mlx
#app.config['THERMAL_FRAME'] = thermalFrame
#app.register_blueprint(thermalRoutes, url_prefix='/thermal')



# Inicio Servidor
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)

