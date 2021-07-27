const databaseLabels = {
    "type": "atype",
    "availability": "availability",
    "breed": "breed",
    "disposition": "disposition"
}

// return the type integer value based on string
export const findIndex = (selection, options, type) => {
    let index = options.findIndex(x => x[databaseLabels[type]] === selection);
    return options[index]?.id;
};