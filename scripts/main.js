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
    window.onresize = function(event) {
      updateDivHeights(data);
    }
  })
  .catch(error => {
    console.error('Error fetching JSON data:', error); // Display error.
  });


  // =======================================================================================================================================================

// Define a function to update the div heights
function updateDivHeights(data) {
  const maxHeight = Math.max(...data.map(item => item.amount));
  const divs = document.querySelectorAll(".chart-bar"); // Replace with your div class or selector

// For each loop, that goes through each div
  divs.forEach((item, index) => {
    const amount = data[index].amount;
    height = 0;

   
    // If windows is wider, the bars are shorter!
    if((window.innerWidth >= 600) && (window.innerWidth <= 1000)){ 
    height = (amount / maxHeight) * 20 + "vw"; 
    }

    else if((window.innerWidth >= 1001) && (window.innerWidth <= 1500)){ 
      height = (amount / maxHeight) * 15 + "vw"; 
    }

    else if((window.innerWidth >= 1501) && (window.innerWidth <= 2400)){ 
      height = (amount / maxHeight) * 12 + "vw"; 
    }


    else if((window.innerWidth >= 2401) && (window.innerWidth <= 3500)){ 
      height = (amount / maxHeight) * 10 + "vw"; 
    }





    // If window is narrower, the bars are longer!
    else{ 
    height = (amount / maxHeight) * 25 + "vw"; 
    }
    
    divs[index].style.height = height; // Basically saying that the height of this div at this position should be equal to the height variable.
    

    // For each loop that goes thru each div again
    divs.forEach((div) => {
      const dayFromData = div.getAttribute("data-day"); // Getting the date
     
     // This if looks if the div's name which is assigned from the JSON file, and checks if it's equal to today.
     // If it is equal to today, it will add a class name 'today' to the specific div.
     // If not it will do the same, but instead it will be 'other-day'.
      if (dayFromData === currentDay) {
        div.classList.add('today'); // Add a CSS class for today's div
      } else {
        div.classList.add('other-day'); // Add a CSS class for other days
      }
    });
  });
  
}
