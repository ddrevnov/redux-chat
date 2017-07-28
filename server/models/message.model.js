const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const uniqueValidator = require('mongoose-unique-validator');

const MessageSchema = new Schema(
  {
    text: {
      type: String,
      required: [true, 'Some text are required!'],
    },
    room: {
      type: Schema.Types.ObjectId,
      ref: 'Room',
      required: [true, 'Room is required!'],
    },
    sender: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Sender is required!'],
    },
  },
  { timestamps: true },
);

MessageSchema.plugin(uniqueValidator, {
  message: '{VALUE} already taken!',
});

MessageSchema.statics.createMessage = function(args, authorId) {
  return this.create({
    ...args,
    sender: authorId
  });
};

MessageSchema.statics.getByRoomId = function(id) {
  return this.find({ room: id })
    .sort({ createdAt: 1 })
    .populate('sender', 'room');
};

MessageSchema.methods = {

  toJSON() {
    return {
      _id: this._id,
      text: this.text,
      sender: this.sender,
      room: this.room,
      createdAt: this.createdAt,
    };
  },
};

let Message;

try {
  Message = mongoose.model('Message');
} catch (e) {
  Message = mongoose.model('Message', MessageSchema);
}

module.exports = Message;
