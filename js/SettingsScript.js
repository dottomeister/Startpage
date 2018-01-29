
var boxes = [];
var editMode = false;

function Settings(defaultBoxTitles)
{
	for (index = 0; index < 3; index++)
	{
		if (localStorage.getItem("b" + index) == null) InitialiseStorage(index, defaultBoxTitles);
		else LoadStorage(index);
	}
	
	// Changes the title at the beginning.
	$(".box-title").each(function(index) { $(this).val(boxes[index].GetTitle()) });
	
	// Adds a key listener to the settings button.
	$("#settings-button").click("input", function() { ToggleEditMode() });
	$(".lock-button").each(function(index) { $(this).click("input", function() { LockToggle($(this), index); }); });
	$(".enable-button").each(function(index) { $(this).click("input", function() { DisableToggle($(this), index) }); });
}

function InitialiseStorage(index, defaultBoxTitles)
{
	var links = [];
	var value = "";
	
	for (subindex = 0; subindex < 3; subindex++)
	{
		links[subindex] = new Link();
		links[subindex].SetName("Link name");
		links[subindex].SetURL("Link URL");
		
		value += "l" + subindex + "_name:Link;l" + subindex + "_url:www.google.com;l" + subindex + "_enable:";
		if (subindex >= 1)
		{
			value += "false";
			links[subindex].SetEnabled(false);
		}
		else
		{
			value += "true"
			links[subindex].SetEnabled(true);
		}
		if (subindex < 3) value += ";"
	}
	
	boxes[index] = new Box();
	
	boxes[index].SetTitle(defaultBoxTitles[index]);
	boxes[index].SetLinks(links);
	boxes[index].SetEnabled(true);
	boxes[index].SetLocked(false);
	
	localStorage.setItem("b" + index, "title:" + defaultBoxTitles[index] + ";enabled:true;locked:false;" + value);
}

function LoadStorage(index)
{
	var links = [];
	var content = localStorage.getItem("b" + index).split(";");
	
	for (subindex = 0; subindex < 3; subindex++)
	{
		links[subindex] = new Link();
		
		links[subindex].SetName(content[3 + (3 * subindex)].split(":")[1]);
		links[subindex].SetURL(content[4 + (3 * subindex)].split(":")[1]);
		links[subindex].SetEnabled(content[5 + (3 * subindex)].split(":")[1]);
	}
	
	boxes[index] = new Box();
	boxes[index].SetTitle(content[0].split(":")[1]);
	boxes[index].SetLinks(links);
	boxes[index].SetEnabled(content[1].split(":")[1]);
	boxes[index].SetLocked(content[2].split(":")[1]);
}

function ToggleEditMode()
{
	editMode = !editMode;
	$("#settings-button").toggleClass("edit-disabled edit-enabled");
	
	$(".settings-box").each(function(index) { $(this).toggleClass("hidden")  } );
	
	// $(".setting-box").each(function(index) { console.log($this); $(this).toggleClass("hidden") });
	
	if (editMode) $(".box-title").each(function(index)
	{
		$(this).prop("disabled", false)
	})
	else $(".box-title").each(function(index)
	{
		// Changes the local storage title only when edit mode has been disabled.
		// localStorage.setItem("b" + index, );
		UpdateBoxTitle($(this).val(), index);
		$(this).prop("disabled", true);
	});
	
	// $(".main-box").each(function(index) { $(this).toggleClass("box-blur box-clear"); });
}

function UpdateBoxTitle(nbt, index)
{
	var result = "";
	var content = localStorage.getItem("b" + index).split(";");
	content[0] = "title:" + nbt;
	
	for (subindex = 0; subindex < content.length; subindex++)
		result += content[subindex] + ";";
	
	localStorage.setItem("b" + index, result);
}

function DisableToggle(button, index)
{
	if (button.text() == "enabled") button.text("disabled");
	else button.text("enabled");
	
	button.toggleClass("green-text red-text");
}

function LockToggle(button, index)
{
	if (button.text() == "locked") button.text("unlocked");
	else button.text("locked");
	
	button.toggleClass("red-text green-text");
}


