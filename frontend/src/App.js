import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button, Alert } from 'react-bootstrap';

function App() {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Ask for device location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;

        // Display alert and send location data to the server
        const allowLocation = window.confirm(
          `Your location is ${latitude}, ${longitude}. Do you want to allow this location?`
        );

        if (allowLocation) {
          try {
            const response = await axios.post('http://localhost:5000/api/location', {
              latitude,
              longitude,
            });

            setLocation(response.data);
          } catch (error) {
            setError('Error saving location data. Please try again.');
            console.error('Error saving location data:', error.response.data);
          }
        }
      });
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  }, []);

  return (
    <Container className="mt-5">
      <Row>
        <Col>
          <h1 className="mb-4">MERN Location App</h1>
          {error && <Alert variant="danger">{error}</Alert>}
          {location && (
            <div>
              <h3>Traced Location:</h3>
              <p>
                <strong>Latitude:</strong> {location.latitude}
              </p>
              <p>
                <strong>Longitude:</strong> {location.longitude}
              </p>
              <p>
                <strong>City:</strong> {location.city}
              </p>
              <p>
                <strong>State:</strong> {location.state}
              </p>
              <p>
                <strong>Pincode:</strong> {location.pincode}
              </p>
              <p>
                <strong>Address:</strong> {location.address}
              </p>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default App;
