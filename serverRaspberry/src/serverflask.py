# Librerias server
from flask import Flask

# Routes modules
from routes.pixRoute import pixhawkRoutes
# from Routes.thermalRoute import thermalRoutes


# SERVER ------------------------------------------------------------
app = Flask(__name__)

# ROUTES
# /pix
app.register_blueprint(pixhawkRoutes, url_prefix='/')

# /thermal
# app.register_blueprint(thermalRoutes, url_prefix='/')

# LAUNCH SERVER
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)
