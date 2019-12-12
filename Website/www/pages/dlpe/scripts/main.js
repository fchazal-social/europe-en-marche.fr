const guid = () => {
  let s4 = () => { return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1) }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4()
}

const toSnake = value => {
  return value.replace('-', '_').replace('/', '_').replace('(','_').replace(')','_')
}

const Quizz = {
  id: null,

  cookie: {
    data: {},

    read: () => {
      const raw = Cookies.get('vote')
      
      if (raw == '') {
        Quizz.cookie.data = {}
      } else {
        Quizz.cookie.data = JSON.parse(raw)
      }
    },

    write: () => {
      switch (Quizz.data[Quizz.id].type) {
        case 'welcome':
          Quizz.cookie.data[Quizz.id] = {
            'session': guid(),
            'start': new Date()
          }
          break
        case 'informations':
          const age = document.querySelector(`select[name=age]`).value
          const job = document.querySelector(`select[name=job]`).value
          const membership = document.querySelector(`select[name=membership]`).value

          if (age == "" || job == "" || membership == "") return false;
          
          Quizz.cookie.data[Quizz.id] = {
            'age': age,
            'job': job,
            'membership': membership
          }
          break
        case 'question':
          try {
            Quizz.cookie.data[Quizz.id] = {
              'vote': document.querySelector(`input[name=vote]:checked`).value,
              'priorite_france': document.querySelector(`input[name=priorite_france]:checked`).value,
              'priorite_europe': document.querySelector(`input[name=priorite_europe]:checked`).value
            }
          } catch (e) { return false }
          break
        default:
      }
      
      Cookies.set('vote', JSON.stringify(Quizz.cookie.data))
      return true
    },

    clear: () => {
      Cookies.set('vote', '')
    }
  },

  init: (data) => {
    Quizz.cookie.read()
    
    const callback = (raw) => {
      Quizz.data = JSON.parse(raw)
      Quizz.data_ids = Object.keys(Quizz.data)
      
      Quizz.progress = document.querySelector('#progress')
      Quizz.data_ids.forEach(key => {
        const li = document.createElement('li')
        li.setAttribute('id', '_'+toSnake(key))
  
        Quizz.progress.appendChild(li)
      })
  
      Object.keys(Quizz.cookie.data).forEach(key => {
        document.querySelector('#_'+toSnake(key)).classList.add('done')
        Quizz.id = key
      })
      
      if (!Quizz.id) {
        Quizz.id = Quizz.data_ids[0]
        Quizz.render()
      } else Quizz.next()
    }

    const xhr = new XMLHttpRequest()
    xhr.open('get', 'pages/dlpe/data.json', true)
    
    xhr.timeout = 2000
    xhr.onerror = console.error
    xhr.ontimeout = console.error
    xhr.onload = function(e) {
      if (this.status == 200) {
        callback(this.response)
      }
      else xhr.onerror()
    }
    
    xhr.send()
  },

  render: () => {
    const content = Quizz.data[Quizz.id]
    const container = document.querySelector('main.dlpe')
  
    switch(content['type']) {
      case 'welcome':
        container.querySelector('#welcome').classList.add('visible')
        container.querySelector('#informations').classList.remove('visible')
        container.querySelector('#question').classList.remove('visible')
        container.querySelector('#resultats').classList.remove('visible')
        break

      case 'informations':
        container.querySelector('#informations').classList.add('visible')
        container.querySelector('#welcome').classList.remove('visible')
        container.querySelector('#question').classList.remove('visible')
        container.querySelector('#resultats').classList.remove('visible')
        break

      case 'question':
        container.querySelector('#title').innerText = content['nom']
        container.querySelector('#thematique').innerText = `Thématique ${content['thematique']}`
      
        container.querySelector('#contexte').innerHTML = marked(content['contexte'])
        container.querySelector('#chronologie').innerHTML = marked(content['chronologie'])
        container.querySelector('#recommandations_etats').innerHTML = marked(content['recommandations_etats'])
        container.querySelector('#recommandations_commission').innerHTML = marked(content['recommandations_commission'])
        
        container.querySelector('#wiki').href = content['wiki']
      
        document.querySelector(`input[name=vote]:checked`).checked = false
        document.querySelector(`input[name=priorite_france]:checked`).checked = false
        document.querySelector(`input[name=priorite_europe]:checked`).checked = false

        container.querySelector('#question').classList.add('visible')
        container.querySelector('#informations').classList.remove('visible')
        container.querySelector('#welcome').classList.remove('visible')
        container.querySelector('#resultats').classList.remove('visible')
        break

      case 'resultats':
        Quizz.send()
        Quizz.match()
        container.querySelector('#resultats').classList.add('visible')
        container.querySelector('#question').classList.remove('visible')
        container.querySelector('#informations').classList.remove('visible')
        container.querySelector('#welcome').classList.remove('visible')
        break
    }

    window.scrollTo(0, 0)
  },

  next: () => {
    if (Quizz.cookie.write()) {
      document.querySelector('#_'+toSnake(Quizz.id)).classList.add('done')
      const tmp = Quizz.data_ids.indexOf(Quizz.id)

      Quizz.id = Quizz.data_ids[tmp + 1]
      Quizz.render()
    } else {
      window.alert('Une question au moins n\'a pas été complétée !\nComplétez la pour poursuivre...')
    }
  },

  match: () => {
    let callback = (raw) => {
      const votes = JSON.parse(raw)
      const keys = Object.keys(votes)
      
      const answers = {}

      for (var question in Quizz.cookie.data) {
        if (Quizz.cookie.data[question]['vote']) {
          const value = Quizz.cookie.data[question]['vote']
          answers[question] = (value == -1) ? 'no': (value == 1) ? 'yes' : 'null'
        }
      }

      
      const score = (votes) => {
        let result = {}
        let _score = 0
        let _total = 0
        for (var question in answers) {
          if (result[Quizz.data[question].theme] == undefined)
            result[Quizz.data[question].theme] = {}
          result[Quizz.data[question].theme][question] = (answers[question] == votes[question]) ? 1 : 0
          _score += result[Quizz.data[question].theme][question]
          if (Quizz.data[question].theme != 'untracked') _total ++
        }

        for (var theme in result) {
          if (result[theme] instanceof Object) {
            let nb = 0, score = 0
            for (var question in result[theme]) {
              score += result[theme][question]
              nb++
            }
            result[theme].total = score / nb
          }
        }

        result.total = _score / _total
        return result
      }

      let _mep = []
      for (mep in votes) {
        _mep.push({ id: mep, score: score(votes[mep]) })
      }
      _mep = _mep.sort((a, b) => { return b.score.total - a.score.total })

      const match = _mep[0]
      const people = votes[match.id]

      document.querySelector('#link').href = `http://www.europarl.europa.eu/meps/en/${people.id}/_home.html`
      document.querySelector('#flag').style.backgroundImage = `url(pages/dlpe/images/flags/${people.country_code}.png)`
      document.querySelector('#face').style.backgroundImage = `url(http://www.europarl.europa.eu/mepphoto/${people.id}.jpg)`
      document.querySelector('#name').innerHTML = match.id
      document.querySelector('#code').innerHTML = people.code
      document.querySelector('#score').innerHTML = 'Correspondance à ' + Math.floor(match.score.total * 100) + '%'

      console.log(match)
      for (var key in match.score) {
        const elt = document.querySelector(`#${key}`)
        if (elt) {
          const score = Math.floor(match.score[key].total * 100)
          elt.classList.add(`score-${score}`)
          elt.dataset.width = score + '%'
        }
      }
    }

    const xhr = new XMLHttpRequest()
    xhr.open('get', 'pages/dlpe/votes.json', true)
    
    xhr.timeout = 2000
    xhr.onerror = console.error
    xhr.ontimeout = console.error
    xhr.onload = function(e) {
      if (this.status == 200 && this.readyState == 4) {
        callback(this.response)
      }
      else xhr.onerror()
    }
    
    xhr.send()
  },

  send: () => {
    Quizz.cookie.data['WELCOME']['stop'] = new Date()
    
    let xhr = new XMLHttpRequest()
    let url = 'https://script.google.com/macros/s/AKfycby9zFdf7ob7QqSfkexXDNxSMqCbQ2uE2poWXZzcmKQ/dev'
  
    xhr.open('post', url, true)
    xhr.send(JSON.stringify(Quizz.cookie.data))
  }
}

window.addEventListener('loaded', () => {
  let input = document.createElement('input')
  input.type = 'radio'

  let label = document.createElement('label')

  let createInputs = (id) => {
    input.name = id

    let container = document.querySelector(`#${id} .choice`)
    container.innerHTML = '';
    
    for (let i = 0; i <= 10; i++) {
      input.id = `${id}_${i}`
      input.value = i
      input.checked = (i == 5)
      container.appendChild(input.cloneNode(true))
      
      label.innerText = i
      label.setAttribute('for', `${id}_${i}`)
      container.appendChild(label.cloneNode(true))
    }
  }

  createInputs('priorite_france')
  createInputs('priorite_europe')

  Quizz.init()

})