import { ParameterizedContext } from 'koa';
import { RootState } from '../../imports/store/reducer';
import { MongoContext } from '../types';
import { ContactCollection } from '../../imports/types';
import { objectIdToString } from '../mongo';

const initializeReduxState = async (
  ctx: ParameterizedContext<unknown> & MongoContext,
): Promise<RootState> => {
  const contactsFromDB: ContactCollection[] | undefined = await ctx.contacts?.find()?.toArray();
  if (!contactsFromDB) {
    throw Error;
  }
  const withString = contactsFromDB.map(objectIdToString);

  const initialState = { contact: { contacts: withString } };

  return initialState;
};

export { initializeReduxState };
