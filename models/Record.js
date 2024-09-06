import mongoose from "mongoose";

const recordSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  category: { type: String, required: true },
  emoji: { type: String, required: true },
  value: { type: Number, required: true },
  inputDate: { type: String, required: true },
  note: { type: String, required: false },
  isExpenditure: { type: Boolean, required: true },
});

const Record = mongoose.model("Record", recordSchema);

// interface RecordType {
//   category: string;
//   emoji: string;
//   value: number;
//   inputDate: string;
//   note?: string;
//   isExpenditure: boolean;
// }

export { Record };

// export type { RecordType };

