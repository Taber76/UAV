# Librerias server
import time
from flask import Flask
from services.connectToCluod import send_post_cloud

# Routes modules
from routes.pixRoute import pixhawkRoutes
# from Routes.thermalRoute import thermalRoutes


# SERVER ------------------------------------------------------------
# comprobar conexion a internet

# comunicarse con servidor en la nube y obeter autorizacion
print('Connecting to cloud...')
response = False

while not response:
    response = send_post_cloud()
    if not response:
        print('Connection to cloud failed. Retrying in 5 seconds...')
        time.sleep(5)

print('Connected to cloud successfully!')


# configurar servidor local
app = Flask(__name__)

# ROUTES
# /pix
app.register_blueprint(pixhawkRoutes, url_prefix='/')

# /thermal
# app.register_blueprint(thermalRoutes, url_prefix='/')

# LAUNCH SERVER
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)
