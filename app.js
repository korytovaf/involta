require('dotenv').config()

const express = require('express')
const http = require('http')
const { Server } = require('socket.io')

const knex = require('knex')({
  client: 'pg',
  connection: {
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT || 5432,
    database: process.env.POSTGRES_DATABASE,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD
  }
})

const PORT = 8000

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ["GET", "POST"]
  }
})

io.on('connection', (socket) => {
  console.log(`Пользователь ${socket.id} подключился`)

  socket.on('getUsers', async () => {
    try {
      const users = await knex.select().table('users')
      socket.emit('allUsers', users);
    } catch (err) {
      socket.emit('errorBD', { message: 'Ошибка БД', err })
    }
  })

  socket.on('createUser', async (data) => {
    try {
      const res = await knex('users').insert(data).returning("id")
      if (res[0].id) {
        socket.emit('createUserOk', res[0].id)
        const users = await knex.select().table('users')
        socket.broadcast.emit('allUsers', users)
        socket.emit('allUsers', users)
      } else {
        socket.emit('createUserErr')
      }
    } catch (err) {
      console.log(err)
      socket.emit('errorBD', { message: 'Ошибка создания пользователя', err })
    }
  })

  socket.on('changeUser', async (data) => {
    try {
      const updateBD = await knex('users').where({id: data.id}).update(data)
      if (updateBD === 1) {
        const users = await knex.select().table('users')
        socket.emit('changeUserOk')
        socket.broadcast.emit('allUsers', users);
        socket.emit('allUsers', users);
      } else {
        socket.emit('errorBD', { message: 'Пользователь не найден' })
      }
    } catch (err) {
      socket.emit('errorBD', { message: 'Ошибка базы данных', err })
    }
  })

  socket.on('deleteUser', async (id) => {
    try {
      const deleteBD = await knex('users').where({id}).delete()
      if (deleteBD === 1) {
        const users = await knex.select().table('users')
        socket.broadcast.emit('allUsers', users)
        socket.emit('allUsers', users)
      } else {
        socket.emit('errorBD', { message: 'Пользователь не найден' })
      }
    } catch (err) {
      socket.emit('errorBD', { message: 'Пользователь не найден', err })
    }
  })

  socket.on('disconnect', () => {
    console.log(`Пользователь ${socket.id} отключился`)
  })
})

server.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`)
})
