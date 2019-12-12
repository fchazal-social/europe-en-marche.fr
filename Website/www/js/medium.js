window.addEventListener('load', queryMedium);

function queryMedium() {
	let section = document.querySelector('section#medium');
	let url = 'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fmedium.com%2Ffeed%2Feurope-en-marche';
	
	var process = function(data) {
		var elements = data.items;
		elements.splice(4);

		elements.forEach(item => {
			var link = document.createElement('a');
			
			let image = item.description.match(/<img[^>]*src="([^"]*)"[^>]*>/);
			let description = item.description.replace(/<figure>.*<\/figure>/g, '');
			
			link.setAttribute('target', '_blank');
			link.setAttribute('href', item.link);
			link.innerHTML += `<figure style="background-image: url(${image[1]})"></figure>`;
			link.innerHTML += `<div><h3>${item.title}</h3>${description}</div>`;

			section.appendChild(link);
		});

		var link = document.createElement('a');
		link.setAttribute('target', '_blank');
		link.classList.add('followus');
		link.setAttribute('href', 'https://www.medium.com/europe-en-marche/');
		section.appendChild(link);
	};

	getJSON(url, process, console.error);
}
