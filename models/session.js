var mongoose = require('mongoose');

module.exports = mongoose.model('Session',{
    hydra: String,
    name: String,
    user: String,
    tone: Array
});