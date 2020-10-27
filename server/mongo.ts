import { MongoClient, ObjectId } from 'mongodb';
import Koa from 'koa';
import { MongoContext } from './types';
import { Contact, ContactCollection } from '../imports/types';

const MONGO_URL = 'mongodb://localhost:27017';
const DB_NAME = 'universal';
const client = new MongoClient(MONGO_URL, { useUnifiedTopology: true });

export const objectIdToString = (contact: ContactCollection): Contact => {
  return { ...contact, _id: contact._id?.toHexString() };
};

export const stringToObjectId = (contact: Contact): ContactCollection => {
  return { ...contact, _id: contact._id ? new ObjectId(contact._id) : undefined };
};

export const mongoConnect = (app: Koa<Koa.DefaultState, MongoContext>): void => {
  client.connect((err, client) => {
    console.log('Connected correctly to server');
    if (err) console.log('Error on connection');

    const db = client.db(DB_NAME);

    app.context.contacts = db.collection('contacts');
  });
};
