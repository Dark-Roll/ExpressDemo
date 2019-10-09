var express = require('express');
var router = express.Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.get('/', function(req, res, next) {

  var db = req.con;
  // var data = "";

  db.query('SELECT * FROM activity', function(err, rows) {
      if (err) {
        console.log("db error");
    	console.log(err);
			}
			// rows is an array, and element in array is an object
			// console.log(rows, rows[0], rows[0].id);
      var activities = rows;

      // use index.ejs
      res.render('index', { title: 'Activity Information', activities: activities});
  });

});

module.exports = router;
