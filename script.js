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
   var requestUrl = "https://api.openweathermap.org/data/2.5/weather?q="+name+"&appid=8eeda8c33024abb85ba58c60e0b669ac&units=metric";
   fetch (requestUrl)
       .then(function(response){
           return response.json();
   })
   .then(function(data){
       console.log(data);

    weatherEl.addClass("brder");
    var cityWeather = $("#weather").addClass("h2 font-weight-600").text(name);
    var date = moment().format('l');
    var currentDate = $("<p>").addClass("h4").text('('+ date +')');
    var tempEl = $("<p>").addClass("h6").text('Temp:'+ " "+ data.main.temp+"°C");
    var windEl = $("<p>").addClass("h6").text("Wind:"+" "+ data.wind.speed+"km/h");
    var humidityEl = $("<p>").addClass("h6").text("Humidity:"+" "+ data.main.humidity+"%");
   
    
fetch("https://api.openweathermap.org/data/2.5/onecall?lat="+data.coord.lat+"&lon="+data.coord.lon+"&appid=8eeda8c33024abb85ba58c60e0b669ac&units=metric")
   .then(function(response){
       return response.json();
})
.then(function(data){
   console.log(data);
    
    var uvEl= $("<p>").addClass("h6").text("UV Index:"+ " "+data.current.uvi);
    if(data.current.uvi < 2){
    uvEl.addClass("favourable"); 
    }
    if(data.current.uvi > 2 && data.current.uvi < 5)
    {
        uvEl.addClass("moderate"); 
    }
    if(data.current.uvi > 5)
    {
        uvEl.addClass("high"); 
    }
   weatherEl.append( cityWeather, currentDate, tempEl, windEl, humidityEl,uvEl);

  });  
});
 }


 
 
 function handleFormSubmit(event){
     event.preventDefault();
     console.log("you are here");
     var cityName = cityNameEl.val();
     if(!cityName){
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
