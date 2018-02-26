import { Router } from 'express'
import User from '../models/user.model'

const router = Router()

// RESTful API
router.get('/users', (req, res) => {
  User.find({}, '_id fullname')
    .then((users) => {
      res.json(users)
    })
    .catch(err => res.json(err))
})

router.get('/users/:id', (req, res) => {
  const id = req.params.id
  User.findById(id, 'fullname')
    .then((user) => {
      res.json(user)
    })
    .catch((err) => {
      res.sendStatus(404).res.json(err)
    })
})

export default router
