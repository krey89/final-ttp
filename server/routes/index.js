const express = require('express');
const router = express.Router();
const pg = require('pg');
const path = require('path');
// var Sequelize = require('sequielize');
// var sequelize = new Sequelize('postgres://localhost:5432/blog');
//
// var items = sequelize.define('items',{
//   text: Sequelize.STRING,
//   complete: Sequelize.BOOLEAN
// });

//const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/blog';

const connectionString = 'postgres://rflkrebsnfnybn:43aa548243cb20fdd8ae0767f9a9a036655c83debda642a5ce6fb77493dac524@ec2-107-21-205-25.compute-1.amazonaws.com:5432/d5eoek7afp7vt1';
//const connectionString = process.env.DATABASE_URL || 'postgres://csrozilvqvtqes:17692bd1f566f6417369936618de94bc22a95dcd23e15d6075ebf2f44b07bff6@ec2-54-163-254-48.compute-1.amazonaws.com:5432/def4a3ef6gurv8;'
//const connectionString = process.env.DATABASE_URL || 'postgres://ec2-23-21-220-152.compute-1.amazonaws.com:5432/d53d7t2o6pu1qt';
router.get('/juke', (req, res, next) => {
  res.sendFile(path.join(
    __dirname, '..', '..', 'client', 'views', 'myJK.html'));
});

router.get('/portfolio', (req, res, next) => {
  res.sendFile(path.join(
    __dirname, '..', '..', 'client', 'views', 'portfolio.html'));
});


router.get('/blog', (req, res, next) => {
  res.sendFile(path.join(
    __dirname, '..', '..', 'client', 'views', 'blog.html'));
});

router.get('/', (req, res, next) => {
  res.sendFile(path.join(
    __dirname, '..', '..', 'client', 'views', 'index.html'));
});

//CRUD COMPONENTS


//READ
router.get('/api/v1/blog', (req, res, next) => {
  const results = [];
  // Get a Postgres client from the connection pool
  pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Select Data
    const query = client.query('SELECT * FROM items ORDER BY id ASC;');
    // Stream results back one row at a time
    query.on('row', (row) => {
      results.push(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', () => {
      done();
      return res.json(results);
    });
  });
});

//CREATE
router.post('/api/v1/blog', (req, res, next) => {
  const results = [];
  // Grab data from http request
  const data = {text: req.body.text, complete: false};
  // Get a Postgres client from the connection pool
  pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Insert Data
    client.query('INSERT INTO items(text, complete) values($1, $2)',
    [data.text, data.complete]);
    // SQL Query > Select Data
    const query = client.query('SELECT * FROM items ORDER BY id ASC');
    // Stream results back one row at a time
    query.on('row', (row) => {
      results.push(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', () => {
      done();
      return res.json(results);
    });
  });
});

//UPDATE
router.put('/api/v1/blog/:blog_id', (req, res, next) => {
  const results = [];
  // Grab data from the URL parameters
  const id = req.params.blog_id;
  // Grab data from http request
  const data = {text: req.body.text, complete: req.body.complete};
  // Get a Postgres client from the connection pool
  pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Update Data
    client.query('UPDATE items SET text=($1), complete=($2) WHERE id=($3)',
    [data.text, data.complete, id]);
    // SQL Query > Select Data
    const query = client.query("SELECT * FROM items ORDER BY id ASC");
    // Stream results back one row at a time
    query.on('row', (row) => {
      results.push(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', function() {
      done();
      return res.json(results);
    });
  });
});

//DELETE
router.delete('/api/v1/blog/:blog_id', (req, res, next) => {
  const results = [];
  // Grab data from the URL parameters
  const id = req.params.blog_id;
  // Get a Postgres client from the connection pool
  pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Delete Data
    client.query('DELETE FROM items WHERE id=($1)', [id]);
    // SQL Query > Select Data
    var query = client.query('SELECT * FROM items ORDER BY id ASC');
    // Stream results back one row at a time
    query.on('row', (row) => {
      results.push(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', () => {
      done();
      return res.json(results);
    });
  });
});

module.exports = router;
