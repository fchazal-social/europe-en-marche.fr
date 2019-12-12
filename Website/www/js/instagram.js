window.addEventListener('load', queryInstagram);

function queryInstagram() {
	let section = document.querySelector('section#instagram');
	let url = 'https://www.instagram.com/europeenmarche/?__a=1';
	
	var process = function(data) {
		var elements = data.user.media.nodes;
		elements.splice(4);

		elements.forEach(item => {
			var link = document.createElement('a');

			link.setAttribute('target', '_blank');
			link.setAttribute('href', item.display_src);
			link.style.backgroundImage = `url(${item.thumbnail_src})`;

			section.appendChild(link);
		});

		var link = document.createElement('a');

		link.classList.add('followus');
		link.setAttribute('target', '_blank');
		link.setAttribute('href', 'https://www.instragam.com/EuropeEnMarche/');
		section.appendChild(link);
	};

	getJSON(url, process, console.error);
}
