'use strict'

module.exports = (err, req, res, next) =>{
    if (err.status && err.message ) {
         res.status(err.status).json({
            message : err.message
        })
    }
    switch (err.name) {
        case 'ValidationError':
            let messages = []
            if (err.errors) {
                for (let index in err.errors) {
                    messages.push(err.errors[index].message)
                }
            } else {
                messages = err.message
            }
            res.status(400).send({
                message: messages
            })   
        case 'CastError':
            res.status(400).send({
                message: `id invalid`
            })  
        case 'JsonWebTokenError' : {
            res.status(400).send({
                message : "invalid token, please don't change the token in your local storage"
            })
        }                 
        default:            
            res.status(500).send({
                message: 'Internal Server Error'
            })
    }
}