const dotenv = require('dotenv')
dotenv.config({ path: './.env' })
const express = require('express')
const router = express.Router()
const urlController = require('../controllers/url') 

// CREATE - Create short URL
router.post('/', urlController.createShortUrl)

// READ - Get all URLs
router.get('/all', urlController.getAllUrls)

// READ - Get URL by ID
router.get('/url/:id', urlController.getUrlById)

// UPDATE - Update URL
router.put('/url/:id', urlController.updateUrl)

// DELETE - Delete URL
router.delete('/url/:id', urlController.deleteUrl)

// Redirect to original URL (existing functionality)
router.get('/:shortUrlId', urlController.redirectToOriginalUrl)

// Root route
router.get('/', (req, res) => {
    res.json({message: 'Success'})
})

module.exports = router