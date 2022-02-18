/**
* @api_version 2
*/

const express = require('express');
const { get } = require('express/lib/response');
const router = express.Router();
const createError = require('http-errors');

const fs = require('fs');
var path = require('path');

/** Read '../config.json' */
function config() {
  var config = JSON.parse(fs.readFileSync(path.join(__dirname, '../config.json'), 'utf8'));
  return config;
};

/**
 * @description This is the API route info
 * @route GET /
 * @group Main
 * @returns {object} 200 - An array of API routes
 * @returns {Error} default - Unknown error
 */
router.get('/', (req, res) => {
  res.json({
    api_version: 'v2',
    sem_version: '1.0.0',
    description: 'SkyCore API',
    routes: {
      '/': 'This route',
      '/anime': {
        '/search/:query': 'Search anime from query',
        '/:id': {
          '/title_variations': 'Anime title variations',
          '/episodes': 'Anime episodes',
          '/characters': 'Anime characters',
          '/staff': 'Anime staff',
          '/genres': 'Anime genres',
          '/studios': 'Anime studios',
          '/relations': 'Anime relations',
          '/image': 'Anime image',
        },
      }
    }
  });
});

/**
 * @title Anime Route
 */

/**
 * Search for Anime
 * @route GET /anime/search/:query
 * @content_type application/json
 * @group Anime
 * @param {string} query.required - Anime name
 * @returns {object} 200 - Anime
 * @returns {Error} 404 - No anime matched query
 */
router.get('/anime/search/:query', (req, res) => {
  const anilist_api = require('anilist-node');
  const Anilist = new anilist_api();

  Anilist.searchEntry.anime(req.params.query).then(data => {
    if (data.pageInfo.total === 0) {
      res.status(404).json({
        result: 'error',
        error: 'No anime matching query'
      });
    } else {
      res.json({
        result: 'success',
        data: data.media
      });
    }
  });
});

/**
 * Fetch Anime Data
 * @route GET /anime/:id
 * @content_type application/json
 * @group Anime
 * @param {string} id.required - Anime id
 * @returns {object} 200 - Anime
 * @returns {Error} 404 - No anime matched id
 */
router.get('/anime/:id', (req, res) => {
  const anilist_api = require('anilist-node');
  const Anilist = new anilist_api();

  const id = parseInt(req.params.id);

  Anilist.media.anime(id).then(data => {
    if (data[0]?.message === 'Not Found.') {
      res.status(404).json({
        result: 'error',
        error: 'No anime matching id'
      });
    } else {
      res.json({
        result: 'success',
        data: data
      });
    }
  });
});

/**
 * Fetch Anime Episodes
 * @route GET /anime/:id/episodes
 * @content_type application/json
 * @group Anime
 * @param {string} id.query.required - Anime id
 * @returns {object} 200 - Anime episodes
 * @returns {Error} 404 - No anime matching id
 */
 router.get('/anime/:id/episodes', (req, res) => {
  const anilist_api = require('anilist-node');
  const Anilist = new anilist_api();

  const id = parseInt(req.params.id);

  Anilist.media.anime(id).then(data => {
    if (data[0]?.message === 'Not Found.') {
      res.status(404).json({
        result: 'error',
        error: 'No anime matching id'
      });
    } else {
      res.json({
        result: 'success',
        data: {
          episodes: data.episodes,
          episodes_info: data.streamingEpisodes,
        }
      });
    }
  });
});

/**
 * Fetch Anime Title Variations
 * @route GET /anime/:id/title_variations
 * @content_type application/json
 * @group Anime
 * @param {string} id.query.required - Anime id
 * @returns {object} 200 - Anime title variations
 * @returns {Error} 404 - No anime matching id
 */
router.get('/anime/:id/title_variations', (req, res) => {
  const anilist_api = require('anilist-node');
  const Anilist = new anilist_api();

  const id = parseInt(req.params.id);

  Anilist.media.anime(id).then(data => {
    if (data[0]?.message === 'Not Found.') {
      res.status(404).json({
        result: 'error',
        error: 'No anime matching id'
      });
    } else {
      res.json({
        result: 'success',
        data: data.title
      });
    }
  });
});

/**
 * Fetch Anime Relations
 * @route GET /anime/:id/relations
 * @content_type application/json
 * @group Anime
 * @param {string} id.query.required - Anime id
 * @returns {object} 200 - Anime relations
 * @returns {Error} 404 - No anime matching id
 */
router.get('/anime/:id/relations', (req, res) => {
  const anilist_api = require('anilist-node');
  const Anilist = new anilist_api();

  const id = parseInt(req.params.id);

  Anilist.media.anime(id).then(data => {
    if (data[0]?.message === 'Not Found.') {
      res.status(404).json({
        result: 'error',
        error: 'No anime matching id'
      });
    } else {
      res.json({
        result: 'success',
        data: data.relations
      });
    }
  });
});

/**
 * Fetch Anime Characters
 * @route GET /anime/:id/characters
 * @content_type application/json
 * @group Anime
 * @param {string} id.query.required - Anime id
 * @returns {object} 200 - Anime characters
 * @returns {Error} 404 - No anime matching id
 */
router.get('/anime/:id/characters', (req, res) => {
  const anilist_api = require('anilist-node');
  const Anilist = new anilist_api();

  const id = parseInt(req.params.id);

  Anilist.media.anime(id).then(data => {
    if (data[0]?.message === 'Not Found.') {
      res.status(404).json({
        result: 'error',
        error: 'No anime matching id'
      });
    } else {
      res.json({
        result: 'success',
        data: data.characters
      });
    }
  });
});

/**
 * Fetch Anime Staffs
 * @route GET /anime/:id/staffs
 * @content_type application/json
 * @group Anime
 * @param {string} id.query.required - Anime id
 * @returns {object} 200 - Anime staffs
 * @returns {Error} 404 - No anime matching id
 */
router.get('/anime/:id/staffs', (req, res) => {
  const anilist_api = require('anilist-node');
  const Anilist = new anilist_api();

  const id = parseInt(req.params.id);

  Anilist.media.anime(id).then(data => {
    if (data[0]?.message === 'Not Found.') {
      res.status(404).json({
        result: 'error',
        error: 'No anime matching id'
      });
    } else {
      res.json({
        result: 'success',
        data: data.staff
      });
    }
  });
});

/**
 * Fetch Anime Studios
 * @route GET /anime/:id/studios
 * @content_type application/json
 * @group Anime
 * @param {string} id.query.required - Anime id
 * @returns {object} 200 - Anime studio
 * @returns {Error} 404 - No anime matching id
 */
router.get('/anime/:id/studios', (req, res) => {
  const anilist_api = require('anilist-node');
  const Anilist = new anilist_api();

  const id = parseInt(req.params.id);

  Anilist.media.anime(id).then(data => {
    if (data[0]?.message === 'Not Found.') {
      res.status(404).json({
        result: 'error',
        error: 'No anime matching id'
      });
    } else {
      res.json({
        result: 'success',
        data: data.studios
      });
    }
  });
});

/**
 * Fetch Anime Images
 * @route GET /anime/:id/images
 * @content_type application/json
 * @group Anime
 * @param {string} id.query.required - Anime id
 * @returns {object} 200 - Anime images
 * @returns {Error} 404 - No anime matching id
 */
router.get('/anime/:id/images', (req, res) => {
  const anilist_api = require('anilist-node');
  const Anilist = new anilist_api();

  const id = parseInt(req.params.id);

  Anilist.media.anime(id).then(data => {
    if (data[0]?.message === 'Not Found.') {
      res.status(404).json({
        result: 'error',
        error: 'No anime matching id'
      });
    } else {
      res.json({
        result: 'success',
        data: {
          coverImage: data.coverImage,
          bannerImage: data.bannerImage,
        },
      });
    };
  });
});

/**
 * Fetch Anime Genre
 * @route GET /anime/:id/genre
 * @content_type application/json
 * @group Anime
 * @param {string} id.query.required - Anime id
 * @returns {object} 200 - Anime genre
 * @returns {Error} 404 - No anime matching id
 */
router.get('/anime/:id/genres', (req, res) => {
  const anilist_api = require('anilist-node');
  const Anilist = new anilist_api();

  const id = parseInt(req.params.id);

  Anilist.media.anime(id).then(data => {
    if (data[0]?.message === 'Not Found.') {
      res.status(404).json({
        result: 'error',
        error: 'No anime matching id'
      });
    } else {
      res.json({
        result: 'success',
        data: data.genres
      });
    }
  });
});

// Export as 'router'
module.exports = router;
