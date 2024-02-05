// database.js

const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const mongoose = require('mongoose');

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@emp-portal.hzccd3b.mongodb.net/empPortal?retryWrites=true&w=majority`;
// const uri = "mongodb://localhost:27017";

mongoose.connect(uri)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function connectToDatabase() {
  try {
    await client.connect();
    // console.log('Connected to the database successfully.');

    const db = client.db('empPortal');

    // Use separate collections for Recruiters and Seekers
    const recruitersCollection = db.collection('Recruiters');
    const seekersCollection = db.collection('Seekers');
    const jobsCollections = db.collection('JobFusion');
    const resumeCollection = db.collection('Resumes');
    const govtCollection = db.collection('GovtJobs');

    return { db, recruitersCollection, seekersCollection,jobsCollections, resumeCollection,govtCollection };
  } catch (error) {
    console.error('Error connecting to the database:', error);
    throw error;
  }
}

module.exports = { connectToDatabase };

