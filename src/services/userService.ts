import { Request, Response } from "express";
import axiosGiphyInstance from "../utils/axiosGiphyInstance";
import { User } from "../models/user";

// get user data
export const getUserData = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;

    const user = await User.findById(userID, { password: 0 });

    if (user) res.status(200).json({ userData: user });
    else res.status(404).json({ msg: "User not found" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Something went wrong" });
  }
};

// get trending gifs
export const getTrendingGIFs = async (req: Request, res: Response) => {
  try {
    const { offset } = req.query;

    const apiRes = await axiosGiphyInstance.get("trending", { params: { offset } });

    res.status(200).json({ gifs: apiRes.data });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Something went wrong" });
  }
};

// search
export const search = async (req: Request, res: Response) => {
  try {
    const { q, offset } = req.query;

    const apiRes = await axiosGiphyInstance.get("search", { params: { q, offset } });

    res.status(200).json({ gifs: apiRes.data });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Something went wrong" });
  }
};

// save gifs
export const saveGIF = async (req: Request, res: Response) => {
  try {
    const { gif } = req.body;
    const { userID } = req.params;

    if (!gif || !gif.url || !gif.fixed_size_url || !gif.id) {
      res.status(400).json({ msg: "Please provide a valid GIF object" });
    }

    await User.updateOne({ _id: userID }, { $push: { saved: gif } });

    res.status(201).json({ msg: "Added to Saved" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Something went wrong" });
  }
};

// unsave gifs
export const unsaveGIF = async (req: Request, res: Response) => {
  try {
    const { gif } = req.body;
    const { userID } = req.params;

    if (!gif || !gif.url || !gif.fixed_size_url || !gif.id) {
      res.status(400).json({ msg: "Please provide a valid GIF object" });
    }

    await User.updateOne({ _id: userID }, { $pull: { saved: { id: gif.id } } });

    res.status(201).json({ msg: "Removed from Saved" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Something went wrong" });
  }
};
