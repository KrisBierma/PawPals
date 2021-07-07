import React from "react";
import { Card } from "react-bootstrap";

export default function BasicCard({
    title = '',
    body = '',
    button = <></>,
    icon = <></>,
    image = ''
}) {
    return (
        <Card style={{ width: '18rem' }}>
        {image && <Card.Img variant="top" src={image} />}
        <Card.Body>
            {title && <Card.Title>{title}</Card.Title>}
            {body && <Card.Text>{body}</Card.Text>}
            {button && button}
            {icon && icon}
        </Card.Body>
        </Card>
    )
}