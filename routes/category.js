const express = require('express');
const router = express.Router();

//start category apis
router.post('/addcategory', (req, res) => {
    const Category_Name = req.body.Category_Name;
    const sql = `insert into category (Category_Name) value(?)`;
    connection.query(sql, [Category_Name], (err, data) => {
        if (err) {
            res.send({
                success: false,
                error: err.sqlMessage,
                data: []
            })
        } else {
            res.send({
                success: true,
                error: '',
                data: data
            })
        }
    })
});

router.get('/Allcategory', (req, res) => {
    const category = ` select * from category `;
    connection.query(category, (err, data) => {
        if (err) {
            res.send({
                success: false,
                error: err.sqlMessage,
                data: []
            })
        } else {
            res.send({
                success: true,
                error: '',
                data: data
            })
        }
    })
});

router.get('/getbyid/:Category_id', (req, res) => {
    const Category_id = req.params.Category_id;
    const category = `select * from category where Category_id=?`;
    connection.query(category, [Category_id], (err, data) => {
        if (err) {
            res.send({
                success: false,
                error: err.sqlMessage,
                data: []
            })
        } else {
            res.send({
                success: true,
                error: '',
                data: data
            })
        }
    })
});

router.put('/updatecategory/:Category_id', (req, res) => {
    const Category_id = req.params.Category_id;
    const Category_Name = req.body.Category_Name;
    const updatecategory = `update category set Category_Name=? where Category_id = ?`;
    connection.query(updatecategory, [Category_Name, Category_id], (err, data) => {
        if (err) {
            res.send({
                success: false,
                error: err.sqlMessage,
                data: []
            })
        } else {
            res.send({
                success: true,
                error: '',
                data: data
            })
        }
    })
});

router.delete('/deletecategory/:Category_id', (req, res) => {
    const Category_id = req.params.Category_id;
    const query = `delete from category where Category_id=?`;
    connection.query(query, [Category_id], (err, data) => {
        if (err) {
            res.send({
                success: false,
                error: err.sqlMessage,
                data: []
            })
        } else {
            res.send({
                success: true,
                error: '',
                data: data
            })
        }
    })
});
//end category api's


module.exports = router;