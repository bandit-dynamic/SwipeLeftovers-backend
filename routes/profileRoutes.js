const router = require('express').Router();
const { ProfileCtrl } = require('../controllers') ;



// ROUTES - METHODS //
router.get('/', ProfileCtrl.getProfile)
router.post('/register', ProfileCtrl.createProfile)
router.put('/:id', ProfileCtrl.updateProfile)
router.delete('/:id', ProfileCtrl.deleteProfile)
// router.get('/all', ProfileCtrl.home)
// ROUTES - METHODS => FOR ACCOUNT//
//logging in
router.post('/login', ProfileCtrl.loginProfile)
// router.get('/profileInfo', ProfileCtrl.profileAccess)
// router.get('/auth', ProfileCtrl.profileAccess)






module.exports = router;