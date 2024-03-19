const express = require("express");
const Design = require("../models/design");

// Controller for uploading a design
// Controller for uploading a design from a link
async function uploadDesignFromLink(req, res) {
    try {
        const { designerName, description, imageUrl } = req.body; // Assuming imageUrl is provided in the request body
        const newDesign = new Design({
            designerName,
            description,
            imageUrl
        });
        await newDesign.save();
        res.status(201).json({ success: true, message: 'Design uploaded successfully.', imageUrl });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error.' });
    }
}


// Controller for fetching a single design by ID
async function getDesignById(req, res) {
    try {
        const designId = req.params.id;
        const design = await Design.findById(designId);
        if (!design) {
            return res.status(404).json({ success: false, message: 'Design not found.' });
        }
        res.status(200).json({ success: true, data: design });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error.' });
    }
}


// Controller for fetching all designs with details
async function getAllDesigns(req, res) {
    try {
        const designs = await Design.find();
        res.status(200).json({ success: true, data: designs });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error.' });
    }
}

// Controller for voting on a design
async function voteDesign(req, res) {
    try {
        const designId = req.params.id;
        const type = req.body.type; // 'up' or 'down'

        const design = await Design.findById(designId);

        if (!design) {
            return res.status(404).json({ success: false, message: 'Design not found.' });
        }

        if (type === 'up') {
            design.votes.up = (design.votes.up ?? 0) + 1;
        } else if (type === 'down') {
            design.votes.down = (design.votes.down ?? 0) + 1;
        }

        const voteCount = design.votes.up - design.votes.down; // Calculate the total vote count

        await design.save();

        res.status(200).json({ success: true, votes: voteCount });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error.' });
    }
}




// Controller for adding a comment to a design
async function addComment(req, res) {
    try {
        const designId = req.params.id;
        const { userId, comment } = req.body;
        // Add logic to store comment in MongoDB
        res.status(201).json({ success: true, message: 'Comment added successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error.' });
    }
}

module.exports = { uploadDesignFromLink, getAllDesigns, voteDesign, addComment,getDesignById };
