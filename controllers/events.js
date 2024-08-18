const Event = require("../models/event");
const Club = require("../models/club");
const Department = require('../models/Department');
const Cluster = require('../models/Cluster');
const Institute = require('../models/Institute');
const DepartmentalSocieties = require('../models/DepartmentalSocieties');
const ProfessionalSocieties = require('../models/ProfessionalSocieties');
const Communities = require('../models/Communities');
const { imageUpload } = require("./UploadToCloudinary");

exports.createEvent = async (req, res) => {
    try {
        const { name, entityType, entityName, organizerType, organizerName, date, venue, Eventtype, category } = req.body;
        const imageUploadResult = await imageUpload(req);
        if (!imageUploadResult.success) {
            return res.status(400).json(imageUploadResult);
        }
        const imageUrl = imageUploadResult.imageUrl;
        let entity;
        if (entityType === "club") {
            entity = await Club.findOne({ ProposedClubName: entityName });
            if (!entity) {
                return res.status(500).json({
                    success: false,
                    message: `Club not found`,
                });
            }
        } else if (entityType === "community") {
            entity = await Communities.findOne({ ProposedCommunityName: entityName });
            if (!entity) {
                return res.status(500).json({
                    success: false,
                    message: `Community not found`,
                });
            }
        } else if (entityType === "department-society") {
            entity = await DepartmentalSocieties.findOne({ ProposedSocietyName: entityName });
            if (!entity) {
                return res.status(500).json({
                    success: false,
                    message: `Department-society not found`,
                });
            }
        } else if (entityType === "professional-society") {
            entity = await ProfessionalSocieties.findOne({ ProposedSocietyName: entityName });
            if (!entity) {
                return res.status(500).json({
                    success: false,
                    message: `Professional-society not found`,
                });
            }
        }

        let organizer;
        if (organizerType === "Cluster") {
            organizer = await Cluster.findOne({ name: organizerName });
            if (!organizer) {
                return res.status(500).json({
                    success: false,
                    message: `Organizer not found`,
                });
            }
        } else if (organizerType === "Department") {
            organizer = await Department.findOne({ name: organizerName });
            if (!organizer) {
                return res.status(500).json({
                    success: false,
                    message: `Organizer not found`,
                });
            }
        } else {
            organizer = await Institute.findOne({ name: organizerName });
            if (!organizer) {
                return res.status(500).json({
                    success: false,
                    message: `Organizer not found`,
                });
            }
        }

        const newEvent = new Event({
            name,
            imageUrl,
            date,
            entity: {
                type: entityType,
                id: entity._id
            },
            organizer: {
                type: organizerType,
                id: organizer._id
            },
            venue,
            Eventtype,
            category
        });

        const savedEvent = await newEvent.save();
        return res.status(201).json({
            success: true,
            message: 'Event created successfully',
            event: savedEvent
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: `Error creating event: ${err.message}`,
        });
    }
};

exports.getMonthly = async (req, res) => {
    try {
        const currentDate = new Date();
        const { category } = req.query;

        const matchStage = { 
            Eventtype: 'monthly',
            date: { $gte: currentDate }  // Only future events
        };

        if (category) {
            matchStage.category = category;  // Filter by category if provided
        }

        const monthlyEvents = await Event.aggregate([
            { $match: matchStage },
            {
                $addFields: {
                    dateDifference: {
                        $abs: { $subtract: [{ $toLong: "$date" }, { $toLong: currentDate }] }
                    }
                }
            },
            { $sort: { dateDifference: 1 } },  // Sort by the closest date first
            { $limit: 3 }  // Limit to 3 events
        ]);

        return res.status(200).json({
            success: true,
            events: monthlyEvents
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: `Error retrieving monthly events: ${err.message}`,
        });
    }
};

exports.getWeekly = async (req, res) => {
    try {
        const currentDate = new Date();
        const { category } = req.query;

        const matchStage = { 
            Eventtype: 'weekly',
            date: { $gte: currentDate }  // Only future events
        };

        if (category) {
            matchStage.category = category;  // Filter by category if provided
        }

        const weeklyEvents = await Event.aggregate([
            { $match: matchStage },
            {
                $addFields: {
                    dateDifference: {
                        $abs: { $subtract: [{ $toLong: "$date" }, { $toLong: currentDate }] }
                    }
                }
            },
            { $sort: { dateDifference: 1 } },  // Sort by the closest date first
            { $limit: 3 }  // Limit to 3 events
        ]);

        return res.status(200).json({
            success: true,
            events: weeklyEvents
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: `Error retrieving weekly events: ${err.message}`,
        });
    }
};

exports.getFlagship = async (req, res) => {
    try {
        const currentDate = new Date();
        const { category } = req.query;

        const matchStage = {
            Eventtype: 'flagship',
            date: { $gte: currentDate }  // Only future events
        };

        if (category) {
            matchStage.category = category;  // Filter by category if provided
        }

        const flagshipEvents = await Event.aggregate([
            { $match: matchStage },
            {
                $addFields: {
                    dateDifference: {
                        $abs: { $subtract: [{ $toLong: "$date" }, { $toLong: currentDate }] }
                    }
                }
            },
            { $sort: { dateDifference: 1 } },  // Sort by the closest date first
            { $limit: 3 }  // Limit to 3 events
        ]);

        return res.status(200).json({
            success: true,
            events: flagshipEvents
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: `Error retrieving flagship events: ${err.message}`,
        });
    }
};
