const NhanVien = require('../models/nhanvien');
const Cate = require('../models/category');
//get tất cả nhân viên
exports.getAll = function (request, response) {
    NhanVien.find({})
        .lean()
        .exec(function (error, data) {
            response.render('index', { nhanvienList: data.reverse() });
            // console.log(data);
            if (error) {
                log(error);
            }
        });
        
};

//get 1 nhân viên
exports.getNhanVien = function (request, response) {
    NhanVien.findById(request.params.id)
        .lean()
        .exec((err, doc) => {
            if (!err) {
                response.render('edit', { NhanVien: doc });
            }
        });
};
//chỉnh sửa
exports.edit = function (request, response) {
    NhanVien.updateOne(
        { _id: request.body._id },
        { $set: { name: request.body.name, price: request.body.price } },
        (err, doc) => {
            if (!err) {
                response.redirect('/index');
            } else {
                console.log('Edit Failed');
            }
        }
    );
};

//xóa nhân viên
exports.delete = function (request, response) {
    NhanVien.deleteOne({ _id: request.params.id }, (err, doc) => {
        if (!err) {
            response.redirect('/index');
        } else {
            console.log(err);
        }
    });
};
