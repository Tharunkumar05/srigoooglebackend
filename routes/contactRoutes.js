const express = require('express');
const {getContactController,contactController, deleteContactController} = require('../controllers/contactController');

const router = express.Router();

router.post('/submission', contactController);

router.get('/get-contact', getContactController);

router.delete('/delete-contact/:id', deleteContactController);

module.exports = router;