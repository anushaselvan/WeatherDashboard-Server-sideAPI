 var formEl = $("#search-city");
 var cityNameEl = $("#city-name");
 var cityListEl = $("#city-list");
 var responseEl = $("p");


 function printNames(name){
     //console.log("print names");
     var listEl = $('<li>').addClass('my-3 w-75 btn btn-info').text(name);
    cityListEl.append(listEl);
    formEl.append(cityListEl);
 }
 
 
 
 function handleFormSubmit(event){
     event.preventDefault();
     console.log("you are here");
     var cityName = cityNameEl.val();
     if(!cityName){
         console.log("inside if loop");
         responseEl.text("Plese enter a City name!");
        formEl.append(responseEl);
         return;
     }

        printNames(cityName);
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
