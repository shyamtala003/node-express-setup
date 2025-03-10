import { Schema, model } from 'mongoose';

const CompanySchema = Schema({
  title: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  location: {
    country: { type: String, required: true },
    address: { type: String, required: true }
  }
});

const personSchema = Schema({
  index: { type: Number, required: true },
  name: { type: String, required: true },
  isActive: { type: Boolean, required: true },
  registered: { type: Date, required: true },
  age: { type: Number, required: true },
  gender: { type: String, enum: ['male', 'female', 'other'], required: true },
  eyeColor: { type: String, required: true },
  favoriteFruit: { type: String, required: true },
  company: { type: CompanySchema, required: true },
  tags: { type: [String], required: true }
});

export default model('Person', personSchema, 'persons');
