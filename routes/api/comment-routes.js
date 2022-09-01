const router = require('express').Router();
const {
  addComment,
  removeComment,
  addReply,
  removeReply
} = require('../../controllers/comment-controller');

// POST route for comments
router
  .route('/:pizzaId')
  .post(addComment);


// PUT/DELETE route for comments
router
  .route('/:pizzaId/:commentId')
  .put(addReply)
  .delete(removeComment);

// DELETE route for replies
router
  .route('/:pizzaId/:commentId/:replyId')
  .delete(removeReply);



module.exports = router;