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

// add page
router.get('/add', function(req, res, next) {

  // use userAdd.ejs
  res.render('userAdd', { title: 'Add User'});
});


// add post
router.post('/userAdd', function(req, res, next) {

  var db = req.con;

  var sql = {
      id: req.body.id,
      people: req.body.people,
      group_name: req.body.group_name
  };

  //console.log(sql);
  var qur = db.query('INSERT INTO activity SET ?', sql, function(err, rows) {
      if (err) {
          console.log(err);
      }else{
        console.log("maybe insert success");
      }
      res.setHeader('Content-Type', 'application/json');
      res.redirect('/');
  });

});

// edit page
router.get('/userEdit', function(req, res, next) {

	var id = req.query.id;
	var db = req.con;
	var data = "";

	// 若要取得網址列參數，可使用 req.query.[參數]

	db.query('SELECT * FROM activity WHERE id = ?', id, function(err, rows) {
			if (err) {
					console.log(err);
			}
			console.log(rows);
			var data = rows;
			res.render('userEdit', { title: 'Edit Account', activities: data });
	});

});

router.post('/userEdit', function(req, res, next) {

	var db = req.con;
	var id = req.body.id;

	var sql = {
			id: req.body.id,
			people: req.body.people,
			group_name: req.body.group_name
	};


	// string 可過
	// ? 是被變數取代的樣子
	var qur = db.query('UPDATE activity SET ? WHERE id = ?', [sql, id], function(err, rows) {
			if (err) {
					console.log(err);
			}

			res.setHeader('Content-Type', 'application/json');
			res.redirect('/');
	});

});

module.exports = router;
