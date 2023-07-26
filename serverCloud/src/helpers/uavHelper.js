const uavConection = require('../config/uavConection')

class Uav {
  constructor (conection) {
    this.conection = conection
  }

  async longCommand (data) {
    const response = await fetch(`${this.conection}/pix`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    const jsonresponse = await response.json()
    return jsonresponse
  }
}

module.exports.UAV = new Uav(uavConection.uavIp)
