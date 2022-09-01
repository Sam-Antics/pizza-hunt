const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat')

const ReplySchema = new Schema(
  {
    // set custom ID to avoid confusion with the parent comment _id
    replyId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
    },
    replyBody: {
      type: String,
      required: 'Please enter a reply.',
      trim: true
    },
    writtenBy: {
      type: String,
      required: 'You must enter a name.',
      trim: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: createdAtVal => dateFormat(createdAtVal)
    }
  },
  {
    toJSON: {
      getters: true
    }
  }
);

const CommentSchema = new Schema(
  {
    writtenBy: {
      type: String,
      required: 'Please provide a name.',
      trim: true
    },
    commentBody: {
      type: String,
      required: 'Please enter your comment.',
      trim: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: createdAtVal => dateFormat(createdAtVal)
    },
    // use ReplySchema to validate data for a reply
    replies: [ReplySchema]
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  }
);

// get total count of replies on retrieval
CommentSchema.virtual('replyCount').get(function() {
  return this.replies.length;
});

// create the Comment model using the Comment schema
const Comment = model('Comment', CommentSchema);

module.exports = Comment;