
class Link
{
	constructor() {}
	
	SetName(name) { this.name = name; }
	SetURL(url) { this.url = url; }
	
	GetName() { return this.name; }
	GetURL() { return this.url; }
}

class Box
{
	constructor() {}
	
	SetTitle(title) { this.title = title; }
	SetLinks(links) { this.links = links; }
	SetEnabled(enabled) { this.enabled = enabled; }
	SetLocked(locked) { this.locked = locked; }
	
	GetTitle() { return this.title; }
	GetURL() { return this.url; }
	GetLinks() { return this.links; }
	IsEnabled() { return this.enabled; }
	IsLocked() { return this.locked; }
}

