var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('form', { title: 'Form Page' });
});

router.post('/', function(req, res, next) {
  res.render('results', {title: 'Results Page', name: req.body.name, email: req.body.email, comments: req.body.comments });
});

module.exports = router;
