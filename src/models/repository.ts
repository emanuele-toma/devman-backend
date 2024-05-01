import { Schema, model } from 'mongoose';

const RepositorySchema = new Schema({
  name: String,
  url: String,
  scripts: {
    pull: String,
    checkout: String,
    start: String,
    stop: String,
    logs: String,
    online: String,
    uptodate: String,
  },
});

export const RepositoryModel = model('Repository', RepositorySchema);
