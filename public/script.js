// Select text input
const textInput = document.getElementById('city');

// selecting the div for errorMessage
const errorMessage = document.querySelector('.errorMessage');

// selecting the weather info div
const weatherInfo = document.querySelector('.weather-info')

let cityName = textInput.value; // store the value of the input 

// When an input event is triggered, update cityName
textInput.addEventListener('input', (e) => {
    cityName = e.target.value;
})

// Select our form
const form = document.querySelector('form');

// When form is submitted, print 'submitted' to the browser console
form.addEventListener('submit', (e) => {
    // prevent form default behavior
    e.preventDefault();
    console.log(cityName); // print input value 

    // Make request to our API
    const url = 'http://localhost:3000/api/v1/weather/?city=';
    axios.get(url + cityName)
        .then((response) => {
            console.log(response.data);

            // select elements
            let city = document.querySelector('.cityName');
            let celsius = document.querySelector('.celsius');
            let fahrenheit = document.querySelector('.fahrenheit');

            if (response.data.city) {
                city.innerHTML = 'City: ' + response.data.city;
                celsius.innerHTML = 'Temperature (C): ' + response.data['temperature (C)'];
                fahrenheit.innerHTML = 'Temperature (F): ' + response.data['temperature (F)'];
            } 
            // else {
            //     errorMessage.innerHTML = 'City does not exit in our database';
            // }
        })
        .catch((error) => {
            // when city doesn't exist in database
            const errorlog = "This city does not exit in our database"

            // logging the error message from the error response
            // console.dir(error.response.data);   //check the message properity here

            // check if the message from error response matches message when city doesn't exist
            if(error.response.data.message === errorlog) {
                // set errorMessage div to display errorlog
                errorMessage.innerHTML = errorlog
                
                // remove initial weather results
                weatherInfo.innerHTML = "";
                
            } else {
                console.log('hello...')
            }
            // errorMessage.innerHTML = 'City does not exit in our database';            
        })

    // clear input
    textInput.value = '';
})