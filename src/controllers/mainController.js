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
    userAll: (req, res) => {
        const qr = `SELECT * FROM user
                    WHERE status = 'A'`;
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
    },
    userSingle: (req, res) => {
        const gID = req.params.id;
        const qr = `SELECT * FROM user WHERE id = ${gID} AND status = 'A'`;
        db.query(qr, (err, result) => {
            if(err) {
                console.log(err, 'error');
            }
            if(result.length > 0) {
                res.send({
                    message: 'datos de un usuario',
                    data: result
                });
            } else {
                res.send({
                    message: 'usuario no encontrado...'
                });
            }
        });
    },
    userCreate: (req, res) => {
        console.log(req.body, 'createdata');

        const fullname = req.body.fullname;
        const eMail    = req.body.email;
        const mb       = req.body.mobile;

        const qr = `INSERT INTO user(fullname, email, mobile) 
                        VALUES('${fullname}', '${eMail}', '${mb}')`;
        
        db.query(qr, (err, result) => {
            if(err) {
                console.log(err, 'error');
            } else {
                console.log(result);
                res.send({
                    message: 'usuario agregado correctamente'
                });
            }
        });
    },
    userUpdate: (req, res) => {
        console.log(req.body, 'updatedata');

        const gID      = req.params.id;
        const fullname = req.body.fullname;
        const eMail    = req.body.email;
        const mb       = req.body.mobile;

        const qr = `UPDATE user SET fullname = '${fullname}', email = '${eMail}', mobile = '${mb}'
                    WHERE id = ${gID} AND status = 'A'`;

        db.query(qr, (err, result) => {
            if(err) {
                console.log(err, 'error');
            } else {
                console.log(result);
                if(result.affectedRows > 0) {
                    res.send({
                        message: 'usuario se modificó correctamente'
                    });
                } else {
                    res.send({
                        message: 'El usuario a modificar no existe'
                    });
                }
            }
        });
    },
    userDelete: (req, res) => {
        const gID      = req.params.id;

        const qr = `UPDATE user SET status = 'I'
                    WHERE id = ${gID} AND status = 'A'`;

        db.query(qr, (err, result) => {
            if(err) {
                console.log(err, 'error');
            } else {
                console.log(result);
                if(result.affectedRows > 0) {
                    res.send({
                        message: 'usuario se eliminó correctamente'
                    });
                } else {
                    res.send({
                        message: 'El usuario a eliminar no existe'
                    });
                }
            }
        });
    }
}

module.exports = mainController;