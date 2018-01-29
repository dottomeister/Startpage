
// b0="title=Personal;enabled=true;locked=false;ln0=Link;lu0=https://www.google.com;le0=enabled;ln1=Link;lu1=https://www.google.com;le1=enabled;ln2=Link;lu2=https://www.google.com;le2=enabled"

var editmode = false;

function
Script()
{
	var boxes = [];
	
	var dbTitles = [ "personal", "media", "work" ];
	
	// First box default values.
	var dlName0 = [ "chat", "mail", "storage" ];
	var dlURL0 = [ "https://web.whatsapp.com", "https://mail.google.com", "https://www.dropbox.com" ];
	
	// Second box default values.
	var dlName1	= [ "youtube", "netflix", "soundcloud" ];
	var dlURL1 = [ "https://www.youtube.com", "https://www.netflix.com", "https://soundcloud.com" ];
	
	// Third box default values.
	var dlName2 = [ "github", "moodle", "webmail" ];
	var dlURL2 = [ "https://github.com", "https://moodle.upm.es", "https://www.upm.es/webmail_alumnos" ];
	
	LoadBoxes(boxes, dbTitles, [ dlName0, dlName1, dlName2 ], [ dlURL0, dlURL1, dlURL2 ]);
	
	$("#settings-button").click("input", function(){ ToggleEditMode(boxes) });
	
	// Adds a keylistener to the title.
	$(".box-title").each(function(index)
	{
		$(this).focusout(function()
		{
			boxes[index].SetTitle($(this).val());
			UpdateTitle(boxes, $(this), index);
		})
	});
	
	$(".l-button").each(function(index)
	{
		$(this).click("input", function()
		{
			var box = boxes[index];
			box.SetLocked(!box.IsLocked());
			UpdateButton(boxes, $(this), index, "locked", true);
		})
	});
	
	$(".e-button").each(function(index)
	{
		$(this).click("input", function()
		{
			var box = boxes[index];
			box.SetEnabled(!box.IsEnabled());
			UpdateButton(boxes, $(this), index, "enabled", true);
		})
	});
}

/**
 * If the localStorage already exists, loads it and initalises the boxes,
 * and if it doesn't, loads up the default values.
 */
function
LoadBoxes(boxes, dbTitles, dlNames, dlURL)
{
	// Loads all three boxes.
	for (index = 0; index < 3; index++)
	{
		var sc = localStorage.getItem("b" + index);
		
		var boxTitle = ((sc == null) ? dbTitles[index] : SearchStorageTag(boxes, sc, "title"));
		var boxEnabled = ((sc == null) ? true : BoolConvert(SearchStorageTag(boxes, sc, "enabled")));
		var boxLocked = ((sc == null) ? false : BoolConvert(SearchStorageTag(boxes, sc, "locked")));
		
		var links = [];
		var storageString = "";
		
		// Loads the links.
		for (subindex = 0; subindex < 3; subindex++)
		{
			var dlEnable = ((subindex > 0) ? false : true);
			
			var linkName = ((sc == null) ? dlNames[index][subindex] : SearchStorageTag(boxes, sc, "ln", subindex));
			var linkURL = ((sc == null) ? dlURL[index][subindex] : SearchStorageTag(boxes, sc, "lu", subindex));
			
			links[subindex] = new Link();
			links[subindex].SetName(linkName);
			links[subindex].SetURL(linkURL);
			
			storageString += "ln" + subindex + "=" + linkName;
			storageString += ";lu" + subindex + "=" + linkURL + ((subindex < 2) ? ";" : "");
		}
		
		boxes[index] = new Box();
		
		boxes[index].SetTitle(boxTitle);
		boxes[index].SetLinks(links);
		boxes[index].SetEnabled(boxEnabled);
		boxes[index].SetLocked(boxLocked);
		
		storageString = "title=" + boxTitle + ";enabled=" + boxEnabled + ";locked=" + boxLocked + ";" + storageString;
		localStorage.setItem("b" + index, storageString);
	}
	
	$(".box-title").each(function(index) { UpdateTitle(boxes, $(this), index) });
	$(".box-link").each(function(index) { UpdateLink(boxes, $(this), index) });
	
	$(".e-button").each(function(index)
	{
		UpdateButton(boxes, $(this), index, "enabled", false);
		
		if (!boxes[index].IsEnabled()) $(this).toggleClass("green-text red-text");
	});
	$(".l-button").each(function(index)
	{
		UpdateButton(boxes, $(this), index, "locked", false);
		
		if (boxes[index].IsLocked()) $(this).toggleClass("green-text red-text");
	});
}

/**
 * Searches for a specific tag in the localStorage.
 */
function
SearchStorageTag(boxes, sc, tag, index)
{
	var cSplit = sc.split(";");
	
	if (tag == "title") return cSplit[0].split("=")[1];
	if (tag == "enabled") return cSplit[1].split("=")[1];
	if (tag == "locked") return cSplit[2].split("=")[1];
	if ((tag + index) == ("ln" + index)) return cSplit[3 + (2 * index)].split("=")[1];
	if ((tag + index) == ("lu" + index)) return cSplit[4 + (2 * index)].split("=")[1];
}

/**
 * Returns a bool value of a passed string.
 */
function
BoolConvert(value)
{
	if (value == "true") return true;
	return false;
}

/**
 * Edits a specific tag in the localStorage.
 */
function
EditTag(boxes, tag, value, index)
{
	var result = "";
	var sc = localStorage.getItem("b" + index).split(";");
	
	for (subindex = 0; subindex < sc.length; subindex++)
	{
		var current = sc[subindex].split("=");
		if (current[0] == tag) current[1] = value;
		result += current[0] + "=" + current[1] + ((subindex < (sc.length - 1)) ? ";" : "");
	}
	
	localStorage.setItem("b" + index, result);
}

/**
 * When the settings button is pressed...
 */
function
ToggleEditMode(boxes)
{
	editmode = !editmode;
	
	$("#settings-button").toggleClass("edit-disabled edit-enabled");
	$(".settings-box").each(function(index) { $(this).toggleClass("hidden") } );
}

/**
 * Changes the box title value on the screen and saves the new value on
 * the localStorage.
 */
function
UpdateTitle(boxes, box, index)
{
	var b = boxes[index];
	
	box.val(b.GetTitle());
	
	EditTag(boxes, "title", box.val(), index);
}

/**
 * Changes the link value on the screen and saves the new value on the
 * localStorage.
 */
function
UpdateLink(boxes, link, index)
{
	var ln = Math.floor((3 * index) / 9);
	var l = boxes[ln].GetLinks()[index % 3];
	
	link.text(l.GetName());
	link.attr("href", l.GetURL());
	
	EditTag(boxes, "ln" + (index % 3), link.text(), ln);
	EditTag(boxes, "lu" + (index % 3), link.attr("href"), ln);
}

/**
 * Changes the button value on the screen and saves the new value on the 
 * localStorage.
 */
function
UpdateButton(boxes, button, index, type, change)
{
	var tag;
	var value;
	var b = boxes[index];
	
	if (type == "enabled")
	{
		button.text(b.IsEnabled() ? "enabled" : "disabled");
		
		$(".main-box").each(function(subindex)
		{
			if (index == subindex)
			{
				if (!b.IsEnabled())
				{
					$(".buffer-box").each(function(dindex) { if (index == dindex) $(this).removeClass("hidden") });
					$(this).addClass("hidden");
				}
				if (b.IsEnabled())
				{
					$(".buffer-box").each(function(dindex) { if (index == dindex) $(this).addClass("hidden") });
					$(this).removeClass("hidden");
				}
			}
		});
		
		tag = "enabled";
		value = b.IsEnabled();
	}
	
	if (type == "locked")
	{
		button.text(b.IsLocked() ? "locked" : "unlocked");
		
		$(".box-title").each(function(subindex)
		{
			if (index == subindex)
			{
				if (b.IsLocked()) $(this).prop("disabled", true);
				if (!b.IsLocked()) $(this).prop("disabled", false);
			}
		});
		
		tag = "locked";
		value = b.IsLocked();
	}
	
	if (change) button.toggleClass("green-text red-text");
	
	EditTag(boxes, tag, value, index);
}


