import mongoose, { Document, model, Schema } from "mongoose";
import bcrypt from "bcryptjs";
export enum UserRole {
  ADULT = "adult",
  TEEN = "teen",
  OLD = "old",
}

interface IUser {
  firstName: String;
  lastName: String;
  age: Number;
  status?: UserRole;
  Blogs: mongoose.Types.ObjectId;
  email: String;
  password: string;
}
interface UserDocument extends IUser, Document {
  fullName: String;
}

const userSchema = new Schema<UserDocument>(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: String,
    age: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(UserRole),
    },
    Blogs: [{ type: Schema.Types.ObjectId, ref: "Post" }],
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (_doc, ret) => {
        const { firstName, lastName, ...rest } = ret;
        return rest;
      },
    },
  }
);
userSchema.index({ name: 1, age: -1 });

userSchema.virtual("fullName").get(function (this: UserDocument) {
  return `${this.firstName} ${this.lastName}`;
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  const hash = bcrypt.hash(this.password, salt);
  this.password = await hash;
  next();
});

userSchema.methods.matchPassword = async function () {
  return await bcrypt.compare(this.password, this.password);
};

const User = model("User", userSchema);
export default User;
