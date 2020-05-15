const Category = require('../models/category');

//get tất cả loai sản phẩm
exports.getAllCat = function (request, response) {
    Category.find({})
        .lean()
        .exec(function (error, data) {
            response.render('category', { categoryList: data.reverse() });
            // console.log(data);
            if (error) {
                log(error);
            }
        });
};

exports.getAllCateIndex = function (request, response) {
    Category.find({})
        .lean()
        .exec(function (error, data) {
            response.render('addNhanVien', { categoryListIndex: data.reverse() });
            // console.log(data);
            if (error) {
                log(error);
            }
        });
};

//get 1 sản phẩm
exports.getCategory = function (request, response) {
    Category.findById(request.params.id)
        .lean()
        .exec((err, doc) => {
            if (!err) {
                response.render('editCategory', { Category: doc });
            }
        });
};
//chỉnh sửa
exports.editCategory = function (request, response) {
    Category.updateOne(
        { _id: request.body._id },
        { $set: { namecategory: request.body.namecategory} },
        (err, doc) => {
            if (!err) {
                response.redirect('/category');
            } else {
                console.log('Edit Failed');
            }
        }
    );
};

//xóa sản phẩm
exports.deleteCategory = function (request, response) {
    Category.deleteOne({ _id: request.params.id }, (err, doc) => {
        if (!err) {
            response.redirect('/category');
        } else {
            console.log(err);
        }
    });
};
