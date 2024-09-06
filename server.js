import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { Record } from "./models/Record.js";

const app = express();
const port = process.env.PORT || 5001;
const ObjectId = mongoose.Types.ObjectId;

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/recordCollection");
const db = mongoose.connection;
db.once("open", () => {
  console.log("Connected to MongoDB");
});

app.get("/records", async (req, res) => {
  try {
    const records = await Record.find();
    res.status(200).json(records);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching records" }, err);
  }
});

app.post("/records", async (req, res) => {
  try {
    const newRecord = new Record(req.body);
    const addRecord = db.collection("records").insertOne({
      category: newRecord.category,
      emoji: newRecord.emoji,
      value: newRecord.value,
      inputDate: newRecord.inputDate,
      note: newRecord.note,
      isExpenditure: newRecord.isExpenditure,
    });

    if (addRecord) {
      res.status(200).json({ message: "Record added successfully" });
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

app.delete("/records/:id", async (req, res) => {
  const recordId = req.params.id;

  if (ObjectId.isValid(recordId)) {
    try {
      const deleteRecord = db
        .collection("records")
        .deleteOne({ _id: new ObjectId(recordId) });

      if (deleteRecord) {
        res
          .status(200)
          .json({ message: "Record deleted successfully (server)" });
      } else {
        res.status(404).json({ message: "Record not found (server)" });
      }
    } catch (err) {
      res.status(500).json({ error: "Could not delete the record" });
    }
  } else {
    res.status(500).json({ error: "Not a valid record id" });
  }
});

app.patch("/records/:id", async (req, res) => {
  const recordId = req.params.id;
  const updates = req.body;
  // console.log("server: ", updates);

  if (ObjectId.isValid(recordId)) {
    try {
      const updateRecord = db
        .collection("records")
        .updateOne({ _id: new ObjectId(recordId) }, { $set: updates });

      if (updateRecord) {
        res.status(200).json({ message: "Record updated successfully" });
      }
    } catch (err) {
      res.status(500).json({ error: "Could not update the record" });
    }
  } else {
    res.status(500).json({ error: "Not a valid record id" });
  }
});

app.listen(port, () => console.log(`Server running on port ${port}`));

