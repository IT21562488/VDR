// backend/routes/designRoutes.js

const express = require('express');
const router = express.Router();
const designController = require('../controllers/designController');

// Route for fetching all designs
router.get('/view', designController.getAllDesigns);

// Route for uploading a design
router.post('/upload', designController.uploadDesignFromLink);

// Route for voting on a design
router.post('/:id/vote', designController.voteDesign);

// Route for adding a comment to a design
router.post('/:id/comment', designController.addComment);

// Route for fetching a single design by ID
router.get('/:id', designController.getDesignById);


module.exports = router;
