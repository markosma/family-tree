const express = require('express');
const router = express.Router();
const memberController = require('../controller/memberController');

// Get all members
router.get('/all', (req, res) => {
    memberController.getAllMembers().then((result) => res.send(result))
});

// Create a member
router.post('/', (req, res) => {
    memberController.createMember(req.body).then((result) => {
        res.send(result);
    })
});

// Get specific member
router.get('/:id', (req, res) => {
    memberController.getMember(req.params.id).then((result) => {
        res.send(result)
    })
})

// Update a member
router.put('/:id', (req, res) => {
    const updatedData = {
        role: req.body.role,
        name: req.body.name,
        father: req.body.father,
        mother: req.body.mother
    }
    memberController.updateMember(req.params.id, updatedData).then((result) => {
        res.send(result)
    })
})


// Delete a member
router.delete('/:id', (req, res) => {
    memberController.deleteMember(req.params.id).then((result) => {
        res.send(result)
    })
})

module.exports = router