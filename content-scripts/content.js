// (function () {
//   if (window.myExtensionScriptInjected) return;
//   window.myExtensionScriptInjected = true;

  console.log("Document body exists:", Boolean(document.body));

  fetch(chrome.runtime.getURL('content-scripts/content.html'))
    .then(response => response.text())
    .then(html => {
      div.innerHTML = html;

      submitButton = div.querySelector('.submit-button');
      console.log("Submit button element:", submitButton);

      if (submitButton) {
        submitButton.addEventListener('click', handleSubmission);
      } else {
        console.error('Submit button not found');
      }
    })
    .catch(error => {
      console.error('Error loading content.html:', error);
    });

  let div = document.createElement('div');
  div.id = 'dropbox';
  console.log("Div element:", div);

  document.body.appendChild(div);

  let activeInput = 'first';
  let currentInputField;
  let submitButton;
  let savedTitle;

  // Function to handle the "Submit" button click event
  function handleSubmission() {
    console.log("Handle Submission called");
    currentInputField = document.querySelector('.input-field');
    console.log("Current input field element:", currentInputField);

    if (!currentInputField || !currentInputField.value.trim()) {
      console.error("Input field is empty or not defined");
      return;
    }

    if (activeInput === 'first') {
      // Get the value entered in the input field
      const inputValue = currentInputField.value;
      savedTitle = inputValue;  // Save the title for later use

      // Create a new h2 element or get the existing one if it exists
      let resultHeading = document.querySelector('#submitted-value');
      if (!resultHeading) {
        resultHeading = document.createElement('h2');
        resultHeading.id = 'submitted-value';
        // Insert the new h2 element before the previous input field
        const startScreenDiv = document.querySelector('.start-screen');
        startScreenDiv.insertBefore(resultHeading, currentInputField);

        // Change the text and color of the submit button
        submitButton.textContent = 'Download';
        submitButton.style.backgroundColor = 'red';
      }

      // Set the submitted value as the text content of the h2 element
      resultHeading.textContent = inputValue;

      // Create a new large empty input field or update the existing one if it exists
      let largeInputField = document.querySelector('#lg-input-field');
      if (!largeInputField) {
        largeInputField = document.createElement('input');
        largeInputField.type = 'text';
        largeInputField.placeholder = 'Enter your notes...';
        largeInputField.classList.add('lg-input-field');

        // Insert the large input field below the new h2 element
        const startScreenDiv = document.querySelector('.start-screen');
        startScreenDiv.insertBefore(largeInputField, currentInputField);

        // Remove the original input field and submit button
        currentInputField.remove();
        // submitButton.remove();

        // Store the reference to the new input field
        currentInputField = largeInputField;
      }

      // Switch to the second input field for the next submission
      activeInput = 'second';
      submitButton.removeEventListener('click', handleSubmission);
      submitButton.addEventListener('click', handleDownload);
    } else if (activeInput === 'second') {
      // Switch back to the first input field for the next submission
      activeInput = 'first';
      submitButton.removeEventListener('click', handleDownload);
      submitButton.addEventListener('click', handleSubmission);
    }
  }

  function handleDownload() {
    console.log("Handle Download called");
    let largeInputField = document.querySelector('.lg-input-field');
    console.log("lg-input-field element:", largeInputField);

    if (!largeInputField || !largeInputField.value.trim()) {
      console.error("lg-input-field is empty or not defined");
      return;
    }

    const notesValue = largeInputField.value;

    const blob = new Blob([notesValue], { type: "text/plain;charset=utf-8" });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = savedTitle ? `${savedTitle}.txt` : "notesXtension.txt";  // Use savedTitle if available

    document.body.appendChild(a);
    a.click();

    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };
// })();