import cors from 'cors'
import express, { json, urlencoded } from 'express'
import {
  handleGeneratePairs,
  isValidExcludedPairs,
  isValidRequest,
} from './handlers'

const app = express()
const port = 3001
app.use(cors())
app.use(json())
app.use(
  urlencoded({
    extended: true,
  })
)
app.get('/', (req, res) => {
  res.send('UP')
})
app.post('/pairs', isValidRequest, isValidExcludedPairs, handleGeneratePairs)
app.listen(port, () =>
  console.log(`App is listening at http://localhost:${port}`)
)
