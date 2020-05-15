const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const nhanvien= new Schema({
    name: { type: String },
    price: { type: String},
    image: { type: String },
    catId: { type: Schema.Types.ObjectId, ref: "category" },
});

module.exports = mongoose.model('nhanvien', nhanvien);
