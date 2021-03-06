 var formEl = $("#search-city");
 var weatherEl = $("#weather");
 var day1El = $("#day1");
 var day2El = $("#day2");
 var day3El = $("#day3");
 var day4El = $("#day4");
 var day5El = $("#day5");
 var fiveDayEl = $("#fiveDay");
 var searchCity = [];
 var sCity = [];
 var city = "";

 var cityNameEl = $("#city-name");
 var cityListEl = $("#city-list");
 cityListEl = [];
 var responseEl = $("<p>");

function printNames(name){
    var listEl = $('<li>').addClass('my-3 w-75 btn btn-info').text(name);
        for (i=0; i<cityListEl.length; i++){
            if(cityListEl[i]=== listEl){
                currentWeather(name);
            }
        }
       formEl.append(cityListEl, listEl);
    }

function searchExistingList(name){
    searchCity = JSON.parse(localStorage.getItem("cityName"));
    console.log(searchCity);
    if(searchCity !== null){
        for(var i=0; i < searchCity.length; i++){
            if(searchCity[i] === name){
               return currentWeather(name);
            }   
        }  
        searchCity.push(name);
        localStorage.setItem("cityName", JSON.stringify (searchCity));
        printNames(name);
        currentWeather(name);
    }  
    else {
        searchCity = [];
        searchCity.push(name);
        localStorage.setItem("cityName", JSON.stringify (searchCity));
        printNames(name);
        currentWeather(name);
        }
    }
    
function currentWeather(name){
   fiveDayEl.addClass("visible");
  weatherEl.text("  ");
  day1El.text("  ");
  day2El.text("  ");
  day3El.text("  ");
  day4El.text("  ");
  day5El.text("  ");

   var requestUrl = "https://api.openweathermap.org/data/2.5/weather?q="+name+"&appid=8eeda8c33024abb85ba58c60e0b669ac&units=metric";
   fetch (requestUrl)
       .then(function(response){
        
           return response.json ();
   })

   .then(function(data){
       console.log(data);
    weatherEl.addClass("brder");
    var iconUrl = "https://openweathermap.org/img/wn/"+data.weather[0].icon+"@2x.png";
    var icon = $("<img src="+iconUrl+">");
    var cityWeather = $("#weather").addClass("h2 font-weight-600").text(name+"    ");  
    var date = moment().format('l');
    var currentDate = $("<p>").addClass("h4").text('('+ date +')'); 
    var tempEl = $("<p>").addClass("h6").text('Temp:'+ " "+ data.main.temp+"??C");
    var windEl = $("<p>").addClass("h6").text("Wind:"+" "+ data.wind.speed+"km/h");
    var humidityEl = $("<p>").addClass("h6").text("Humidity:"+" "+ data.main.humidity+"%");
    
fetch("https://api.openweathermap.org/data/2.5/onecall?lat="+data.coord.lat+"&lon="+data.coord.lon+"&appid=8eeda8c33024abb85ba58c60e0b669ac&units=metric")
   .then(function(response){
       return response.json();
    })
    .then(function(data){
    console.log(data);
    
    var uvEl= $("<p>").addClass("h6").text("UV Index:"+ " "+ data.current.uvi);
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
   weatherEl.append( cityWeather,icon, currentDate, tempEl, windEl, humidityEl,uvEl);

   for(var i=0; i<5; i++){
            var dateFetch = moment.unix(data.daily[i+1].dt).format('l');
            var datef = $("<p>").addClass("h5").text( dateFetch );
            var icn =  "https://openweathermap.org/img/wn/"+ data.daily[i].weather[0].icon +"@2x.png";
            var iconf = $("<img src="+icn+">");
            var tempf =  $("<p>").addClass("h6").text('Temp:'+ " "+ data.daily[i].temp.day+"??C");
            var windf = $("<p>").addClass("h6").text("Wind:"+" "+ data.daily[i].wind_speed+"km/h");
            var humidf = $("<p>").addClass("h6").text("Humidity:"+" "+ data.daily[i].humidity+"%");
            if (i === 0){

                day1El.append(datef,iconf, tempf, windf, humidf);
            }
            if(i === 1){
                day2El.append(datef,iconf, tempf, windf, humidf);
            }
            if(i === 2){
                day3El.append(datef,iconf,  tempf, windf, humidf);
            }
            if(i === 3){
                day4El.append(datef,iconf,  tempf, windf, humidf);
            }
            if(i === 4){
                day5El.append(datef,iconf,  tempf, windf, humidf);
            }
         }
    });  
    });
 }

 
function handleFormSubmit(event){
     event.preventDefault();
     var cityName = cityNameEl.val();
     if(!cityName){
        responseEl.text("Please enter a City name!");
        formEl.append(responseEl);
         return;
     }
        searchExistingList(cityName);
        cityNameEl.val("");
    }
function pastSearchInvoke(event){
    var list = event.target;
    if(event.target.matches('li')){
     city = list.textContent.trim();
        currentWeather(city);
    }
}
function init(){
     sCity = JSON.parse(localStorage.getItem("cityName"));
    if(sCity !== null){
        for (var i=0; i<sCity.length; i++){
            printNames(sCity[i]);
        }
        var city = sCity[i-1];
        currentWeather(city);
    }
    }

    formEl.on('submit', handleFormSubmit); 
    $(document).on('click', pastSearchInvoke); 
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
         'Queenstown',
         'Rome',
         'Moscow',
         'Chennai',
        'Delhi'
     ];
     $('#city-name').autocomplete({
         source:cityNames,
    });
});
init();