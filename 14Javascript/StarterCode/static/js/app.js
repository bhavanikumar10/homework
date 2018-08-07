// from data.js
var tableData = data;


//Using d3 to select the table body
var tbody = d3.select("tbody")

tbody.html("");

//Mapping the variables to their objects
var datedata = data.map(obj => obj.datetime );
var citydata = data.map(obj => obj.city);
var statedata = data.map(obj => obj.state);
var countrydata = data.map(obj => obj.country);
var shapedata = data.map(obj => obj.shape);
var durationminutesdata = data.map(obj => obj.durationMinutes);
var commentsdata = data.map(obj => obj.comments);

//console.log(datedata, citydata, statedata, countrydata, shapedata, durationminutesdata, commentsdata);

//looping through the data and appending to the table
var i;

for(i=0; i<tableData.length; i++) {
    // Append one table row `tr` to the table body
    var row = tbody.append('tr');

    // Append one cell for the date
    row.append('td').text(datedata[i]);

    // Append one cell for the city
    row.append('td').text(citydata[i]);

    // Append one cell for state
    row.append('td').text(statedata[i]);

    // Append one cell for country
    row.append('td').text(countrydata[i]);

    // append one cell for shape
    row.append('td').text(shapedata[i]);

    // Append one cell for duration
    row.append('td').text(durationminutesdata[i]);

    // Append one cell for comments
    row.append('td').text(commentsdata[i]);

    };



// Getting and filtering data based on the user given date on the input field.

// Select the submit button


var submit = d3.select("#filter-btn");
console.log(submit);


    submit.on("click", function() {   
            
        //Selecting the input button
        var onClick = d3.select('#datetime');
             
        // Get the value property of the input element
        var inputValue = onClick.property("value");

        console.log(inputValue);

        let xfiltered = tableData.filter(obj => obj.datetime === inputValue);
        console.log(xfiltered);
          
        var fdatedata = xfiltered.map(obj => obj.datetime );
        var fcitydata =xfiltered.map(obj => obj.city);
        var fstatedata = xfiltered.map(obj => obj.state);
        var fcountrydata = xfiltered.map(obj => obj.country);
        var fshapedata = xfiltered.map(obj => obj.shape);
        var fdurationminutesdata = xfiltered.map(obj => obj.durationMinutes);
        var fcommentsdata = xfiltered.map(obj => obj.comments);

        console.log(fdatedata);
        console.log(fcitydata);

            // Prevent the page from refreshing
            d3.event.preventDefault();       
        
        var fbody = d3.select('tbody');
        fbody.html("");

        var j;
                    
        for(j=0; j<xfiltered.length; j++) {
                    console.log(j);               
                // Append one table row `tr` to the table body
                var frow = fbody.append('tr');

                // Append one cell for the date
                frow.append('td').text(fdatedata[j]);

                // Append one cell for the city
                frow.append('td').text(fcitydata[j]);

                // Append one cell for state
                frow.append('td').text(fstatedata[j]);

                // Append one cell for country
                frow.append('td').text(fcountrydata[j]);

                // append one cell for shape
                frow.append('td').text(fshapedata[j]);
                
                // Append one cell for duration
                frow.append('td').text(fdurationminutesdata[j]);

                // Append one cell for comments
                frow.append('td').text(fcommentsdata[j]);

                console.log(j);
                

                    }
                 inputValue = onClick.property("");  
                 
                 
});





  
     


