var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Generate Color Grid', msg:'' });
});

router.post('/', function(req, res, next) {
  res.render('index', { 
      title: 'Generate Color Grid', 
      size: req.body.size, 
      msg: 'Viewing ' + req.body.size + 'x' + req.body.size + ' grid:' });
});

module.exports = router;
