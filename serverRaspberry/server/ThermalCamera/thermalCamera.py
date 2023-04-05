import numpy as np

def getThermalFrame (mlx, frame):
    mlx.getFrame(frame)
    image = (np.reshape(frame, (24, 32)))
    return image