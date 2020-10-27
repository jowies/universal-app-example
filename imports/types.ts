import { ObjectId } from 'mongodb';
import * as z from 'zod';

type WithObject<T> = {
  [key in keyof T]: key extends '_id' ? ObjectId : T[key];
};

const contactSchema = z.object({
  name: z.string().min(5),
  age: z.number().nonnegative(),
  mail: z.string().email(),
  _id: z.string().optional(),
});

type Contact = z.infer<typeof contactSchema>;

type ContactCollection = WithObject<Contact>;

export { Contact, ContactCollection, contactSchema };
