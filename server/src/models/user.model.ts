import { Document, model, Schema } from "mongoose";
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
    status: {
      type: String,
      enum: Object.values(UserRole),
    },
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

userSchema.pre("save", function (next) {
  if (this.isModified("firstName") || this.isModified("lastName")) {
    console.log("Full name changed");
  }
  next();
});

userSchema.methods.pp = function () {
  console.log("hello");
  return 44;
};

const User = model("User", userSchema);
export default User;
