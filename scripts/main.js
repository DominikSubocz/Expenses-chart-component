// Define the path to your JSON file
const jsonFilePath = 'data.json';

const currentDate =  new Date();
const curerntDay = currentDate.getDay();

const dayClasses = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

// Fetch the JSON data
fetch(jsonFilePath)
  .then(response => {
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.status}`); // Display error message if response was not ok.
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

  divs.forEach((item, index) => {
    const amount = data[index].amount;
    const height = (amount / maxHeight) * 30 + "vw"; // Assuming your CSS uses percentage-based heights

    divs[index].style.height = height;

    if(dayClasses[index] === item.curerntDay){
      divs[index].classList.add('today');
    }

    else{
      divs[index].classList.add('other-day');
    
    }

  });
  
}
