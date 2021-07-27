import React from "react";
import { InputGroup, FormControl } from "react-bootstrap";
import "../../styles/ItemsWithControl.css"

// creates various form items (input, dropdown, etc)
export default function ItemsWithControl({
    type,
    name = '',
    label = '',
    handleChange,
    value = '',
    className = '',
  }) {
        switch (type) {
            case 'input': 
                return (
                <>  
                    {label && <label>{label}</label>}
                    <InputGroup className="mb-3">
                        <FormControl
                            className={className}
                            placeholder={name}
                            onChange={handleChange}
                            aria-label={name}
                            value={value}
                        />
                    </InputGroup>
                </>
                );
            default: 
                // do nothing
        }
  }