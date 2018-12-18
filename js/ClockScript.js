
var analog = true;

function
LoadClock()
{
	console.log("Loading");
	
	var ampm = "am";
	var date = new Date();
	var hour = date.getHours();
	var mins = date.getMinutes();
	
	// If the minute value is less than '10', adds a '0' before the minute value.
	if (mins <= 9) mins = "0" + mins;
	
	if (analog)
	{
		// Changes the ampm value to 'pm' if it is over 12 pm.
		if (hour >= 12) ampm = "pm";
		if (hour >= 13) hour++;
		
		hour %= 13;
	}
	else if (hour <= 9) hour = "0" + hour;
	
	$("#clock").text(hour + ":" + mins + " " + (analog ? ampm : ""));
}
