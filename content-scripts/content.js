// Check if the div with id 'dropbox' already exists before creating it
if (!document.getElementById('dropbox')) {
    // Create a new div element
    let div = document.createElement('div');

    // Assign any attributes/styles
    div.id = 'dropbox';
    div.textContent = 'This is my custom element';        

    // Append the div to the document body or any other desired location in the DOM
    document.body.appendChild(div);
}

