const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const uniqueValidator = require('mongoose-unique-validator');
const mongoosePaginate = require('mongoose-paginate');

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
  {timestamps: true},
);

RoomSchema.plugin(mongoosePaginate);
RoomSchema.plugin(uniqueValidator, {
  message: '{VALUE} already taken!',
});


RoomSchema.statics.createRoom = function(args, authorId) {
  return this.create({
    ...args,
    creator: authorId
  });
};

RoomSchema.statics.list = function({skip = 0, limit = 10} = {}) {
  return this.find()
    .sort({createdAt: -1})
    .skip(skip)
    .limit(limit)
    .populate('creator');
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

module.exports = Room;
