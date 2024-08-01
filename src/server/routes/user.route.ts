import express from 'express';

const router = express.Router()

router.get('/user', (req, res) => {
  return res.send('hey there')
})


export default router;