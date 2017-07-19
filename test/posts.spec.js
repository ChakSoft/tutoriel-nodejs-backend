'use strict'

const Chai = require('chai')
const ChaiHTTP = require('chai-http')
const Promise = require('bluebird')

const Server = require('../index')
Chai.should()
Chai.use(ChaiHTTP)

const PostsController = require('../controllers/posts')
const CommentsController = require('../controllers/comments')

const TestGame = require('./game.json')

const Endpoint = '/posts'

describe('Posts Unit tests', () => {
    before((done) => {
        Promise.map(TestGame.posts, (post) => {
            return PostsController.create(post)
        })
            .then(() => done())
            .catch((err) => done(err))
    })
    it('GET / : should get an array of posts', (done) => {
        Chai.request(Server)
            .get(`${Endpoint}`)
            .send()
            .then((res) => {
                res.should.have.status(200)
                res.body.should.be.an('array')
                res.body.should.have.lengthOf(1)

                const post = res.body[0]
                post.should.be.an('object')
                post.should.have.property('id', 1)
                post.should.have.property('title', 'Titre du post de test #1')
                post.should.have.property('content', 'Ceci est un premier test de POST')
                done()
            })
            .catch((err) => done(err))
    })
    after((done) => {
        PostsController.destroy()
            .then(() => done())
            .catch((err) => done(err))
    })
})
