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

        conn.execute(
            `SELECT 
                dep.id,
                fun.nome AS funcionario,
                dep.nome "dependente"
            FROM
                tbl_dependentes AS dep
            LEFT JOIN
                tbl_funcionarios AS fun ON fun.id = dep.id_funcionario;`, function (err, response, fields) {
    
            if (err) throw err;

            res.status(200).json({
                msg: 'Sucesso na listagem de dependentes!',
                data: response
            });
        });
        
    } catch (error) {
        
        res.status(200).json({
            msg: 'Erro ao listar dependentes!',
            data: error
        });
    }
});

router.get('/:id', function (req, res) {

    try {

        conn.execute(
            `SELECT 
                dep.id,
                fun.id AS id_funcionario,
                dep.nome AS dependente
            FROM
                tbl_dependentes AS dep
            LEFT JOIN
                tbl_funcionarios AS fun ON fun.id = dep.id_funcionario
            WHERE dep.id = ?;`, [req.params.id], function (err, response, fields) {
    
            if (err) throw err;

            res.status(200).json({
                msg: 'Sucesso na consulta do dependente!',
                data: response[0]
            });
        });
        
    } catch (error) {
        
        res.status(200).json({
            msg: 'Erro ao consultar dependente!',
            data: error
        });
    }
});

router.post('/cadastrar', function (req, res) {

    try {

        conn.execute('INSERT INTO tbl_dependentes (id_funcionario, nome) VALUES (?, ?);', [req.body.id_funcionario, req.body.nome], function (err, response, fields) {

            if (err) throw err;
    
            res.status(200).json({
                msg: 'Dependente cadastrado com sucesso!',
                data: response
            });
        });
        
    } catch (error) {
        
        res.status(500).json({
            msg: 'Erro ao cadastrar dependente!',
            data: error
        });
    }
});

router.patch('/alterar/:id', function (req, res) {

    try {

        conn.execute('UPDATE tbl_dependentes SET id_funcionario = ?, nome = ? WHERE id = ?;', [req.body.id_funcionario, req.body.nome, req.params.id], function (err, response, fields) {

            if (err) throw err;
    
            res.status(200).json({
                msg: 'Dependente atualizado com sucesso!',
                data: response
            });
        });
        
    } catch (error) {
        
        res.status(500).json({
            msg: 'Erro ao atualizar dependente!',
            data: error
        });
    }
});

router.delete('/excluir/:id', function (req, res) {

    try {

        conn.execute('DELETE FROM tbl_dependentes WHERE id = ?;', [req.params.id], function (err, response, fields) {

            if (err) throw err;
    
            res.status(200).json({
                msg: 'Dependente excluído com sucesso!',
                data: response
            });
        });
        
    } catch (error) {
        
        res.status(500).json({
            msg: 'Erro ao excluir dependente!',
            data: error
        });
    }
});

module.exports = router;