const express = require('express');

const router = express.Router();

/**
 * @api {get} /api/v1/ Get API Status
 * @apiName GetAPIStatus
 * @apiGroup API/General
 * @apiVersion 1.0.0
 * @apiDescription Get the API status
 * @apiSuccess {String} status Status of the API
 * @apiSuccess {String} message Message of the API
 * @apiSuccessExample {json} Success-Response:
 *  HTTP/1.1 200 OK
 *    {
 *      "status": "success",
 *      "message": "Welcome to the API"
 *    }
 */
router.get('/', (req, res) => {
  res.json({
    status: 'success',
    message: 'Welcome to the API',
    info: [
      'API is fork of rzgry/Express-REST-API-Template',
      'Modified and keeps packages up-to-date, with awesome addition',
    ],
    branch: {
      api: {
        anime: {
          version: '0.0.1-cutting-edge',
          search:   'anime/search/<query>',
          id: 'anime/<query>',
        },
        manga: {
          version: '0.0.1-cutting-edge',
          search: 'manga/search/<query>',
          id: 'manga/<query>',
        },
        character: {
          version: 'Not yet implemented',
        },
        staff: {
          version: 'Not yet implemented',
        },
        studio: {
          version: 'Not yet implemented',
        },
        review: {
          version: 'Not yet implemented',
        },
        nyaa: {
          search: 'nyaa/search/<query>',
        }
      },
    }
  });
});

//* Anime Routes

/**
 * @api {get} /api/anime/search/:q Search for an anime
 * @apiName SearchAnime
 * @apiGroup API/Anime
 * @apiVersion 1.0.0
 * @apiDescription Search for an anime using MyAnimeList's API
 * @apiParam {String} q Query to search for
 */
router.get('/api/anime/search/:q', (req, res) => {
  const q = req.params.q;
  const jikan = require('jikan-node');
  const mal = new jikan();

  mal.search('anime', q)
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      res.json(err);
    });
});

/**
 * @api {get} /api/anime/:id Get anime general information
 * @apiName GetAnime
 * @apiGroup API/Anime
 * @apiVersion 1.0.0
 * @apiDescription Get anime general information using MyAnimeList's API
 * @apiParam {int} id ID of the anime
 */
router.get('/api/anime/:id', (req, res) => {
  const id = req.params.id;
  const jikan = require('jikan-node');
  const mal = new jikan();

  mal.findAnime(id)
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      res.json(err);
    });
});

/**
 * @api {get} /api/anime/:id/characters Get anime characters
 * @apiName GetAnimeCharacters
 * @apiGroup API/Anime
 * @apiVersion 1.0.0
 * @apiDescription Get anime characters using MyAnimeList's API
 * @apiParam {int} id ID of the anime
 */
router.get('/api/anime/:id/characters', (req, res) => {
  const id = req.params.id;
  const jikan = require('jikan-node');
  const mal = new jikan();

  mal.getAnimeCharacters(id)
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      res.json(err);
    });
});

// Search using Jikan4
router.get('/api/v4/anime/:q', (req, res) => {
  const q = req.params.q;
  const jikan4 = require('jikan-yon');
  const j4 = new jikan4();

  j4.searchAnime(q)
  // Return the result without promise
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      res.json(err);
    });
});




//* Manga Routes

/**
 * @api {get} /api/manga/search/:q Search for a manga
 * @apiName SearchManga
 * @apiGroup API/Manga
 * @apiVersion 1.0.0
 * @apiDescription Search for a manga using MyAnimeList's API
 * @apiParam {String} q Query to search for
 */
router.get('/api/manga/search/:q', (req, res) => {
  const q = req.params.q;
  const jikan = require('jikan-node');
  const mal = new jikan();

  mal.search('manga', q)
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      res.json(err);
    });
});

/**
 * @api {get} /api/manga/:id Get manga general information
 * @apiName GetManga
 * @apiGroup API/Manga
 * @apiVersion 1.0.0
 * @apiDescription Get manga general information using MyAnimeList's API
 * @apiParam {int} id ID of the manga
 */
router.get('/api/manga/:id', (req, res) => {
  const id = req.params.id;
  const jikan = require('jikan-node');
  const mal = new jikan();

  mal.findManga(id)
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      res.json(err);
    });
});


/** NYAA Routes */

/**
 * @api {get} /api/nyaa/search/:q Search for a torrent
 * @apiName SearchTorrent
 * @apiGroup API/Nyaa
 * @apiVersion 1.0.0
 * @apiDescription Search for a torrent using Nyaa's API
 * @apiParam {String} q Query to search for
 */
router.get('/api/nyaa/search/:q', (req, res) => {
  const q = req.params.q;
  const { si } = require('nyaapi');

  si.search(q)
    .then(result => {
      res.json({
        status: 'success',
        query: q,
        // Show only first 10 results
        results: result.slice(0, 10),
      })
    })
    .catch(err => {
      res.json(err);
    });
});

module.exports = router;