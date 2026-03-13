import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.js'
import teamsRoutes from './routes/teams.js'
import scoresRoutes from './routes/scores.js'
import videosRoutes from './routes/videos.js'
import pitchBookingRoutes from './routes/pitchBooking.js'
import socialRoutes from './routes/social.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/teams', teamsRoutes)
app.use('/api/scores', scoresRoutes)
app.use('/api/videos', videosRoutes)
app.use('/api/pitch-booking', pitchBookingRoutes)
app.use('/api/social', socialRoutes)

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))
