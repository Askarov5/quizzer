import React, { useRef, useState } from 'react'
import { Form, Card, Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Signin() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const { signin } = useAuth();
    const [ error, setError ] = useState('');
    const [ loading, setLoading ] = useState(false);
    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setError("");
            setLoading(true);
            await signin(emailRef.current.value, passwordRef.current.value);
            navigate('/dashboard');
        } catch( err ) {
            setError("Failed to sign in: " + err)
        }
        setLoading(false);
    }

    return (
        <div>
            <Card>
                <Card.Body>
                    <h2 className='text-center md-4'>Sign In</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref = { emailRef } required/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref = { passwordRef } required/>
                        </Form.Group>
                        <Form.Group>
                            <Button disabled={ loading } className = "w-100 mt-3" type="submit">Sign Up</Button>
                        </Form.Group>
                    </Form>
                    <div className='w-100 text-center mt-2'>
                        <Link to="/forgot-password">Forgot password?</Link>
                    </div>
                </Card.Body>
            </Card>
            <div className='text-center'>
                Need an account? <Link to="/signup">Sign up</Link>
            </div>    
        </div>
    )
}