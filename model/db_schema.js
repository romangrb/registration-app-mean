var config = require('config'),
  mongoose = require('mongoose'),
  dbConfig = config.get('Customer.dbConfig'),

  Schema = new mongoose.Schema({  
  name: String,
  src: String,
  is_deleted: Boolean
});

mongoose.model(dbConfig.collectionName, Schema);