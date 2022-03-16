import React, { useRef, useState } from 'react'
import { Form, Card, Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function ForgotPassword() {
    const emailRef = useRef();
    const { resetPassword } = useAuth();
    const [ error, setError ] = useState('');
    const [ message, setMessage ] = useState('');
    const [ loading, setLoading ] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setMessage("");
            setError("");
            setLoading(true);
            await resetPassword(emailRef.current.value);
            setMessage("Check your inbox for further instructions");
        } catch( err ) {
            setError("Failed to sign in: " + err)
        }
        setLoading(false);
    }

    return (
        <div>
            <Card>
                <Card.Body>
                    <h2 className='text-center md-4'>Password Reset</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {message && <Alert variant="success">{message}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref = { emailRef } required/>
                        </Form.Group>
                        <Form.Group>
                            <Button disabled={ loading } className = "w-100 mt-3" type="submit">Reset Password</Button>
                        </Form.Group>
                    </Form>
                    <div className='w-100 text-center mt-2'>
                        <Link to="/signin">Sign In?</Link>
                    </div>
                </Card.Body>
            </Card>
            <div className='text-center'>
                Need an account? <Link to="/signup">Sign up</Link>
            </div>    
        </div>
    )
}