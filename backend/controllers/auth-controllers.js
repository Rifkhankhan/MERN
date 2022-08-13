const HttpError = require('../models/http-error');
const uuid = require('uuid/v4');
const { validationResult } = require('express-validator')
// npm install --save express-validator
let DUMMY_USERS = [
	{
		id: 'u1',
		name: 'Rifkhan',
        email:'Rifkhan@gmail.com',
        password:'123456',
		age: 25
	},
	{
		id: 'u2',
		name: 'Nila',
        email:'Nila@gmail.com',
        password:'123456',
		age: 22
	}
];

const getUsers = (req, res, next) => {
    res.status(200).json({...DUMMY_USERS})
};

const logup = (req, res, next) => {

    const error = validationResult(req)
    if(!error.isEmpty())
    {
        throw new HttpError('Please enter Valid input',422)
    }
    const  {email,password,name,age} = req.body

    const hasUser = DUMMY_USERS.find(user=>user.email === email)

    if(hasUser)
    {
        throw new HttpError('could not logup this email is already exist',422)
    }

    DUMMY_USERS.push({
        id:uuid(),
        email,
        password,
        age,
        name
    })

    res.status(200).json({message:"Successfully Logup",DUMMY_USERS})
};

const login = (req, res, next) => {

    const error = validationResult(req)
    if(!error.isEmpty())
    {
        throw new HttpError('Please enter Valid input',422)
    }

    const  {email,password} = req.body

    const identifiedUser = DUMMY_USERS.find(user=>user.email === email);
    
    if(!identifiedUser || identifiedUser.password !== password)
    {
        throw new HttpError('could not login in')
    }
   
    res.status(201).json('successfully Login')
};

exports.getUsers = getUsers;
exports.login = login;
exports.logup = logup;
