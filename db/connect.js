const mongoose = require("mongoose");
const mongoURL = 'mongodb://localhost:27017/test';
mongoose.connect(mongoURL, { useUnifiedTopology: true })
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('db ok')
})