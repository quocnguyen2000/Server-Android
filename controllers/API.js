const NhanVien= require('../models/nhanvien');

//get All
exports.getAll = async (request, response) => {
    try {
        let nhanvien = await NhanVien.find({});
        response.send(nhanvien);
    } catch (error) {
        console.log(error);
    }
};

exports.getNhanVien= async (request, response) => {
    try {
        let nhanvien = await NhanVien.findById(request.params.id);
        response.send(nhanvien);
    } catch (error) {
        console.log(err);
    }
};

//edit
exports.editNhanVien = async (request, response) => {
    try {
        let nhanvien = await NhanVien.findById(request.params.id);
        nhanvien.set(request.body);
        let result = await nhanvien.save();
        response.send(result);
    } catch (error) {
        console.log(err);
    }
};

//xóa 
exports.deleteNhanVien = async (request, response) => {
    try {
        let result = await NhanVien.deleteOne({ _id: request.params.id });
        response.send(result);
    } catch (error) {
        console.log(err);
    }
};
