import mongoose from 'mongoose'
import { createSchema, Type, typedModel } from 'ts-mongoose';

//const ChaseSchema = new Schema(
//  {
//    metaData: ChaseMetaDataSchema
//  }
//);
//const ChaseListSchema = new Schema(
//  {
//    chases: [ ChaseMetaDataSchema ]
//  }
//);
//

const DescriptionSchema = createSchema({
  text: Type.string({ required: true }),
  image: Type.string({ required: true }),
});

const ChaseMetaDataSchema = createSchema(
  {
    id: Type.string({ required: true, unique: true, index: true }),
    version: Type.string({ required: true }),
    title: Type.string({ required: true }),
    description: Type.string({ required: true }),
    preview: Type.object().of({
      description: Type.schema({ required: true }).of(DescriptionSchema),
    }),
    author: Type.string(),
    lastEdited: Type.date(),
    creationDate: Type.date(),
    comment: Type.string(),
  }
);

export const connection = mongoose.createConnection(`mongodb://localhost:27017/test`, { useNewUrlParser: true, useUnifiedTopology: true })

export const DescriptionModel = typedModel('Description', DescriptionSchema, undefined, undefined, undefined, connection);
DescriptionModel.findById('123').then(desc => {
  if (desc) {
    desc.text // autocomplete here
  }
});

export const ChaseMetaDataModel = typedModel('ChaseMetaData', ChaseMetaDataSchema, undefined, undefined, undefined,
                                             connection);
DescriptionModel.findById('123').then(desc => {
  if (desc) {
    desc.id // autocomplete here
  }
});

export class Database {
  constructor() {

    console.log(connection.modelNames()) // Prints: [ 'User' ]

    // Now you can use the model directly
    ChaseMetaDataModel.find({ id: 'Peter' })
    // Or through the connection
    connection.model('ChaseMetaData').find({ id: 'Peter' })
  }
};
