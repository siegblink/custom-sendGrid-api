const request = require('request')
const firebase = require('firebase/app')
require('firebase/firestore')
const { firebaseConfig, rebrandlyApiKey } = require('../config')
const sendEmail = require('./emailSender')
const validateData = require('./dataValidator')

// Initialize Rebrandly
const linkRequest = {
  destination: 'https://custom-order.herokuapp.com/order-details',
  domain: { fullName: 'rebrand.ly' },
}
const requestHeaders = {
  'Content-Type': 'application/json',
  apikey: `${rebrandlyApiKey}`,
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)
const db = firebase.firestore()

function addRecord() {
  return function(req, res) {
    const errorMessage = validateData(req.body)
    if (errorMessage) {
      res.status(400).send(errorMessage)
      return
    }

    const formData = {
      ...req.body,
      total: `${Number(req.body.price) + Number(req.body.tax)}`,
    }

    db.collection('order')
      .add(formData)
      .then(function(doc) {
        return `Data added with ID: ${doc.id}`
      })
      .catch(function(error) {
        console.error('Error adding data: ', error)
      })

    request(
      {
        uri: 'https://api.rebrandly.com/v1/links',
        method: 'POST',
        body: JSON.stringify(linkRequest),
        headers: requestHeaders,
      },
      function(err, response, body) {
        const link = JSON.parse(body)
        res.send({ url: link.shortUrl, ...formData })
        sendEmail({ url: link.shortUrl, ...formData })
      }
    )
  }
}

function loadRecord() {
  return function(req, res) {
    db.collection('order')
      .get()
      .then(function(querySnapshot) {
        const data = querySnapshot.docs.map(function(doc) {
          return doc.data()
        })
        res.send(data)
      })
      .catch(function(error) {
        console.error('Error loading data: ', error)
      })
  }
}

module.exports = {
  addRecord,
  loadRecord,
}
