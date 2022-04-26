import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import * as contentfulManagement from 'contentful-management';
import { useNavigate } from "react-router-dom";

function ContactsComponent() {

  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  let [Name, setName] = useState('');
  let [EmailAddress, setEmailAddress] = useState('');
  let [PhoneNumber, setPhoneNumber] = useState('');
  let [Comments, setComments] = useState('');
  
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
    event.preventDefault();
    if (form.checkValidity() === true)
    {
      saveItem();
    }
    

  };

  const saveItem = () =>{

    const cmaClient = contentfulManagement.createClient({
      accessToken: 'CFPAT-S5TFiDwbI88Uj-0XSckV8Urhi09tyuN2DHf9aJ92Um0'
  });

  cmaClient.getSpace('9gf6mhyw2bkx')
        .then((space) => space.getEnvironment('master'))
        .then((environment) => environment.createEntry('yesgeContactus', {
            fields: {
                name: {
                    'en-US': Name
        
                },
                emailAddress: {
                    'en-US': EmailAddress
        
                },
                phoneNumber: {
                  'en-US': PhoneNumber
      
              },
                comments: {
                    'en-US': Comments
        
                }
            }
        }))
        .then((entry) => {
            console.log(entry)
            alert ("added item successfully");
            entry.publish();
            navigate("/");
        }
       )
        .catch(console.error)


  }

  const handleChange = (event) => {
    if (event.target.id === "name")
    {
    setName(event.target.value);
    }
    else if (event.target.id==="emailaddress"){
      setEmailAddress(event.target.value);
    }
    else if (event.target.id==="phonenumber"){
      setPhoneNumber(event.target.value);
    }
    else if (event.target.id==="comments"){
      setComments(event.target.value);
    }
  }
  return (
    <div>
      <Container>
      <Row className="mt-3">
        <Col>
        <h1>Contact Us</h1>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col>
        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
        </Col>
      </Row>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Row className="mb-3 mt-2">
        <Form.Group as={Col} md="8" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Name"
            value={Name}
            onChange={handleChange}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} md="8" controlId="emailaddress">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            required
            type="email"
            placeholder="Email Address"
            value={EmailAddress}
            onChange={handleChange}
            />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="8" controlId="phonenumber">
          <Form.Label>Phone Number </Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Phone Number"
            value={PhoneNumber}
            onChange={handleChange}
            />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="8" controlId="comments">
          <Form.Label>Comments</Form.Label>
          <Form.Control 
            as ='textarea'
            required
            row="10"
            placeholder="Comments"
            value={Comments}
            onChange={handleChange}
            />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>

     </Row>
     
    
      <Button type="submit">Submit</Button>
    </Form>


    </Container>
    </div>
  );
}

export default ContactsComponent;
