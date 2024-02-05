const express = require('express');
const app = express();
const mongoose = require("mongoose")
const cors = require('cors');
const port = process.env.PORT || 5000;
require('dotenv').config();
const multer = require('multer');
const { ObjectId } = require('mongodb');
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
const { connectToDatabase } = require('./database');
const jwt = require('jsonwebtoken');
const postjob = require('./routes/jobs');
const { any } = require('joi');
// const { get } = require('mongoose');

// for multer storage.
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

//middleware
app.use(express.json())
app.use(cors())            // ss -->domain  and  sf-->domain2

// username: sunkarisahith03
// password: mEX0vuRNSE062nEQ

async function run() {
  try {
    const { recruitersCollection, seekersCollection, jobsCollections,resumeCollection } = await connectToDatabase();

    // Routes for signup and login
    app.use('/api/users', (req, res, next) => {
      // Pass the recruiters and seekers collections to the user routes
      userRoutes(req, res, next, recruitersCollection, seekersCollection);
    });
    app.use('/api/auth', authRoutes);

    app.use('/',postjob);
    
    // after posting a job
    // app.post("/post-job", async(req, res)=>{
    //     const body = req.body;
    //     body.createAt = new Date();
    //     // console.log(body)
    //     const result = await jobsCollections.insertOne(body);
    //     if (result.insertedId) {
    //         return res.status(200).send(result);
    //     }else{
    //         return res.status(404).send({
    //             message:"cannot insert try again later!",
    //             status: false
    //         })
    //     }
    // })


  // app.get("/post-res/:email", async (req,res) => {
    //   console.log("getting resume by email.")
    //   try {
    //   const resume  = await resumeCollection.findOne({email: req.params.email});
    //   if (!resume) {
    //     // If resume with the given email doesn't exist, you can handle it accordingly
    //     return res.status(404).json({ error: "Resume not found" });
    //   }
    //    res.contentType(resume.fileType);
    //    res.send(resume.resume.buffer);
    //     // res.send(resume.email);
      
    //   } catch (error) {
    //     console.log({error: error.message})
    //   }
    // })
    
    // getting the resume details with id of resume.

    app.get("/all-res/:id", async (req,res) => {
      try {
      const id  = req.params.id;
      const resumes  = await resumeCollection.findOne({_id: new ObjectId(id)},{resume:0});
      if (!resumes) {
        // If resume with the given email doesn't exist, you can handle it accordingly
        return res.status(404).json({ error: "Resume not found" });
      }
       res.send(resumes)
        // res.send(resume.email);
      
      } catch (error) {
        console.log({error: error.message})
      }
    })

    // posting the resume with all fields.
    app.post('/post-res', upload.single('resume'), async (req, res) => {
      try {
        if (!req.file) { 
          return res.status(400).send({
            message: 'No file was uploaded.',
            status: false,
          });
        }
    
        const { fullName, email, number, description } = req.body;
    
        const Resumes = await resumeCollection.insertOne({
          fullName,
          email,
          number,
          fileType: req.file.mimetype,
          description,
          resume: req.file.buffer, // Storing the file buffer as binary in the database
          createAt: new Date(),
        });
        console.log(Resumes);
        if (Resumes.insertedId) {
          return res.status(200).send(Resumes);
  
        } else {
          return res.status(404).send({
            message: 'Cannot upload resume, try again later!',
            status: false,
          });
        }
      } catch (error) {
        console.error('Error uploading resume:', error);
        return res.status(500).send({
          message: 'Internal Server Error',
          status: false,
        });
      }
      
    });

  // deleting the resume of pdf format.

    app.delete("/all-res/:id", async (req, res) => {
      console.log("deleting resume")
      const {resumeCollection } = await connectToDatabase();
    const id = req.params.id;
    const filter = { _id: new ObjectId(id) };
    try {
      const resume = await resumeCollection.deleteOne(filter);
      res.send(resume);

    } catch (error) {
      console.error("Error deleting the resume: ",error);
      res.status(500).send({
        message:"Internal server error"
      })
    }
  });

  // Showing the resume of pdf format.
    app.get('/view-resume/:id', async (req, res) => {
      try {
        const id = req.params.id;
    
        // Assuming you have a collection named `resumeCollection`
        const resume = await resumeCollection.findOne({ _id: new ObjectId(id) });
    
        console.log('Resume Content Length:', resume.resume ? resume.resume.length : 'N/A');

        if (!resume) {
          return res.status(404).send({
            message: 'Resume not found',
            status: false,
          });
        }
    
        // Set headers to indicate the file type
        res.setHeader('Content-Type', resume.fileType || 'application/pdf');
        // res.setHeader('Content-Disposition', 'inline; filename=resume.pdf');
    
        // Send the file buffer as a response
        res.send(resume.resume.buffer);

        console.log('Resume ID:', id);
        console.log('File Type:', resume.fileType);

      } catch (error) {
        console.error('Error fetching resume:', error);
        return res.status(500).send({
          message: 'Internal Server Error',
          status: false,
        });
      }
    });
    
  //  const { ObjectId } = require('mongodb');
    
    // importing all jobs
    // app.get("/all-jobs", async(req, res)=>{
    //     const jobs = await jobsCollections.find({}).toArray()
    //     res.send(jobs)
    // })

    // // importing single job.
    // app.get("/all-jobs/:id", async(req,res)=>{
    //   const id = req.params.id;
    //   const job = await jobsCollections.findOne({
    //     _id:new ObjectId(id)
    //   })
    //   res.send(job)
    // } )


    // // importing jobs by email.
    // app.get("/myJobs/:email", async(req, res)=>{
    //     // console.log(req.params.email)
    //     const jobs = await jobsCollections.find({postedBy : req.params.email}).toArray();
    //     res.send(jobs);
    // })

    //   // deleting a job

    //     app.delete("/job/:id", async (req, res) => {
    //       const id = req.params.id;
    //       const filter = { _id: new ObjectId(id) };
        
    //       try {
    //         const result = await jobsCollections.deleteOne(filter);
    //         res.send(result);
    //       } catch (error) {
    //         console.error('Error deleting job:', error);
    //         res.status(500).send({
    //           message: "Internal server error",
    //           status: false
    //         });
    //       }
    //     });
        
    //     // Editing Jobs

    //     app.patch("/edit-job/:id", async(req,res)=>{
    //         const id = req.params.id;
    //         const jobData = req.body;
    //         const filter = {_id: new ObjectId(id)};
    //         const options = {upsert:true}
    //         const updateDoc= {
    //           $set:{
    //               ...jobData
    //           },
    //         }

    //         const result = await jobsCollections.updateOne(filter,updateDoc,options);
    //         res.send(result)
    //     })

        // const token = (req,res,next) => {
        //   const getToken = req.headers['authorization'];
        //   // res.send(getToken)
        //   console.log(getToken)
        //   if (!getToken) {
        //     return res.status(401).json({error: 'Invalid or missing Authorization'})
        //   }

        //   const reqToken = getToken.split(' ')[1];
        //  // console.log(reqToken)
        //   try {
        //     const user = jwt.verify(reqToken,process.env.JWTPRIVATEKEY);
        //     console.log(user);
        //     req.user = user;
        //     next();
        //   } catch (err) {
        //     return res.status(401).json({error:'invalid'});
        //   }
        // }
        
    
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    //
  }
}
run().catch(console.dir);



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

