const express = require('express');
const router = express.Router();
const {registerAdmin, loginAdmin, listUrls, editUrl, deleteUrl } = require('../controllers/adminController');
const { authenticateAdmin } = require('../middleware/auth');
const {validateAdminRegister, validateAdminLogin, validateEditUrl, checkValidationResult } = require('../middleware/validate');

console.log('adminController:', { loginAdmin, listUrls, editUrl, deleteUrl });
console.log('authenticateAdmin:', authenticateAdmin);

router.post('/register', validateAdminRegister, checkValidationResult, registerAdmin);
router.post('/login', validateAdminLogin, checkValidationResult, loginAdmin);
router.get('/urls', authenticateAdmin, listUrls);
router.put('/urls/:shortCode', authenticateAdmin, validateEditUrl, checkValidationResult, editUrl);
router.delete('/urls/:shortCode', authenticateAdmin, deleteUrl);

module.exports = router;
