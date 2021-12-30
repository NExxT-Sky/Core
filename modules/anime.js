// jikan-node dep
const jikan = require('jikan-node');
const mal = new jikan();

// do a search for anime
app.get('/anime/search/:query', (req, res) => {
    // Get data from the query
    mal.search('anime', req.params.query).then(response => {
        // Send the response as json
        res.json(response);
    }).catch(err => {
        // Log error
        log('error', err);
    });

});

// Get data from /anime/:id
app.get('/anime/:id', (req, res) => {
    // Get data from the query
    mal.findAnime(req.params.id).then(response => {
        // Send the response as json
        res.json({
            mal_id: response.mal_id,
            title: {
                general: response.title,
                english: response.title_english,
                japanese: response.title_japanese,
                synonyms: response.title_synonyms
            },
            synopsis: response.synopsis,
            episodes: response.episodes,
            duration: response.duration,
            mal_statistics: {
                score: response.score,
                scored_by: response.scored_by,
                rank: response.rank,
            },
        });
    }
    ).catch(err => {
        // Log error
        log('error', err);
    });
});

// Get anime episodes from /anime/:id/episodes
app.get('/anime/:id/episodes', (req, res) => {
    // Get data from the query
    mal.findAnime(req.params.id + '/episodes').then(response => {
    // Send the response as json
        res.json(response.episodes);
    }).catch(err => {
        // Log error
        log('error', err);
    });
});
