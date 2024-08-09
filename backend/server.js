const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const axios = require('axios');

const app = express();
const port = 5001;

app.use(cors());
app.use(express.json());

// PostgreSQL Connection
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'evalexpertsDB',
    password: 'tiger',
    port: 5432,
});

// Root route
app.get('/', (req, res) => {
    res.send('RIT API is being used')
})

// API endpoint to validate login
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const result = await pool.query('SELECT * FROM instructor WHERE username = $1 AND password = $2', [username, password]);
        if (result.rows.length > 0) {
            const professorName = result.rows[0].ins_name; // 'ins_name' is the column name for faculty's name
            res.json({ message: `Hello ${professorName}`});
        } else {
            res.status(401).json({ message: 'Sorry! Login Incorrect'});
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

app.post('/api/adduser', async (req, res) => {
    const { username, password } = req.body;

    try{
        //use bcrypt to hash the password here and enter that password in the db
        const hashedPassword = '';
        const result = await pool.query("INSERT into instructor (ins_name, username, is_adjunct, is_admin, has_left, password) VALUES ('testuser', $1, 'N', 'N', 'N', $2 )", [username, hashedPassword]);

    } catch(error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

// API endpoint to fetch courses for the login authenticated faculty member
/**=
app.get('/api/faculty/:username/courses', async (req, res) => {
    const username = req.params.username;
    const apiKey = 'VRP8wRWPstP4H2XQSA18Qy7s088v5jYhMzOgs3Ka';
    try {
        const response = await axios.get(`http://api.rit.edu/v1/faculty/${username}/courses`, {
            headers: {
                'RITAuthorization': apiKey
            }
        });

        if (response.data) {
            res.json(response.data);
        } else {
            res.status(404).json({ message: 'No courses found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});
*/

/**
app.get('/api/faculty/:username/courses', async (req, res) => {
    const username = req.params.username;
    const apiKey = 'VRP8wRWPstP4H2XQSA18Qy7s088v5jYhMzOgs3Ka';
    try {
        const response = await axios.get(`http://api.rit.edu/v1/faculty/${username}/courses`, {
            headers: {
                'RITAuthorization': apiKey
            }
        });

        const courses = response.data.map(course => ({
            code: course.section.split('-')[0],
            name: course.name
        }));

        res.json(courses);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});
*/

app.get('/api/faculty/:username/courses', async (req, res) => {
    const username = req.params.username;
    const apiKey = 'VRP8wRWPstP4H2XQSA18Qy7s088v5jYhMzOgs3Ka';
    try {
        const response = await axios.get(`http://api.rit.edu/v1/faculty/${username}/courses`, {
            headers: {
                'RITAuthorization': apiKey
            }
        });

        const courses = response.data.reduce((acc, course) => {
            const sectionParts = course.section.split('-');
            const courseCode = sectionParts.length > 1 ? sectionParts[0] + '-' + sectionParts[1] : course.section;
            const courseName = course.name || 'Unknown';

            // Check if the course is already in the accumulator
            if (!acc.some(c => c.code === courseCode && c.name === courseName)) {
                acc.push({ code: courseCode, name: courseName });
            }

            return acc;
        }, []);

        res.json(courses);
    } catch (error) {
        console.log(error);
        res.status(500).send('Server Error');
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});