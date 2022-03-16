import React, { useState } from 'react'
import { Alert, Button, Card } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Dashboard() {
    const [error, setError] = useState();
    const { currentUser, signout } = useAuth();
    const navigate = useNavigate();

    async function handleSignOut(){
        setError("");

        try {
            await signout()
            navigate("/signin");
        } catch (error) {
            setError("Failed to sign out:" + error)
        }
    }

  return (
    <div>
        <Card>
            <Card.Body>
                <h2>Profile</h2>
                <p> <strong>Email:</strong> { currentUser.email } </p>
                <Link to="/update-profile" className='btn btn-primary' > Update Profile</Link>
            </Card.Body>
        </Card>
        <div className='w-100 text-center mt-2'>
            { error && <Alert variant="danger">{error}</Alert>}
            <Button variant='link' onClick={handleSignOut}>Sign Out</Button>    
        </div>
    </div>
  )
}
