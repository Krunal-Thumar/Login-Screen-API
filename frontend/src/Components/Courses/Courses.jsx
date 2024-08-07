import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Courses = () => {
    const { username } = useParams(); // Get username from URL
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get(`http://localhost:5001/api/faculty/${username}/courses`);
                console.log(response.data);
                setCourses(response.data);
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };

        fetchCourses();
    }, [username]);

    return (
        <div>
            <h1>Courses Information for {username}</h1>
            <ul>
                {courses.map(course => (
                    <li key={`${course.code}-${course.name}`}>{course.code} ({course.name})</li>
                ))}
            </ul>
        </div>
    );
};

export default Courses;