const Url = require('../models/Url')
const validateUrl = require('../utils/validateUrl')
const generateUniqueId = require('../utils/generateUniqueId')

// CREATE - Create short URL
async function createShortUrl(req, res) {
    const { url, title, description } = req.body
    const clientUrl = process.env.BASE_URL

    // checking if the url is valid or not
    if(!validateUrl(url)) {
        res.status(400).json({message: 'Invalid URL'})
        return
    }
    
    try {
        // checking if original url is already present
        const urlDoc = await Url.findOne({ url })
        if(urlDoc) {
            const shortUrl = `${clientUrl}/${urlDoc.shortUrlId}`
            res.status(200).json({shortUrl: shortUrl, clicks: urlDoc.clicks})
            console.log('Url already present', shortUrl)
            return
        }
    
        // creating short url using nanoid
        const shortUrlId = await generateUniqueId()

        const newUrlDoc = new Url({
            url,
            shortUrlId,
            title: title || '',
            description: description || '',
            date: new Date()
        })
        await newUrlDoc.save()
        
        const shortUrl = `${clientUrl}/${shortUrlId}`
        res.status(200).json({shortUrl: shortUrl, clicks: 0})    
    }
    catch(err) {
        console.log(err)
        res.status(500).json({message: 'Server Error'})
    }
}

// READ - Get all URLs
async function getAllUrls(req, res) {
    try {
        const urls = await Url.find({}).sort({ date: -1 })
        res.status(200).json(urls)
    } catch(err) {
        console.log(err)
        res.status(500).json({message: 'Server Error'})
    }
}

// READ - Get URL by ID
async function getUrlById(req, res) {
    const { id } = req.params
    try {
        const urlDoc = await Url.findById(id)
        if(!urlDoc) {
            res.status(404).json({message: 'URL not found'})
            return
        }
        res.status(200).json(urlDoc)
    } catch(err) {
        console.log(err)
        res.status(500).json({message: 'Server Error'})
    }
}

// UPDATE - Update URL
async function updateUrl(req, res) {
    const { id } = req.params
    const { url, title, description } = req.body
    
    if(!validateUrl(url)) {
        res.status(400).json({message: 'Invalid URL'})
        return
    }
    
    try {
        const updatedUrl = await Url.findByIdAndUpdate(
            id, 
            { url, title, description, date: new Date() },
            { new: true }
        )
        
        if(!updatedUrl) {
            res.status(404).json({message: 'URL not found'})
            return
        }
        
        res.status(200).json(updatedUrl)
    } catch(err) {
        console.log(err)
        res.status(500).json({message: 'Server Error'})
    }
}

// DELETE - Delete URL
async function deleteUrl(req, res) {
    const { id } = req.params
    try {
        const deletedUrl = await Url.findByIdAndDelete(id)
        if(!deletedUrl) {
            res.status(404).json({message: 'URL not found'})
            return
        }
        res.status(200).json({message: 'URL deleted successfully'})
    } catch(err) {
        console.log(err)
        res.status(500).json({message: 'Server Error'})
    }
}

// Redirect to original URL (existing functionality)
async function redirectToOriginalUrl(req, res) {
    const { shortUrlId } = req.params

    try {
        const urlDoc = await Url.findOne({shortUrlId})
        // checking if short url is present
        if(urlDoc === null) {
            res.status(404).json({message: 'No Url found'})
            return
        } 

        // $inc increase the clicks by 1
        await Url.findByIdAndUpdate(urlDoc._id, { $inc: { "clicks" : 1 } })
        // redirect to the original url
        return res.status(200).redirect(urlDoc.url)
    }
    catch(err) {
        console.log(err)
        res.status(500).json('Server Error')
    }
}

module.exports = {
    createShortUrl,
    getAllUrls,
    getUrlById,
    updateUrl,
    deleteUrl,
    redirectToOriginalUrl
}