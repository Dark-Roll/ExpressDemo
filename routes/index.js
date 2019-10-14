var express = require('express');
var router = express.Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.get('/', function(req, res, next) {

	var db = req.con;
	
	var user = req.query.user;
	var filter = "";
	// 有值就 filter 沒有就全部
	if (user) {
			filter = 'WHERE id = ?';
	}
	// user 是為了 代入那個變數 (?)
	db.query('SELECT * FROM activity ' + filter, user, function(err, rows) {
		if (err) {
				console.log(err);
		}
		var data = rows;

		// use index.ejs
		res.render('index', { title: 'Account Information', activities: data, user: user });
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
  var qur = db.query('INSERT INTO ? SET ?', tableName ,sql, function(err, rows) {
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

	// 若要取得網址列參數，可使用 req.query.[參數]

	db.query('SELECT * FROM activity WHERE id = ?', id, function(err, rows) {
			if (err) {
					console.log(err);
			}
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

	console.log(sql);

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
// test 

router.get('/userDelete', function(req, res, next) {

	var id = req.query.id;
	var db = req.con;

	var qur = db.query('DELETE FROM activity WHERE id = ?', id, function(err, rows) {
			if (err) {
					console.log(err);
			}
			res.redirect('/');
	});
});

module.exports = router;
