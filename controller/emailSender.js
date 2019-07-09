require('dotenv').config()
const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

module.exports = function sendEmail(formData) {
  const { agentEmail, clientEmail, flightInfo } = formData
  const msg = {
    to: [clientEmail, agentEmail],
    from: agentEmail,
    subject: 'Order Details',
    html: flightInfo,
  }

  sgMail.sendMultiple(msg)
}
