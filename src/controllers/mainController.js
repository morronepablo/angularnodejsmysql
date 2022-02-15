const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'simpledb',
    port: 3306
});

// check database connection
db.connect(err=> {
    if(err) {
        console.log(err, 'dberror');
    } else {
        console.log('Base de datos conectada ....');
    }
});

const mainController = {
    user: (req, res) => {
        const qr = 'SELECT * FROM user';
        db.query(qr, (err, result) => {
            if(err) {
                console.log(err, 'error');
            }
            if(result.length > 0) {
                res.send({
                    message: 'datos de todos los usuarios',
                    data: result
                });
            }
        });
    }
}

module.exports = mainController;