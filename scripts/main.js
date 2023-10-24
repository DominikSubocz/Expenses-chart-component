// =======================================================================================================================================================

// Define the path to your JSON file
const jsonFilePath = 'data.json';


// Define currentDate as new Date
const currentDate =  new Date();
const currentDay = currentDate.toLocaleString('en-US', { weekday: 'short' }).toLowerCase(); // Gets day as "Mon", "Tue", etc.
// =======================================================================================================================================================
// Fetch the JSON data
// This chunk of code will basically process our JSON file.
// Fetch basically means we are grabbing something (our JSON file) and making it available to our website.

fetch(jsonFilePath)
  .then(response => {
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.status}`); // Display error message if response was not ok.
    }
    return response.json(); // Parse the JSON response
  })
  .then(data => {
    console.log(data); // Display the data in the console as an example
    updateDivHeights(data);
  })
  .catch(error => {
    console.error('Error fetching JSON data:', error); // Display error.
  });


  // =======================================================================================================================================================


// Define a function to update the div heights
function updateDivHeights(data) {
  const maxHeight = Math.max(...data.map(item => item.amount));
  const divs = document.querySelectorAll(".chart-bar"); // Replace with your div class or selector

  divs.forEach((item, index) => {
    const amount = data[index].amount;
    const height = (amount / maxHeight) * 35 + "vw"; // Assuming your CSS uses percentage-based heights

    divs[index].style.height = height;
    divs.forEach((div) => {
      const dayFromData = div.getAttribute("data-day");
      if (dayFromData === currentDay) {
        div.classList.add('today'); // Add a CSS class for today's div
      } else {
        div.classList.add('other-day'); // Add a CSS class for other days
      }
    });
  });
  
}
