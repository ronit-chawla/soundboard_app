const express = require('express');
const {
  home,
  audio,
  category,
} = require('../controllers/pages');

const router = express.Router();

router.get('/', home);
router.get('/audio', audio);
router.get('/category', category);

module.exports = router;
