window.addEventListener('loaded', queryInstagram);

function queryInstagram() {
	let section = document.querySelector('section#instagram');
	let url = 'https://www.instagram.com/europeenmarche/?__a=1';
	
	var process = function(data) {
		console.log(data)
		var elements = data.graphql.user.edge_owner_to_timeline_media.edges;
		elements.splice(5);

		elements.forEach(edge => {
			let item = edge.node
			var link = document.createElement('a');

			link.setAttribute('target', '_blank');
			link.setAttribute('href', 'https://www.instagram.com/EuropeEnMarche');
			link.style.backgroundImage = `url(${item.thumbnail_src})`;

			section.appendChild(link);
		});
/*
		var link = document.createElement('a');

		link.classList.add('followus');
		link.setAttribute('target', '_blank');
		link.setAttribute('href', 'https://www.instagram.com/EuropeEnMarche/');
		section.appendChild(link);
	*/
	};

	getJSON(url, process, console.error);
}
