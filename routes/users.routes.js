const { Router } = require('express');
const router = Router();

const users = [
  { id: 1, name: "Ivan", gender: "men", age: 20, car: "bmw", address: "Moscow" },
  { id: 2, name: "Vasiliy", gender: "men", age: 25, car: "volvo", address: "Ivanovo" }
]

// GET/api/users
router.get('/', async (request, response) => {
  try {
    response.status(200).json({ ...users })
  } catch (e) {
    console.log(e)
    response.status(500).json({ message: 'Что-то не так', error: e })
  }
})

// PUT/api/user/:id
router.put('/:id', async (request, response) => {
  try {
    console.log(request.params.id)
    console.log(request.body)

    response.status(200).json({ ...users })
  } catch (e) {
    console.log(e)
    response.status(500).json({ message: 'Что-то не так', error: e })
  }
})


module.exports = router
