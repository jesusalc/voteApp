"use strict";
import mongoose from 'mongoose'

const processConnection = (collectionName, Schema) => {
    console.log('......................' + collectionName + 'Schema.js')
    let MONGO_URL = process.env.MONGO_URL

    const connection = mongoose.createConnection(MONGO_URL, function(err, conn) {
            if (err) {
                console.error.bind(console, "MongoDB connection error:" , err)
                console.error('MongoDB connection error: ' + err)
                console.trace()
                throw err          // use this line, it will throw err, but keep server up
                // return reject(err) // use this line with a Promise.reject returning the err, and keeps server up
                // return res.status(500).json({'MongoDB connection error': err})
                process.exit(1)       // use this line, it will throw log error and stop server
            }
                        // Check that Collection Exists
            conn.db.listCollections({name: collectionName})
                .next(function(err, collinfo) {
                    if (err) {
                        console.error('MongoDB connection error: ', err)
                        console.trace()
                        throw err          // use this line, it will throw err, but keep server up
                        // return reject(err) // use this line with a Promise.reject returning the err, and keeps server up
                        // return res.status(500).json({'MongoDB connection error': err})
                        process.exit(1)       // use this line, it will throw log error and stop server
                    }
                    if (collinfo) {
                        //console.info("collinfo:", collinfo)
                        console.info('Collection exists:', collinfo.name)
                    } else {
                        console.error('Collection does not exist: ', collectionName)
                        console.trace()
                        throw err          // use this line, it will throw err, but keep server up
                        // return reject(err) // use this line with a Promise.reject returning the err, and keeps server up
                        // return res.status(500).json({'Collection does not exist': collectionName})
                        process.exit(1)       // use this line, it will throw log error and stop server
                    }
                })

    }) // end connection

    // Create a mongoose model using the Schema
    // the schema is useless so far
    // we need to create a model using it
    return connection.model(collectionName, Schema)

}

export default processConnection;
