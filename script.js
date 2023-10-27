// Json server command json-server --watch db.json --port 8000
// Animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    console.log(entry);
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    } /* else {
      entry.target.classList.remove('show');
    } */
  });
});

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));

document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('contact-form');
  const response = document.getElementById('response');
  const jsonDisplay =
    document.getElementById('json-display');

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message =
      document.getElementById('message').value;

    const data = {
      name: name,
      email: email,
      message: message,
    };

    // Send the data to the server using a POST request
    fetch('http://localhost:8000/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the server
        response.innerHTML = `Thank you, ${name}! Your message has been received. Server response: ${data.message}`;
      })
      .catch((error) => {
        // Handle any errors that occur during the fetch.
        response.innerHTML =
          'An error occurred while sending the data.';
      });

    // Save the data locally (you can use a more robust storage method in a real application)
    const storedData =
      JSON.parse(localStorage.getItem('storedData')) || [];
    storedData.push(data);
    localStorage.setItem(
      'storedData',
      JSON.stringify(storedData)
    );

    // Display the JSON data in a box
    jsonDisplay.innerHTML = JSON.stringify(
      storedData,
      null,
      2
    );

    // Clear the form fields
    form.reset();
  });
});
