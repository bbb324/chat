var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var Schema = mongoose.Schema;

//single mongodb node
// mongoose.connect("mongodb://localhost:27020/test");

//mongodb cluster
mongoose.connect("mongodb://localhost/test");

var Apps = new Schema({
	_id: Schema.ObjectId,
	name: String,
	title: String
});


/* istanbul ignore next */
Apps.methods.Insert = function(keyid, update, option, callback) {
	return this.model('neuronapps').update(keyid, update, option, callback);
}

Apps.methods.Query = function(type, userid, callback) {
	if(type == 0) {
		return this.model('neuronapps').findOne(userid, callback);
	} else if(type == 1) {
		return this.model('neuronapps').find(userid, callback).sort({'index': -1});
	} else if(type == 2) {
		return this.model('neuronapps').find(userid, callback).select('projectname').sort({'index': -1});
	}
}


//Static method
Apps.statics.Insert = function(keyid, update, option, callback) {
	return this.model('neuronapps').update(keyid, update, option, callback);
}



exports.Apps = mongoose.model('neuronapps', Apps);
