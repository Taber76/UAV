from helpers.thermalHelper import Thermal


def get_frame_controller():
    try:
        image = Thermal.get_frame()
        return image
    except:
        print("--> Error get frame")
        pass
