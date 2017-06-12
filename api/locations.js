const express = require('express');
const router = express.Router();
const queries = require('../db/queries');

function isValidId(req, res, next) {
  if(!isNaN(req.params.id)) return next();
  next(new Error('Invalid ID'));
}

function validLocation(location) {
  const hasCountry = typeof location.country == 'string' && location.country.trim() != '';
  const hasCity = typeof location.city == 'string' && location.city.trim() != '';
  const hasDate = typeof location.date == 'string' && location.date.trim() != '';

  return hasCountry && hasCity && hasDate;
}
router.get('/', (req, res) => {
  queries
  .getAll()
  .then(locations => {
    res.json(locations)
  });
});

router.get('/:id', (req, res) => {
  queries
  .getOne(req.params.id)
  .then(locations => {
    res.json(locations)
  });
});

router.post('/', (req, res, next) => {
   if (validLocation(req.body)) {
      queries
      .create(req.body)
      .then(location => {
        res.json(location[0]);
      })
    } else {
      next(new Error('Invalid Location'));
    }
});

router.put('/:id', isValidId, (req, res, next) => {
  if (validLocation(req.body)) {
    queries.update(req.params.id, req.body).then(location => {
      res.json(location[0]);
    })
  } else {
    next(new Error('Invalid Location'));
  }
})

module.exports = router;
