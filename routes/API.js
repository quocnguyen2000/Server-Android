//import modules
const express = require('express');
const router = express.Router();

//import controllers
const API = require('../controllers/API');

//getAll
router.get('/api/nhanvien', API.getAll);
//get 1 sp
router.get('/api/nhanvien/:id', API.getNhanVien);

router.get('/api/nhanvien/:name', API.getNhanVien);

//edit
router.put('/api/nhanvien/edit/:id', API.editNhanVien);

//delete
router.delete('/api/nhanvien/delete/:id', API.deleteNhanVien);

module.exports = router;
