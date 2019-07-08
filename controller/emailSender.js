require('dotenv').config()
const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

module.exports = function sendEmail(formData) {
  const { agentEmail, clientEmail, flightInfo } = formData
  const msg = {
    to: clientEmail,
    from: agentEmail,
    subject: 'Order Details',
    text: 'Order Details',
    html: flightInfo,
  }

  sgMail.send(msg)
}

// agentEmail: 'siegblink@gmail.com'
// clientEmail: 'siegblink@gmail.com'
// clientName: 'Siegfred Balona'
// flightInfo: '<p>Hello customer,</p><p><br></p><p>The following are your flight order details.</p>'
// numPassengers: '2'
// price: '100'
// tax: '50'
// total: '150'
