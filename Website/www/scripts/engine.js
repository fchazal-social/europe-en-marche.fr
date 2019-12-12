
var SiteEngine = {
	initialize: () => {
		SiteEngine.route(location.hash)

		window.oncontextmenu = function(event) {
			event.preventDefault();
			event.stopPropagation();
			return false;
		}
	
		window.onhashchange = () => { window.location.reload() }
		
		document.querySelector('#menu').onclick = () => {
			document.querySelector('header').classList.toggle('menu')
		}
	},

	route: (hash) => {
		values = hash.split('!')

		if (values[1] == 'embed') {
			document.querySelector('header').style.display = 'none'
			document.querySelector('footer').style.display = 'none'
			document.querySelector('#container').style.padding = '0'
			document.querySelector('#container').style.border = 'none'
		}

		hash = values[0].replace(/^#/,'')
		if (!hash.length) hash = 'home'

		let path = hash.split('/')

		switch (path[0]) {			
			case 'wiki':
			SiteEngine.renderWiki(path)
			break
			
			default:
				SiteEngine.renderPage(path)
		}
	},
	
	renderPage: (path) => {
		path.unshift('pages')

		const _root = path[path.length-1].split('?')
		path[path.length-1] = _root[0]

		if (path[path.length-1].substr(-5,5) != '.html')
			path.push('index.html' + (_root[1] ? '?'+_root[1] : ''))

		SiteEngine.fetch(path.join('/'), (data) => {
			path.pop()

			data = data.replace(/href=".\//g, `href="${path.join('/')}/`)
			data = data.replace(/src=".\//g, `src="${path.join('/')}/`)

			let styles = data.match(/<link[^>]*>/g)
			data = data.replace(/<link[^>]*>/g, '')

			let scripts = data.match(/<script[^>]*><\/script>/g)
			data = data.replace(/<script[^>]*><\/script>/g, '')

			let cbk = () => {
				SiteEngine.render(data, path[1])
				SiteEngine.insertScripts(scripts, () => {
					window.dispatchEvent(new Event('loaded'))
				})
			}

			SiteEngine.insertStyles(styles, cbk)
		})
	},

	renderWiki: (path) => {
		if (path[path.length-1].substr(-3,3) != '.md')
			path.push('text.md')

		SiteEngine.fetch(path.join('/'), (data) => {
			path.pop()
			
			data = data.replace(/\(.\//g, `(${path.join('/')}/`)

			let elt = document.createElement('div')
			elt.innerHTML = marked(data)

			let list = elt.querySelectorAll('*[alt]')
			for (let i = 0; i < list.length; i++) {
				let img = list[i]
				img.setAttribute('class', img.getAttribute('alt'))
			}

			list = elt.querySelectorAll('*[title]')
			for (let i = 0; i < list.length; i++) {
				let img = list[i]
				img.setAttribute('data-title', img.getAttribute('title'))
			}
/*
			html = html.replace(/alt="([^"]*)"/g, `alt="$1" class="$1"`)
			html = html.replace(/title="([^"]*)"/g, `title="$1" data-title="$1"`)
*/
			SiteEngine.render(elt.innerHTML, 'wiki')
		})
	},

	renderError: () => {
		SiteEngine.renderPage(['error'])
	},

	render: (data, type) => {
		let tpl = document.createElement('div')
		tpl.innerHTML = data

		let main = document.querySelector('main')
		main.className = type
		main.appendChild(tpl)//document.importNode(tpl.content, true))
		//main.addEventListener('DOMNodeInserted', () => { alert("") })
	},

	fetch: (url, callback) => {
		let xhr = new XMLHttpRequest()
		xhr.open('get', url, true)

		xhr.timeout = 2000

		xhr.onload = function(e) {
			if (this.status == 200)
				callback(this.response)
			else xhr.onerror()
		}

		xhr.onerror = SiteEngine.renderError
		xhr.ontimeout = SiteEngine.renderError

		xhr.send()
	}
}

SiteEngine.insertStyles = function(styles = [], callback) {
	if (styles == null) styles = []
	var keys = Object.keys(styles)
	
	var id = 0
	var insertNext = function() {
		if (id < keys.length) {
			let match = styles[keys[id++]].match(/<link[^>]*href="([^"]*)"[^>]*>/)
			
			var element = document.createElement('link')
			element.setAttribute('rel', 'stylesheet')
			element.setAttribute('type', 'text/css')
			element.setAttribute('href', match[1])

			element.addEventListener('load', insertNext)
			document.head.appendChild(element)
		} else callback()
	}
	
	insertNext()
}

SiteEngine.insertScripts = function(scripts = [], callback) {
	if (scripts == null) scripts = []
	var keys = Object.keys(scripts)
	
	var id = 0
	var insertNext = function() {
		if (id < keys.length) {
			let match = scripts[keys[id++]].match(/<script[^>]*src="([^"]*)"[^>]*><\/script>/)
			
			var element = document.createElement('script')
			element.setAttribute('language', 'javascript')
			element.setAttribute('src', match[1])

			element.addEventListener('load', insertNext)
			document.body.appendChild(element)
		} else callback()
	}
	
	insertNext()
}

SiteEngine.initialize()