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
    onCardClick = () => { },
    availability
}) {
    return (
        <Card className={className.card} onClick={onCardClick}>
            {image && <div className='pet-profile-image' style={{ backgroundImage: `url( ${image} )` }}></div>}

            <Card.Body>
                <div className='d-flex justify-content-between'>
                    {title && <Card.Title className='m-0'>{title}</Card.Title>}
                    {icon && icon}

                </div>
                {availability && (
                <div className='bodyContainer'>
                    <Card.Text className={`${className.body} mt-2 text-center`}>{availability}</Card.Text>
                </div>

                )}
            </Card.Body>
        </Card>
    )
}