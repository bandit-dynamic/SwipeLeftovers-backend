const router = require('express').Router();
const { ProfileCtrl } = require('../controllers') ;



// ROUTES - METHODS //
router.get('/', ProfileCtrl.getProfile)
router.post('/', ProfileCtrl.createProfile)
router.put('/:id', ProfileCtrl.updateProfile)
router.delete('/:id', ProfileCtrl.deleteProfile)


module.exports = router;