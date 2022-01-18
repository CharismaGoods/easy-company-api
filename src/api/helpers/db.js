const mysql = require('mysql');

var pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: 'company'
});


const executeCommand = async (sql, values, kind, cb) => {
  try {
    pool.getConnection(function (err, conn) {
      if (err) {
        if (err.errno) {
          conn.release();
          cb({ success: 'no', msg: `${err.errno - err.sqlMessage}`, status_no: 500 });
        }
        else {
          conn.release();
          cb({ success: 'no', msg: `${err}`, status_no: 500 });
        }
      }
      else {
        conn.query(sql, values, function (err, results) {
          if (err) {
            if (err.errno) {
              conn.release();
              cb({ success: 'no', msg: `${err.errno} - ${err.sqlMessage}`, status_no: 500 });
            }
            else {
              conn.release();
              cb({ success: 'no', msg: `${err}`, status_no: 500 });
            }
          }
          else {
            if (kind === 'insert') {
              conn.release();
              cb({ success: 'yes', id: results.insertId });
            }
            else if (kind === 'update') {
              conn.release();

              if (results.affectedRows === 0) {
                cb({ success: 'no', msg: 'There is no matching record', status_no: 500 });
              }
              else {
                cb({ success: 'yes', affected_rows: results.affectedRows });
              }
            }
            else {
              conn.release();
              if (results.length == 1) {
                cb({ success: 'yes', data: results[0] });
              }
              else if (results.length > 1) {
                cb({ success: 'yes', data: results });
              }
              else {
                cb({ success: 'no', msg: 'not found', status_no: 404 });
              }
            }

          }
        })
      }
    })
  }
  catch (err) {
    cb({ success: 'no', msg: err, status_no: 500 });
  }
}

module.exports = { executeCommand, pool };