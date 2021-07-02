import React from "react";
import { InputGroup, FormControl } from "react-bootstrap";

// creates various form items (input, dropdown, etc)
export default function ItemsWithControl({
    type,
    name = '',
    label = ''
  }) {
        switch (type) {
            case 'input': 
                return (
                <>  
                    {label && <label>{label}</label>}
                    <InputGroup className="mb-3">
                        <FormControl
                            placeholder={name}
                            aria-label={name}
                        />
                    </InputGroup>
                </>
                );
        }
  }