require('dotenv').config()
const express = require('express')
const sequelize = require('./models/index').sequelize;
const { DataTypes } = require('sequelize')
const Student = require('./models/student')
const port = process.env.PORT || 3000

const app = express()

app.use(express.urlencoded({extended: true}))
app.use(express.json())


app.get('/get', async (req, res) => {
    try {
        const data = await Student(sequelize, DataTypes).findAll({
            attributes: ['id','nama','jurusan','kelas','password']
        })
        res.status(200).json({data})
    } catch (error) {
        res.status(422).json({message: error.message})
    }
})

app.post('/create', async (req, res) => {
    try {
        const data = await Student(sequelize, DataTypes).create({
            nama: req.body.nama,
            jurusan: req.body.jurusan,
            kelas: req.body.kelas,
            password: req.body.password
        })
        res.status(200).json({message: `Student ${data.nama} created!`, data: data})
    } catch (error) {
        res.status(422).json({message: error.message})
    }
})

app.put('/update', async (req, res) => {
    try {
        const id = req.params.id
        const data = await Student(sequelize, DataTypes).update({
            nama: req.body.nama,
            jurusan: req.body.jurusan,
            kelas: req.body.kelas,
            password: req.body.password
        }, {
            where: {
                id: id
            }
        })
        res.status(201).json({message: `Succesfull to update!`})
    } catch (error) {
        res.status(442).json({message: error.message})
    }
})

app.delete('/delete', async(req, res) => {
    try {
        const nama = req.query.nama
        const data = await Student(sequelize, DataTypes).destroy({
        where: {
            nama: nama
        }
    })
    if(!data) {
        res.status(404).json({message: 'Student not found!'})
    }
    res.status(200).json({message: `${nama} deleted!`})
    } catch (error) {
        res.status(422).json({message: error.message})
    }
})

app.listen(port, console.log(`In Port ${port}`))