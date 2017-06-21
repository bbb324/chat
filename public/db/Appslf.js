var Promise = require('promise');
var Apps = require('./apps').Apps;

var Insert = function(name, title) {
	return new Promise((resolve, reject) => {
		var keyid = {name: name};
		var update = {title: title};
		var options = {upsert : true};
		var callback = function(err, insertRet) {
			if(err) {
				return reject(err);
			} else {
				var cloudID = 'defaultCloudID';
				console.log(77);
				console.log(insertRet);
				if(insertRet) {
					var upsertedArr = insertRet.upserted;
					if(upsertedArr && upsertedArr.length > 0) {
						cloudID = upsertedArr[0]._id;
					}
				}
				return resolve(cloudID);
			}
		}
		Apps.Insert(keyid, update, options, callback);
	});
}

var Query = function(title) {
	return new Promise((resolve, reject) => {
		var _userid = {title: title};
		var callback = function(err, user) {
			if(err) {
				return reject(err);
			} else {
				if(user != null) {
					return resolve(user);
				} else {
					return reject(err, '');
				}
			}
		}
		var type = 0;
		new Apps({}).Query(type, _userid, callback);
	});
}

exports.Insert = Insert;
exports.Query = Query;
