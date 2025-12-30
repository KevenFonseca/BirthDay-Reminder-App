const mongoose = require('mongoose')
const userModel = require('../models/userModel')

const postUserInfo = async (req, res) => {
    try {
        const { userName, email, dateOfBirth } = req.body
    
        if (!userName || !email || !dateOfBirth) {
            return res.status(400).json({error: 'All fields are required'})
        }
    
        const exist = await userModel.findOne({email})
        if (exist) return res.status(409).json({error: 'Email already registered'})

        await userModel.create({userName, email, dateOfBirth})
    
        res.status(201).json({success: true})

    } catch (err) {
        console.log(err)
        res.status(500).json({error: err.message})
    }
} 

const getAllUserInfo = async (req, res) => {
    try {
        const users = await userModel.find({})
        
        // const users = [
        //     { id: 1, name: 'Keven' },
        //     { id: 2, name: 'Patrick'}
        // ]
        
        res.status(200).json({data: users})
        
    } catch (err) {
        console.log(err)
        res.status(500).json({error: err.message})
    }
}

module.exports = {
    postUserInfo,
    getAllUserInfo
}