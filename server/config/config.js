// port
process.env.PORT = process.env.PORT || 3000;


// env
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


// token expire
// 60 seconds
// 60 minutes
// 24 hours
// 30 days
process.env.EXPIRE_TOKEN = 60 * 60 * 24 * 30;


// seed
process.env.SEED = process.env.SEED || 'this-is-the-seed-for-develop';

// DB
let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = process.env.MONGO_URI;
}
process.env.URLDB = urlDB;