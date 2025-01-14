'use strict'
const Todo = require('../models/todo')

class TodoCon {

    static findAll(req, res, next){
        const id = req.user._id
        Todo.find({user: id})
        .then(todo => {
            res.status(200).json(todo)
        })
        .catch(next)
    }

    static addTodo(req, res, next){
        const user = req.user._id
        const status = false
        const {title, description, dueDate} = req.body      
        Todo.create({title, description, dueDate, status, user})
        .then(todo =>{
            res.status(201).json(todo)
        })
        .catch(next)
    }

    static deleteTodo(req, res, next){
        const user = req.user._id
        const id = req.params.id      
        Todo.deleteOne({_id : id,user})
        .then(todo =>{
            res.status(200).json(todo)
        })
        .catch(next)
    }

    static updateTodo(req, res, next){
        const {title, description, dueDate} = req.body      
        Todo.updateOne({_id : req.params.id}, {title, description, dueDate})
        .then(data=>{
            res.status(200).json(data)
        })
        .catch(next)
    }

    static checkTodo(req, res,next){
        const {user} = req.params
        const {id} = req.body
        const status = true      
        Todo.updateOne({_id : id,user}, {status})
        .then(data=>{
            res.status(200).json(data)
        })
        .catch(next)
    }
}

module.exports = TodoCon