// npm install --save mongodb
// const MongoClient = require('mongodb').MongoClient
// const url = '';

const createPlace = async (req, res, next) => {
    // const newPlace = {
    //     name:req.body.name,
    // }

    // const client = new MongoClient(url)
    
    // try{
    //     await client.connect()
    //     const db  = client.db()
    //     const result = db.collection('places').insertOne(newPlace) 
    // }
    // catch (error){
    //     return res.json('error')
    // }

    // client.close()

    // res.json(newPlace)
};

const getPlace = async (req, res, next) => {
    // const client = new MongoClient(url)

    // try{
    //     await client.connect()
    //     const db  = client.db()
    //     await const result = db.collection('products').asArray()
    // } catch (error){
        //     return res.json('error')
        // }
    
        // client.close()
    
        // res.json(result)
};

exports.createPlace = createPlace;
exports.getPlace = getPlace;

