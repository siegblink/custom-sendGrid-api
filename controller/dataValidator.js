const Joi = require('joi')

module.exports = function validateData(formData) {
  const schema = {
    clientName: Joi.string(),
    clientEmail: Joi.string(),
    agentEmail: Joi.string(),
    flightInfo: Joi.string(),
    numPassengers: Joi.number(),
    price: Joi.number(),
    tax: Joi.number(),
  }
  const { error } = Joi.validate(formData, schema)
  return error
}
