
function
LoadJesus()
{
	var r = Math.floor(Math.random() * 1000) + 1;
	var r2 = Math.floor(Math.random() * 1000) + 1;

	// console.log('random1: ' + r + ', random2: ' + r2);
	
	if (r === r2) $('#jebus-container').toggleClass("hidden");
}	
