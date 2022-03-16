import { doc, setDoc } from 'firebase/firestore';
import React, { useRef, useState } from 'react'
import { Form, Card, Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase';

export default function Signup() {
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef  = useRef();
    const { signup, currentUser } = useAuth();
    const [ error, setError ] = useState('');
    const [ loading, setLoading ] = useState(false);
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        if(passwordRef.current.value !== passwordConfirmRef.current.value)
            return setError("Passwords do not match");
        try {
            setLoading(true);
            await signup(emailRef.current.value, passwordRef.current.value);
            navigate('/dashboard');
        } catch( err ) {
            setError("Failed to create an account: " + err)
        }
        setLoading(false);
    }

    return (
        <div>
            <Card>
                <Card.Body>
                    <h2 className='text-center md-4'>Sign Up</h2>
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
                            <Form.Label>Password Confirmation</Form.Label>
                            <Form.Control type="password" ref = { passwordConfirmRef } required/>
                        </Form.Group>
                        <Form.Group>
                            <Button disabled={ loading } className = "w-100 mt-3" type="submit">Sign Up</Button>
                        </Form.Group>
                        
                    </Form>
                </Card.Body>
            </Card>
            <div className='text-center'>
                Already have an account? <Link to="/signin">Sign in</Link>
            </div>    
        </div>
    )
}