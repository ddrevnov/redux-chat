/* eslint-disable import/no-mutable-exports */

import mongoose, { Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const RoomSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Room name is required!'],
      unique: true,
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Creator is required!'],
    },
  },
  { timestamps: true },
);

RoomSchema.plugin(uniqueValidator, {
  message: '{VALUE} already taken!',
});

RoomSchema.statics = {

  createRoom(args, authorId) {
    return this.create({
      ...args,
      creator: authorId,
    });
  },

  list({ skip = 0, limit = 10 } = {}) {
    return this.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('creator');
  },

};

RoomSchema.methods = {

  toJSON() {
    return {
      _id: this._id,
      name: this.name,
      creator: this.creator,
      createdAt: this.createdAt,
    };
  },
};

let Room;

try {
  Room = mongoose.model('Room');
} catch (e) {
  Room = mongoose.model('Room', RoomSchema);
}

export default Room;
