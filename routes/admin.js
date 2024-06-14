const express = require('express');
const app = express();

const cors = require('cors');

const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const connection = require('/connection');

const { checkadminrole, adminpass } = require('/middleware/checkadmin');


app.post('/upload', upload.array('mainimage', 10), async (req, res) => {
    try {
        const Product_Name = req.body.Product_Name;
        const Price = req.body.price;
        const Weight = req.body.Weight;
        const discount = req.body.discount;
        const pricewithdiscount = req.body.pricewithdiscount;
        const Brand_id = req.body.Brand_id;
        const Category_id = req.body.Category_id;
        const description = req.body.description;
        const benefits = req.body.benefits;
        const ingredients = req.body.ingredients;
        const status = req.body.status;

        const mainimage = req.body.mainimage;
        const frontimage = req.body.frontimage;
        const tableimage = req.body.tableimage;
        const Backsitedataimage = req.body.Backsitedataimage;

        const files = req.files;

        for (let file of files) {

            console.log(file);
            const path = await uploadToS3(file.buffer);
            const sql = `INSERT INTO images (product_id, mainimage) VALUES (?, ?)`;
            const values = [product_id, path];

            connection.query(sql, values, (err, result) => {
                if (err) {
                    console.error('Error adding file to database:', err);
                    return res.status(500).send('An error occurred while adding file to database');
                }
                console.log('File added to database');
            });
        }

        res.send({
            success: true,
            message: "Files uploaded successfully"
        });
    } catch (err) {
        console.error('Error handling file upload:', err);
        res.status(500).send('An error occurred during file upload');
    }
});


app.post('/Addadmin', checkadminrole, (req, res) => {
    const Name = req.body.Name;
    const Email = req.body.Email;
    const role = req.body.role;
    const Address = req.body.Address;
    const Username = req.body.Username;
    const Password = req.body.Password;
    const MobileNo = req.body.MobileNo;

    const sqll = `insert into admin_user (Name,Email,role,Address,Username,Password,MobileNo) values (?,?,?,?,?,?,?)`;
    connection.query(sqll, [Name, Email, role, Address, Username, Password, MobileNo], (err, data) => {
        if (err) {
            res.status(401).send({
                success: false,
                message: 'Unauthorized',
                data: []
            })
        } else {
            res.status(200).send({
                success: true,
                message: 'Admin added',
                data: data
            })
        }
    })
});

app.get('/Alladmins', checkadminrole, (req, res) => {
    const sqll = `select * from admin_user`;
    connection.query(sqll, (err, data) => {
        if (err) {
            res.status(401).send({
                success: false,
                message: 'Unauthorized',
                data: []
            })
        } else {
            res.status(200).send({
                success: true,
                message: "All Admins",
                data: data
            })
        }
    })
});

app.put('/UpdateaAdmin/:id', checkadminrole, (req, res) => {
    const id = req.params.id;
    const Name = req.body.Name;
    const Email = req.body.Email;
    const role = req.body.role;
    const Address = req.body.Address;
    const Username = req.body.Username;
    const Password = req.body.Password;
    const MobileNo = req.body.MobileNo;

    const sqll = `update admin_user set Name=?,Email=?,role=?,Address=?,Username=?,Password=?,MobileNo=?  where id = ?`;
    if (id == req.decoded.id || req.decoded.role == "Admin") {
        connection.query(sqll, [Name, Username, Password, Email, role, Address, MobileNo, id], (err, data) => {
            if (err) {
                res.status(500).send({
                    success: false,
                    message: err.sqlmessage,
                    data: []
                })
            } else {
                res.status(200).send({
                    success: true,
                    message: 'Admin Updated',
                    data: data
                })
            }
        })
    } else {
        res.status(401).send({
            success: false,
            message: 'Unauthorized',
            data: []
        })
    }
});

app.delete('/DeleteAdmin/:id', checkadminrole, (req, res) => {
    const token = req.headers['x-access-token'];
    if (!token) {
        res.status(401).send({
            success: false,
            message: 'unathorized',
            data: []
        })
    } else {
        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                res.status(401).send({
                    success: false,
                    message: 'unathorized',
                    data: []
                })
            } else {
                const id = req.params.id;
                const deletesql = `delete from admin_user where id=?`;
                if (req.decoded.role == "Admin") {
                    connection.query(deletesql, [id, decoded.id], (err, data) => {
                        if (err) {
                            res.status(500).send({
                                success: false,
                                message: err.sqlMessage,
                                data: []
                            })
                        } else {
                            res.status(200).send({
                                success: true,
                                message: 'Admin Deleted',
                                data: data
                            })
                        }
                    })
                } else {
                    res.status(401).send({
                        success: false,
                        message: 'unathorized',
                        data: []
                    })
                }
            }
        })
    }
});