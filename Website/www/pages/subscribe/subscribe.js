
var people = {
	"email_address": "urist2.mcvankab@freddiesjokes.com",
	"status": "subscribed",
	"merge_fields": {
			"FNAME": "Urist2",
			"LNAME": "McVankab"
	}
}


function fetch(url, data, callback) {
	let xhr = new XMLHttpRequest()
	xhr.open('POST', url, true)
	xhr.setRequestHeader("Authorization", "Basic ZWVtOmY2MzI2ZDM1MGUyYThmZjU0NmY2OTI1ZjA2YTJiZTJhLXVzMTU=")

	xhr.timeout = 2000

	xhr.onload = function(e) {
		if (this.status == 200)
			callback(this.response)
		else xhr.onerror()
	}

	xhr.send(data)
}

fetch('https://us15.api.mailchimp.com/3.0/lists/1e556dc514/members/', people, console.log)