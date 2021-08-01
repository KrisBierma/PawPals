import React from "react";
import { ListGroup, Image } from "react-bootstrap";
import "../../styles/BasicHorizontalList.css"

export default function BasicHorizontalList({
    keyid = null,
    image = '',
    itemKeys = {},
    items = {},
    className = {},
    radio = <></>,
    button = <></>
}) {
    return (
        <div className={`${className.listContainer} align-items-center gap-3`}>
            {image && <img alt='' src={image} className="BasicHorizontalList-pet-image" />}
            <ListGroup horizontal key={keyid} className={className.listGroup}>
                {Object.keys(itemKeys).map((key) => {
                    return (
                        <ListGroup.Item className={className.listItem} key={key}>
                            <div className={className.field}>{itemKeys[key]}</div>
                            <div className={className.value}>{items[key]}</div>
                        </ListGroup.Item>
                    );
                })}
            </ListGroup>
            {radio}
            {button}
        </div>
    )
}