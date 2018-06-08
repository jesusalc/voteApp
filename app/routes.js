'use strict'

module.exports = router => {
    router.get('/sayings/:user', function (req, res) {
        res.sendFile(path.join(__dirname + '/app/build/index.html'))
    })

    /**
     * Always serve the same HTML file for all requests
     */

    router.get('/initializeSayings', function(req, res) {
        import initialSayings from './config/sayings.json'

        Sayings.insertMany(initialSayings.sayings, (err, document) => {
            res.send(err)
        })
    })

    router.get('/api/user', function (req, res) {
        findUserByName(req.query.name)
            .then(foundUser => {
                return foundUser
            }).then(user => {
                if (user === null) {
                    const user = new Users({
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

    router.get('/api/sayings', function (req, res, next) {
        findRatingsofUser(req.query.userId)
            .then((sayings) => {
                const sayingIds = sayings.map((saying) => {
                    return saying.saying
                })
                Sayings.find({})
                .where('_id').nin(sayingIds)
                    .limit(25)
                    .exec(function (err, sayings) {

                        res.json({sayings, totalVoted: sayingIds.length})
                        res.end()
                    })
            })

    })

    router.post('/api/rateSaying', function (req,res) {
        const rating = new Ratings({
            rate: req.body.rate,
            user: req.body.user,
            saying: req.body.sayingId
        })
        rating.save()
        res.end()
    })
}
