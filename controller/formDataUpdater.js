const sendEmail = require('./emailSender')
const validateData = require('./dataValidator')

module.exports = function updateFormData(formData) {
  return function(req, res) {
    const errorMessage = validateData(req.body)
    if (errorMessage) {
      res.status(400).send(errorMessage)
      return
    }
    formData = {
      ...formData,
      ...req.body,
      total: `${Number(req.body.price) + Number(req.body.tax)}`,
    }
    sendEmail(formData)
    res.send(formData)
  }
}
