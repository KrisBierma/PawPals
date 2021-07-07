import React from "react";
import { Button, Card } from "react-bootstrap";

export default function BasicCard({
    title = '',
    body = '',
    button = <></>,
    icon = <></>
}) {
    return (
        <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src="https://s3.amazonaws.com/cdn-origin-etr.akc.org/wp-content/uploads/2017/11/31120615/French-Bulldog-standing-in-profile-outdoors-in-the-fall.jpg" />
        <Card.Body>
            {title && <Card.Title>{title}</Card.Title>}
            {body && <Card.Text>{body}</Card.Text>}
            {button && button}
            {icon && icon}
        </Card.Body>
        </Card>
    )
}