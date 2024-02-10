const { Router } = require("express");
const mysql = require('mysql2');

const router = Router();

const conn = mysql.createConnection({
    host: 'localhost',
    database: 'novo_banco_de_teste',
    user: 'root',
    password: 'root'
});

router.get('/listar', function (req, res) {

    try {

        conn.execute('SELECT * FROM tbl_funcionarios;', function (err, response, fields) {

            if (err) throw err;
    
            res.status(200).json({
                msg: 'Sucesso na listagem de funcionários!',
                data: response
            });
        });
        
    } catch (error) {
        
        res.status(500).json({
            msg: 'Erro ao listar funcionários!',
            data: error
        });
    }
});

router.get('/:id', function (req, res) {

    try {

        conn.execute(
            `SELECT nome FROM tbl_funcionarios WHERE id = ?;`, [req.params.id], function (err, response, fields) {
    
            if (err) throw err;

            res.status(200).json({
                msg: 'Sucesso na consulta do funcionário!',
                data: response[0]
            });
        });
        
    } catch (error) {
        
        res.status(200).json({
            msg: 'Erro ao consultar funcionário!',
            data: error
        });
    }
});


router.post('/cadastrar', function (req, res) {

    try {

        conn.execute('INSERT INTO tbl_funcionarios (nome) VALUES (?);', [req.body.nome], function (err, response, fields) {

            if (err) throw err;
    
            res.status(200).json({
                msg: 'Funcionário cadastrado com sucesso!',
                data: response
            });
        });
        
    } catch (error) {
        
        res.status(500).json({
            msg: 'Erro ao cadastrar funcionário!',
            data: error
        });
    }
});

router.patch('/alterar/:id', function (req, res) {

    try {

        conn.execute('UPDATE tbl_funcionarios SET nome = ? WHERE id = ?;', [req.body.nome, req.params.id], function (err, response, fields) {

            if (err) throw err;
    
            res.status(200).json({
                msg: 'Funcionário atualizado com sucesso!',
                data: response
            });
        });
        
    } catch (error) {
        
        res.status(500).json({
            msg: 'Erro ao atualizar funcionário!',
            data: error
        });
    }
});

router.delete('/excluir/:id', function (req, res) {

    try {

        conn.execute('DELETE FROM tbl_funcionarios WHERE id = ?;', [req.params.id], function (err, response, fields) {

            if (err) throw err;
    
            res.status(200).json({
                msg: 'Funcionário excluído com sucesso!',
                data: response
            });
        });
        
    } catch (error) {
        
        res.status(500).json({
            msg: 'Erro ao excluir funcionário!',
            data: error
        });
    }
});


module.exports = router;