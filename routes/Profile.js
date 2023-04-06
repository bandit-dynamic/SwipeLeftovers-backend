const router = require('express').Router();
const { ProfileCtrl } = require('../controllers') 
const User = require('./User');


// ROUTES - METHODS //
router.get('/', ProfileCtrl.getProfile)
router.post('/', ProfileCtrl.createProfile)
router.put('/:id', ProfileCtrl.updateProfile)
router.delete('/:id', Profile.deleteProfile)
module.exports = router;