'use strict'
import path from 'path'
module.exports = (router, schemas, models)  => {


    /**
     * Always serve the same HTML file for all requests
     */
    router.get('/routes', (req, res) => {
        const temp_head = '<!DOCTYPE html> \
                            <html lang="en"> \
                            <head> \
                                <meta charset="UTF-8"> \
                                <title>Routes</title> \
                                <link rel="stylesheet" href="/css/styles.css"> \
                            </head> \
                            <body> \
                            <div id="root"></div> \
                            '
        const routes =  [
                            {"route" : '<a href="http://127.0.0.1:3000/">home</a>'},
                            {"route" : '<a href="http://127.0.0.1:3000/initializeCollections">init db</a>'},
                            {"route" : '<a href="http://127.0.0.1:3000/api/user">api/user</a>'},
                            {"route" : '<a href="http://127.0.0.1:3000/api/user">api/user</a>'},
                            {"route" : '<a href="http://127.0.0.1:3000/api/sayings">api/sayings</a>'},
                            {"route" : '<a href="http://127.0.0.1:3000/api/rateSaying">api/rateSaying</a>'},
                        ]

        const temp_body = routes.map((route) => {
                return route.route + '<br/> \\'
            })
        const temp_footer = '</body> \
                            </html>'
        const temp_html = temp_head + temp_body + temp_footer
        res.send( temp_html )
    })

    router.get('/initializeCollections', (req, res) => {
        const initialSayings = require('../config/sayings.json')

        schemas.Sayings.insertMany(
            initialSayings.sayings, (err, document) => {
            res.send(err)
        })

        const initialUsers = require('../config/users.json')

        schemas.Users.insertMany(
            initialUsers.users, (err, document) => {
            res.send(err)
        })
    })

    router.get('/sayings/:user', (req, res) => {
        res.sendFile(path.join(__dirname + '/build/index.html'))
    })

    router.get('/api/user', (req, res) => {
        models.findUserByName(req.query.name, schemas.Users)
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
        models.findRatingsofUser(req.query.userId, schemas.Ratings)
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
