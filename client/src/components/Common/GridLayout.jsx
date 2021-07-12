import React from "react";
import { Container, Row } from "react-bootstrap";
import { PetProfileSmallCard } from "../../components"

export default function GridLayout({
    cardData = []
}) {
    return (
        <Container>
            <Row xs={2} md={4} lg={6}>
            {cardData.map((x) => {
                return <PetProfileSmallCard animal={x} />;
            })}
            </Row>
        </Container>
    );
}