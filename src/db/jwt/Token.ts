import { Schema, model, Document } from 'mongoose';

export interface IToken {
  user: string;
  refreshToken: string;
}

const TokenSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  refreshToken: { type: String, required: true },
});

export default model<IToken & Document>('Token', TokenSchema);
