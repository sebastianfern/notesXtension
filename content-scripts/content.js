// Function to handle the "Submit" button click event
function handleSubmission() {
    // Get the value entered in the input field
    const inputField = document.querySelector('.input-field');
    const inputValue = inputField.value;
  
    // Create a new h2 element
    const resultHeading = document.createElement('h2');
  
    // Set the submitted value as the text content of the h2 element
    resultHeading.textContent = inputValue;

    // Assign an ID for CSS styling
    resultHeading.id = 'submitted-value';
    // Get the div with class "start-screen"
  const startScreenDiv = document.querySelector('.start-screen');

  // Get the input field
  const inputFieldElement = document.querySelector('.input-field');

  // Insert the h2 element before the input field
  startScreenDiv.insertBefore(resultHeading, inputFieldElement);
}
  
  // Check if the div with id 'dropbox' already exists before creating it
  if (!document.getElementById('dropbox')) {
    // Create a new div element
    let div = document.createElement('div');
  
    // Assign any attributes/styles
    div.id = 'dropbox';
  
    // Fetch the content.html file
    fetch(chrome.runtime.getURL('content-scripts/content.html'))
      .then(response => response.text())
      .then(html => {
        // Set the content of the div to the loaded HTML from content.html
        div.innerHTML = html;
  
        // Add event listener to the "Submit" button
        const submitButton = div.querySelector('.submit-button');
        submitButton.addEventListener('click', handleSubmission);
      })
      .catch(error => {
        console.error('Error loading content.html:', error);
        // If there's an error loading the file, you can provide a fallback message or handle it accordingly.
        div.textContent = 'Error loading content.';
      });
  
    // Append the div to the document body or any other desired location in the DOM
    document.body.appendChild(div);
  }
  