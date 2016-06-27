var config = require('config'),
  mongoose = require('mongoose'),
  dbConfig = config.get('Customer.dbConfig'),

  Schema = new mongoose.Schema({  
      login: String,
      password: String
  });

mongoose.model(dbConfig.collectionName, Schema);