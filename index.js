const express = require("express");
const cors = require("cors");

const app = express();
app.use((cors()));

const connection = require('./connection');
const userRoute = require('./routes/user');
const brandRoute = require('./routes/brand');
const categoryRoute = require('./routes/category');
const contactRoute = require('./routes/contact');
const productRoute = require('./routes/product');
const billRoute = require('./routes/bill');
const wishlistRoute = require('./routes/wishlist');
const ordersRoute = require('./routes/orders');
const couponsRoute = require('./routes/coupons');
const cartroute = require('./routes/cart');


app.use('/user', userRoute);
app.use('/category', categoryRoute);
app.use('/brand', brandRoute);
app.use('/wishlist', wishlistRoute);
app.use('/product', productRoute);
app.use('/coontact', contactRoute);
app.use('/bill', billRoute);
app.use('/orders', ordersRoute);
app.use('/coupons', couponsRoute);
app.use('/cart', cartroute);


app.use(express.json());
module.exports = app;