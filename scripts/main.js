// Define the path to your JSON file
const jsonFilePath = 'data.json';

// Fetch the JSON data
fetch(jsonFilePath)
  .then(response => {
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.status}`);
    }
    return response.json(); // Parse the JSON response
  })
  .then(data => {
    // Handle your JSON data here
    console.log(data); // Display the data in the console as an example
    // You can call your function to process the data here
    updateDivHeights(data);
  })
  .catch(error => {
    console.error('Error fetching JSON data:', error);
  });

// Define a function to update the div heights
function updateDivHeights(data) {
  const maxHeight = Math.max(...data.map(item => item.amount));
  const divs = document.querySelectorAll(".chart-bar"); // Replace with your div class or selector

  divs.forEach((div, index) => {
    const amount = data[index].amount;
    const height = (amount / maxHeight) * 50 + "vw"; // Assuming your CSS uses percentage-based heights

    div.style.height = height;
  });
}
