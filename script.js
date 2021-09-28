 var formEl = $("#search-city");
 var weatherEl = $("#weather");
 var cityNameEl = $("#city-name");
 var cityListEl = $("#city-list");
 var responseEl = $("<p>");

 function printNames(name){
     //console.log("print names");
     var listEl = $('<li>').addClass('my-3 w-75 btn btn-info').text(name);
    cityListEl.append(listEl);
    formEl.append(cityListEl);
 }
 function currentWeather(name){
   var requestUrl = "https://api.openweathermap.org/data/2.5/weather?q=name&appid=8eeda8c33024abb85ba58c60e0b669ac";
   fetch (requestUrl)
       .then(function(response){
           return response.json();
   })
   .then(function(data){
       console.log(data);

    weatherEl.addClass("brder");
    var cityWeather = $("#weather").addClass("h2 font-weight-600").text(name);
    var date = moment().format('l');
    var currentDate = $("<p>").addClass("h3").text('('+ date +')');
    var tempEl = $("<p>").addClass("h5").text('Temp:'+ " "+temp);
   var windEl = $("<p>").addClass("h5").text("Wind:"+" "+wind);
  //  var humidityEl = $("<p>").addClass("h5").text("Humidity:"+" "+ humid);
    //var uvEl = $("<p>");
    weatherEl.append( cityWeather, currentDate, tempEl, windEl);
    //humidityEl);
   });
}



 
 
 function handleFormSubmit(event){
     event.preventDefault();
     console.log("you are here");
     var cityName = cityNameEl.val();
     if(!cityName){
         console.log("inside if loop");
        responseEl.text("Please enter a City name!");
        formEl.append(responseEl);
         return;
     }

        printNames(cityName);
        currentWeather(cityName);
        cityNameEl.val("");

    }
 
    formEl.on('submit', handleFormSubmit);

 
 //Autocomplete widget
 $(function () {
     var cityNames = [  
         'Melbourne',
         'Sydney',
         'London',
         'Brisbane',
         'Seattle',
         'New York',
         'Barcelona',
         'Beijing',
         'Cape Town',
         'Paris',
         'Prague',
         'Queenstown'
     ];
     $('#city-name').autocomplete({
         source:cityNames,
    });
});
