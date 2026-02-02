const express = require('express')
const JWT = require('jsonwebtoken')
const college_register = require('./Models/College_register');
const Admin_Model = require('./Models/Admin_Signin')
const user_model = require('./Models/User_Register')
const Counselor_Model = require('./Models/CounselorModel')

const Middleware = async (req, res, next) => {
    const authorization = req.headers.authorization
    if (!authorization ) {
        req.jwterr = {
            status: 400,
            message: 'Token not provided or invalid token'
        }
        return next()
    }
    const token = authorization.split(" ")[1];
    if (!token) {
        req.jwterr = {
            status: 400,
            message: 'Token not provided or invalid token'
        }
        return next()
    }
    const decode = JWT.verify(token, process.env.JWT_SECRET_KEY)
    // here we find user college based on the role
    if (decode.role === 'college') {
        const check_college = await college_register.findOne({ _id: decode.id })
        if (check_college) {
            req.user = decode
            next()
        } else {
            req.jwtarr = {
                status: 404,
                message: 'Not found'
            }
        }
    } else if (decode.role === 'admin') {
        const check_admin = await Admin_Model.findOne({ _id: decode.id })
        if (check_admin) {
            req.user = decode
            next()
        } else {
            req.jwtarr = {
                status: 404,
                message: 'Not found'
            }

        }
    } else if (decode.role === 'user') {
        const check_user = await user_model.findById({ _id: decode?.id })
        if (check_user) {
            req.user = decode
            next()
        } else {
            req.jwtarr = {
                status: 404,
                message: 'Not found'
            }
        }
    } else if (decode.role === 'counselor') {
        const check_user = await Counselor_Model.findById({ _id: decode?.id })
        if (check_user) {
            req.user = decode
            next()
        } else {
            req.jwtarr = {
                status: 404,
                message: 'Not found'
            }
        }
    }
}

module.exports = Middleware