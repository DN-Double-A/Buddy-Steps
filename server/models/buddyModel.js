//^ File copied straight from Unit 10. The comments are also from the unit

const { Pool } = require('pg');

const PG_URI = 'postgres://kvumtzjm:VqGbPXRDvQwNJSU0YYc7Bn8ft3llPmYM@stampy.db.elephantsql.com/kvumtzjm';

// create a new pool here using the connection string above
const pool = new Pool({
  connectionString: PG_URI
});


// We export an object that contains a property called query,
// which is a function that returns the invocation of pool.query() after logging the query
// This will be required in the controllers to be the access point to the database
module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  }
};

// [ ] Now we are ready to send queries using pool.query() to the database. At the bottom of this file, we are exporting an object with a property called query, which is a function that will return the invocation of pool.query(). In between this, we can add console.log for all the queries being made for tracking purposes.
