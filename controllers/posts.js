import postMessage from "../models/postMessage.js";
import Mongoose from "mongoose";

export const getPosts = async (req, res) => {
  try {
    const data = await postMessage.find();

    res.json(data);
  } catch (error) {
    console.log(error);
  }
};

export const createPost = async (req, res) => {
  try {
    const body = req.body;
    const newPost = new postMessage(body);

    await newPost.save().then((resp) => {
      return res.json(resp);
    });
  } catch (error) {
    console.log(error);
  }
};

export const updatePost = async (req, res) => {
  try {
    const _id = req.params.id;
    const post = req.body;

    if (!Mongoose.Types.ObjectId.isValid(_id))
      return res.status(404).json({ message: "invalid Id" });

    const responce = await postMessage.findByIdAndUpdate(
      _id,
      { ...post, _id },
      { new: true }
    );

    res.json(responce);
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = async (req, res) => {
  try {
    const id = req.params.id;

    if (!Mongoose.Types.ObjectId.isValid(id))
      return res.status(404).json({ message: "invalid Id" });

    await postMessage
      .findByIdAndRemove(id)
      .then(() => {
        res.json({ message: "post Deleted Sucessfully" });
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.log(error);
  }
};

export const likePost = async (req, res) => {
  try {
    const id = req.params.id;

    if (!Mongoose.Types.ObjectId.isValid(id))
      res.json({ message: "id is not valid" });

    const post = await postMessage.findById(id);

    const data = await postMessage.findByIdAndUpdate(
      id,
      { likeCount: post.likeCount + 1 },
      { new: true }
    );
    res.json(data);
  } catch (error) {
    console.log(error);
  }
};
