const express = require('express');

const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    db.select('*')
        .from('accounts')
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({error:'failed to get the list of accounts'})
        })
});

// select * from posts where id = "id"
server.get('/:id', (req, res) => {
    db('accounts')
        .where({id:req.params.id})
        .first()
        .then(posts => {
            res.status(200).json(posts)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({error:'failed to get account'})
        })
});

server.post('/', (req, res) => {
    db('accounts')
        .insert(req.body, "id")
        .then(inserted => {
            res.status(201).json(inserted);
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({error:'failed to add account'})
        })
});

server.put('/:id', (req, res) => {
    const id = req.params.id;
    const changes = req.body;
    db('accounts')
        .where({id})
        .update(changes)
        .then(count => {
            res.status(200).json(count)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({error:'failed to update account'})
        })
});

server.delete('/:id', (req, res) => {
    const id = req.params.id;
    db('accounts')
        .where({id})
        .del()
        .then(count => {
            res.status(200).json(count)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({error:'failed to remove account'})
        })

});

module.exports = server;