/**
 * Created by VamsiReddy on 12/13/2014.
 */
var sidebar = require('../helpers/sidebar'),
    ImageModel = require('../models').Image;
module.exports = {
    index: function (req, res) {
        var viewModel = {
        };
        ImageModel.find({},{},{sort:{timestamp:-1}},function(err,images){
            viewModel.images = images;
            sidebar(viewModel, function(err,viewModel) {
                if(err) throw err;
                res.render('index', viewModel);
            });
        });
    }
};