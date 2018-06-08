'use strict'

const findUserByName = (name, users) => {
   return new Promise((resolve, reject) => {
       resolve(users.findOne({ name : name }, '_id name', (err, user) => {
           return user;
       }))
   });
};

const findRatingsofUser = (userId, ratings) => {
    return new Promise((resolve, reject) => {
        resolve(
            ratings.find({}).select('-_id saying').where('user').equals(userId).exec((err, ratings) => {
                return ratings;
            })
        )
    })
};

const models =  {
  findUserByName: findUserByName,
  findRatingsofUser: findRatingsofUser
}
export default models;
