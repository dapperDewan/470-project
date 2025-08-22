const express = require('express');
const router = express.Router();
const dreamTeamController = require('../controller/dreamTeamController');
const auth = require('../middleware/auth');

router.get('/my', auth, dreamTeamController.getMyDreamTeam);
router.put('/my', auth, dreamTeamController.updateMyDreamTeam);
router.get('/user/:userId', dreamTeamController.getDreamTeamByUser);

module.exports = router;
