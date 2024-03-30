const router = require('express').Router();
const jobController = require('../controllers/jobController');

router.post('/',jobController.createJob);

router.get('/',jobController.getAllJobs);

router.get('/search/:key',jobController.searchJobs);

router.get('/:id',jobController.getJob);

router.put('/:id',jobController.updatedJob);

router.delete('/:id',jobController.deletedJob );



module.exports = router;