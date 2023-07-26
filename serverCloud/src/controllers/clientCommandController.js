const { UAV } = require('../helpers/uavHelper')

exports.longCommand = async (req, res) => {
  try {
    const response = await UAV.longCommand(req.body)
    if (response.response === true) {
      const jsonmessage = JSON.parse(response.message)
      res.status(200).json({
        message: jsonmessage,
        response: response.response
      })
    } else {
      res.status(400).json(response)
    }
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}
