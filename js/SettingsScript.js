
var editMode = false;

function Settings()
{
	// Adds a key listener to the settings button.
	$('#settings-button').keyup('input', function() { ToggleEditMode() });
	
	// Adds a key listener to each box title.
	$('.box-title').each(function(index) { $(this).keyup('input', function() { EditBoxTitle(index, $(this)) }); });
}

function ToggleEditMode()
{
	
}

function EditBoxTitle(index, box)
{
	
	
	var enterPressed = false;
	
	$(document).keyup(function(e)
	{
		var titleContent = box.val();
		if (!enterPressed && e.which == 13) enterPressed = true;
		
	});

	enterPressed = false;
}
