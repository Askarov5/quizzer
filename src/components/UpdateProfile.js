import React, { useRef, useState } from 'react'
import { Form, Card, Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function UpdateProfile() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef  = useRef();
    const { currentUser, updateEmail, updatePassword } = useAuth();
    const [ error, setError ] = useState('');
    const [ loading, setLoading ] = useState(false);
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        if(passwordRef.current.value !== passwordConfirmRef.current.value)
            return setError("Passwords do not match");
        
        try {
          if(emailRef.current.value !== currentUser.email) {
            await updateEmail(emailRef.current.value)
          }

          if(passwordRef.current.value !== currentUser.password) {
            await updatePassword(passwordRef.current.value)
          }

          navigate("/dashboard");
        } catch (error) {
          setError("Failed to update account: " + error)
        } finally {
          setLoading(false);
        }
    }

    return (
        <div>
            <Card>
                <Card.Body>
                    <h2 className='text-center md-4'>Update Profile</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref = { emailRef } required defaultValue={currentUser.email}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref = { passwordRef }
                            placeholder='Leave blank to keep the same'/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Password Confirmation</Form.Label>
                            <Form.Control type="password" ref = { passwordConfirmRef }
                            placeholder='Leave blank to keep the same'/>
                        </Form.Group>
                        <Form.Group>
                            <Button disabled={ loading } className = "w-100 mt-3" type="submit">Update</Button>
                        </Form.Group>
                    </Form>
                </Card.Body>
            </Card>
            <div className='text-center'>
                <Link to="/dashboard">Cancel</Link>
            </div>
        </div>
    )
}