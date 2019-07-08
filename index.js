const express = require('express')
const cors = require('cors')
const app = express()
const updateFormData = require('./controller/formDataUpdater')

const port = process.env.PORT || 8000
let formData = {}

// Enable cors
app.use(cors())

// Enable body parsing with json data
app.use(express.json())

// http GET enpoint
app.get('/get-form-data', function(req, res) {
  res.send(formData)
})

// http POST endpoint
app.post('/submit-form', updateFormData(formData))

// Server runner
app.listen(port, function() {
  console.log(`Server running at ${port}`)
})
