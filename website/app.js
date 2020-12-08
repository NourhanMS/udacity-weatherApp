/* Global Variables */
const WEATHER_API_KEY = '7d2f367dca5e749d5b4b66b947208b69';
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

//Entry point
function generate(){
    let zip = document.getElementById('zip').value;
    fetchWeatherData(zip);
}

//Function to fetch weather data
const fetchWeatherData = (zip) => {
    let URL = `http://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=${WEATHER_API_KEY}`;
    fetch(URL)
    .then((response) => response.json())
    .then((weatherData) => { prepareWebsiteData(weatherData.main.temp) })
}

//helper function used to prepare website data before sending them to the server
function prepareWebsiteData(temp){
    let userResponse = document.getElementById('feelings').value;
    let newDataObject = {
        tempretaure : temp,
        date : newDate,
        userResponse 
    }
    addWeatherData('/addData',newDataObject).then(res => {
        updateUI('/data');
    })
}

//function to send a post request to our server and save weather data
const addWeatherData = async ( url = '', data = {})=>{

    const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    credentials: 'same-origin', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header        
  });

    try {
      const newData = await response.json();
      return newData
    }catch(error) {
    console.log("error", error);
    // appropriately handle the error
    }
}

//function used to update the ui of our site
function updateUI(url){
    fetch(url)
    .then((response) => response.json())
    .then(webUpdatedData => {
        document.getElementById('temp').innerHTML = "Temperature: "  + webUpdatedData.tempretaure;
        document.getElementById('date').innerHTML = "Date:" + webUpdatedData.date;
        document.getElementById('content').innerHTML = "Content: " + webUpdatedData.userResponse;
    })
}
