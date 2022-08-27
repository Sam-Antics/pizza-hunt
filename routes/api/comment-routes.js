const router = require('express').Router();
const {
  addComment,
  removeComment    
} = require('../../controllers/comment-controller');

// POST route for comments
router
  .route('/:pizzaId')
  .post(addComment)


// DELETE route for comments
router
  .route('/:pizzaId/:commentId')
  .delete(removeComment);


module.exports = router;