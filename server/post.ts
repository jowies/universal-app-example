import { ParameterizedContext } from 'koa';
import { Contact, ContactCollection, contactSchema } from '../imports/types';
import { objectIdToString } from './mongo';
import { MongoContext } from './types';

const transform = (contact: Contact): ContactCollection => {
  return {
    ...contact,
    _id: undefined,
  };
};

const newContact = async (ctx: ParameterizedContext<Contact> & MongoContext): Promise<void> => {
  const validate = contactSchema.safeParse(ctx.request.body);
  if (validate.success) {
    const data = validate.data;
    try {
      const result = await ctx.contacts?.insertOne(transform(data));
      const insertedContact = result?.ops[0];
      if (insertedContact) {
        ctx.body = objectIdToString(insertedContact);
        ctx.status = 203;
      } else {
        throw Error;
      }
    } catch {
      ctx.status = 503;
    }
  } else {
    ctx.status = 403;
  }
};

export { newContact };
