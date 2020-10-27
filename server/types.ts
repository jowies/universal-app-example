import { Collection } from 'mongodb';
import { ContactCollection } from '../imports/types';

export interface MongoContext {
  contacts?: Collection<ContactCollection>;
}
