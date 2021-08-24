import express from 'express'
import user from './user'
import task from './task'

const route = express.Router()
route.use('/user', user)
route.use('/task', task)

export default route
