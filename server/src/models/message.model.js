/* eslint-disable import/no-mutable-exports */

import mongoose, { Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const MessageSchema = new Schema(
  {
    text: {
      type: String,
      required: [true, 'Some text are required!'],
    },
    room: {
      type: Schema.Types.ObjectId,
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

MessageSchema.statics = {

  createMessage(args, authorId) {
    return this.create({
      ...args,
      sender: authorId,
    });
  },

  getByRoomId(id, { skip = 0, limit = 10 } = {}) {
    return this.find({ room: id })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('sender', 'room');
  },

};

MessageSchema.methods = {

  toJSON() {
    return {
      _id: this._id,
      text: this.text,
      sender: this.sender,
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

export default Message;
