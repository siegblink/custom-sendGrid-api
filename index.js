const express = require('express')
const cors = require('cors')
const app = express()
const { addRecord, loadRecord } = require('./controller/firebase.utils')

const port = process.env.PORT || 8000
let formData = {}

// Enable cors
app.use(cors())

// Enable body parsing with json data
app.use(express.json())

// http GET enpoint
app.get('/get-form-data', loadRecord())

// http POST endpoint
app.post('/submit-form', addRecord())

// Server runner
app.listen(port, function() {
  console.log(`Server running at ${port}`)
})
