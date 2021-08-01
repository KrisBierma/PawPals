import React from "react";
import { Card } from "react-bootstrap";
import '../../styles/PetProfile.css'

export default function BasicCard({
    title = '',
    body = '',
    button = <></>,
    icon = <></>,
    image = '',
    className = {},
    onCardClick = () => {}
}) {
    return (
        <Card className={className.card} onClick={onCardClick}>
            {image && <div className='pet-profile-image' style={{backgroundImage: `url( ${image} )`}}></div>}

            <Card.Body className='d-flex justify-content-between'>
                {title && <Card.Title className='m-0'>{title}</Card.Title>}
                {icon && icon}   
                {/* <div className='bodyContainer'>
                    
                    {body && <Card.Text className={className.body}>{body}</Card.Text>}
                    {button && button}
                </div> */}
            </Card.Body>
        </Card>
    )
}