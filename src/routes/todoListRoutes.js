var express = require('express');
var app = express();
var router = express.Router();

var TodoList = require('../models/TodoList');

router.route('/:id').get(function(req, res) {
	var id = req.params.id;
	TodoList.findById(id, function(err, item) {
		res.json(item);
	});
});

router.route('/').get(function(req, res) {
	TodoList.find(function(err, items) {
		if(err) {
			console.log(err);
		} else {
			res.json(items);
		}
	});
});

router.route('/add').post(function(req, res) {
	var item = new TodoList(req.body);
	item.save().then(item => {
		res.json('Added');
	}).catch(err => {
		res.status(400).send("Unable to save")
	});
});

router.route('/update/:id').post(function(req, res) {
	TodoList.findById(req.params.id, function(err, item) {
		if(!item) {
			return next(new Error('Could not load document'));
		} else {
			item.desc = req.body.desc;
			item.save().then(item => {
				res.json('updated');
			}).catch(error => {
				res.status(400).send("Unable to update");
			});
		}
	});
});

router.route('/delete/:id').get(function (req, res) {
  TodoList.findByIdAndRemove({_id: req.params.id},
       function(err, item){
        if(err) res.json(err);
        else res.json('Deleted');
    });
});

module.exports = router;