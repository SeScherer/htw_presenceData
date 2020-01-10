const router = require('express').Router(),
    addattendanceController = require('../controllers/addattendancecontroller'),
    overviewController = require('../controllers/overviewController'),
    loginController = require('../controllers/loginController'),
    logoutController = require('../controllers/logoutController'),
    authMiddleware = require('../middleware/authMiddleware'),
    userController = require('../controllers/userController'),
    settingsController = require('../controllers/settingscontroller');

router.get('/overview', authMiddleware, overviewController.render);

router.get('/settings', authMiddleware, settingsController.render);

router.get('/addattendance', authMiddleware, addattendanceController.render);
router.post(
    '/addattendance',
    /*TODO authMiddleware,*/ addattendanceController.create
);
router.get('/login', loginController.render);
router.get('/', loginController.render);
router.post('/login', loginController.recieve);
router.get('/logout', authMiddleware, logoutController.logout);

router.post('/user', userController.create);
router.get('/user/:id', userController.getById);
router.get('/user', userController.getAll);
router.delete('/user/:id', userController.deleteById);
router.patch('/user', userController.update);

module.exports = router;
