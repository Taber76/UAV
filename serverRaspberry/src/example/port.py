import serial.tools.list_ports


def find_pixhawk_port():
    pixhawk_ports = []
    ports = serial.tools.list_ports.comports()
    print(ports)

    for port in ports:
        print(port)
        if "Pixhawk" in port.description:
            pixhawk_ports.append(port.device)

    return pixhawk_ports


# Llamar a la función para encontrar el puerto del Pixhawk
pixhawk_ports = find_pixhawk_port()

if len(pixhawk_ports) > 0:
    print("El Pixhawk está conectado en el/los siguiente(s) puerto(s):")
    for port in pixhawk_ports:
        print(port)
else:
    print("No se encontró un Pixhawk conectado.")
