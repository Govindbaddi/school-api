const db = require("../config/db");
const getDistance = require("../utils/distance");

const addSchool = (req, res) => {
    console.log(req.body,"checking")
    const { name, address, latitude, longitude } = req.body;
    if (!name || !address || latitude === undefined || longitude === undefined) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    if (isNaN(latitude) || isNaN(longitude)) {
        return res.status(400).json({
            message: "Latitude and Longitude must be numbers"
        });
    }
    const query = `INSERT INTO schools (name,address,latitude,longitude)
                   VALUES (?,?,?,?)`;
    db.query(query, [name, address, latitude, longitude], (err, result) => {

        if (err) {
            return res.status(500).json({
                message: "Database error",
                error: err
            });
        }

        res.status(201).json({
            message: "School added successfully",
            schoolId: result.insertId
        });
    });
};


const listSchools = (req, res) => {
    const { latitude, longitude } = req.query;
    if (!latitude || !longitude) {
        return res.status(400).json({
            message: "User latitude and longitude required"
        });
    }
    db.query("SELECT * FROM schools", (err, schools) => {
        if (err) {
            return res.status(500).json(err);
        }
        const userLat = parseFloat(latitude);
        const userLon = parseFloat(longitude);
        const schoolsWithDistance = schools.map(school => {
            const distance = getDistance(
                userLat,
                userLon,
                school.latitude,
                school.longitude
            );

            return { ...school, distance };
        });

        schoolsWithDistance.sort((a, b) => a.distance - b.distance);

        res.json(schoolsWithDistance);
    });
};
module.exports={addSchool,listSchools}