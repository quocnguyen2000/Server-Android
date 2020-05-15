const adminController = require('../controllers/admin.controllers');
const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();

//lấy dữ liệu từ form
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.get('/', (req, res) => {
    res.render('SignIn');
});

router.post('/login', adminController.login);

router.get('/register', (req, res) => {
    res.render('SignUp');
});


//--------------------//
//import modules
const multer = require('multer');
const path = require('path');

//import controllers
const nhanvienController = require('../controllers/nhanvien.controllers');
const categoryController = require('../controllers/category.controllers')

//import models
const NhanVien = require('../models/nhanvien');
const Category = require('../models/category');
//cấu hình multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({
    storage: storage,
    //kiểm tra file upload có phải là hình ảnh hay không
    fileFilter: function (req, file, callback) {
        var ext = path.extname(file.originalname);
        if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
            return callback(new Error('Only images are allowed'));
        }
        callback(null, true);
    },
    limits: {
        fileSize: 1024 * 1024 * 5,//giới hạn filesize = 5Mb
    },
});
//upload file + insert dư liệu vào mongoDB
router.post('/upload', upload.single('image'), (request, response) => {
    let nhanvien = new NhanVien({
        name: request.body.name,
        price: request.body.price,
        image: request.file.originalname, //chỉ lấy tên file upload
        catId: request.body.catId,
    });

    nhanvien.save(function (err) {
        if (err) {
            console.log(err);
            return;
        } else {
            response.redirect('/index');
        }
    });
});

//upload dữ liệu category lên mongoDB
router.post('/uploadCategory', (request, response) => {
    let cate = new Category({
        namecategory: request.body.namecategory,
    });

    cate.save(function (err) {
        if (err) {
            console.log(err);
            return;
        } else {
            response.redirect('/category');
        }
    });
});




router.post('/register', adminController.register);

router.get('/index', nhanvienController.getAll);


router.get('/addNhanVien', categoryController.getAllCateIndex);
//get nhanvien
router.get('/edit/:id', nhanvienController.getNhanVien);
//edit
router.post('/edit', nhanvienController.edit);
//delete
router.get('/delete/:id', nhanvienController.delete);

//get cate
router.get('/category', categoryController.getAllCat);
router.get('/editCategory/:id', categoryController.getCategory);
//edit
router.post('/editCategory', categoryController.editCategory);
//delete
router.get('/deleteCategory/:id', categoryController.deleteCategory);



module.exports = router;
