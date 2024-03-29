import numpy as np

from config.connectToThermal import connect_thermal_camera


class thermal():
    def __init__(self, mlx, thermal_frame):
        self.mlx = mlx
        self.thermal_frame = thermal_frame

    def get_frame(self):
        self.mlx.getFrame(self.thermal_frame)
        image = (np.reshape(self.thermal_frame, (24, 32)))
        return image

mlx, thermal_frame = connect_thermal_camera()
Thermal = thermal(
    mlx,
    thermal_frame
)
