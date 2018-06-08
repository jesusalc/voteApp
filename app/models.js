'use strict'

const findUserByName = (name) => {
   return new Promise((resolve, reject) => {
       resolve(Users.findOne({ name : name }, '_id name', (err, user) => {
           return user;
       }))
   });
};

const findRatingsofUser = (userId) => {
    return new Promise((resolve, reject) => {
        resolve(
            Ratings.find({}).select('-_id saying').where('user').equals(userId).exec((err, ratings) => {
                return ratings;
            })
        )
    })
};


module.exports = { findUserByName, findRatingsofUser }