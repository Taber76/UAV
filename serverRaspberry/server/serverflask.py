# Librerias server
from flask import Flask


# Modulos
from Pixhawk.pixCom import connect_uav 
from ThermalCamera.thermalCamera import connect_thermal_camera
from Sim7600.sim7600Com import connect_sim
from Routes.pixRoute import get_pix
from Routes.thermalRoute import get_thermal

# ----------------------------------------------------------------
# Crea conexion UAV
master = connect_uav()

# Crea conexion camara termica
mlx, thermalFrame = connect_thermal_camera()

connect_sim()

# -----------------------------------------------------------------
# Routes
app = Flask(__name__)
app.add_url_rule('/pix', view_func=get_pix, defaults={'master': master})
app.add_url_rule('/thermal', view_func=get_thermal, defaults={'mlx': mlx, 'thermalFrame': thermalFrame})



# Inicio Servidor
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)

