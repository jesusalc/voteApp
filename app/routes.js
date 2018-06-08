'use strict'
import path from 'path'
module.exports = (router, schemas)  => {
    router.get('/sayings/:user', (req, res) => {
        res.sendFile(path.join(__dirname + '/build/index.html'))
    })

    /**
     * Always serve the same HTML file for all requests
     */

    router.get('/initializeSayings', (req, res) => {
        const initialSayings = require('../config/sayings.json')

        schemas.Sayings.insertMany(initialSayings.sayings, (err, document) => {
            res.send(err)
        })
    })

    router.get('/api/user', (req, res) => {
        findUserByName(req.query.name)
            .then(foundUser => {
                return foundUser
            }).then(user => {
                if (user === null) {
                    const user = new schemas.Users({
                        name: req.query.name
                    })
                    return user.save().then(savedUser => {
                        return savedUser
                    })
                }
                return user
        }).then(user => {
            res.send(user)
        })
    })

    router.get('/api/sayings', (req, res, next) => {
        findRatingsofUser(req.query.userId)
            .then((sayings) => {
                const sayingIds = sayings.map((saying) => {
                    return saying.saying
                })
                schemas.Sayings.find({})
                .where('_id').nin(sayingIds)
                    .limit(25)
                    .exec( (err, sayings) => {

                        res.json({sayings, totalVoted: sayingIds.length})
                        res.end()
                    })
            })

    })

    router.post('/api/rateSaying', (req,res) => {
        const rating = new schemas.Ratings({
            rate: req.body.rate,
            user: req.body.user,
            saying: req.body.sayingId
        })
        rating.save()
        res.end()
    })
}
