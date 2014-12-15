/**
 * Created by VamsiReddy on 12/15/2014.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
    path = require('path');
var CommentSchema = new Schema({
    image_id:{type:ObjectId},
    email:{type:String},
    name:       { type: String },
    gravatar:   { type: String },
    comment:    { type: String },
    timestamp:  { type: Date, 'default': Date.now }
});
CommentSchema.virtual('image').set(function(image){
    this._image = image;
}).get(function() {
    return this._image;
});

module.exports = mongoose.model('Comment', CommentSchema);
