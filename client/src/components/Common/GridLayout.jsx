import React from "react";
import { CardDeck } from "react-bootstrap";
import { PetProfileSmallCard } from "../../components"

export default function GridLayout({
    cardData = []
}) {
    return (
        <CardDeck>
            {cardData.map((x) => {
                return <PetProfileSmallCard animal={x} />;
            })}
        </CardDeck>
    );
}