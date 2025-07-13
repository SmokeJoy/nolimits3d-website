const serp = require('serp');

const keywords = [
  'stampa 3d frosinone',
  'prototipazione rapida frosinone',
  'componenti tecnici frosinone',
  'stampa 3d cassino',
  'stampa 3d latina',
];

const options = {
  host: 'google.it',
  qs: {
    gl: 'it',
    hl: 'it',
  },
};

async function trackKeywords() {
  console.log('📊 Inizio monitoraggio parole chiave...');
  for (const keyword of keywords) {
    const searchOptions = {
      ...options,
      qs: {
        ...options.qs,
        q: keyword,
      },
    };
    try {
      const links = await serp.search(searchOptions);
      const position = links.findIndex(link => link.url.includes('nolimits3d.store'));
      if (position !== -1) {
        console.log(`✅ Posizione per "${keyword}": ${position + 1}`);
      } else {
        console.log(`❌ "${keyword}" non trovato in prima pagina.`);
      }
    } catch (error) {
      console.error(`Errore durante la ricerca per "${keyword}":`, error);
    }
  }
  console.log('📈 Monitoraggio completato.');
}

trackKeywords();
