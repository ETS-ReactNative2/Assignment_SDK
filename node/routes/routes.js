const express = require("express")
const router = express.Router()

var AWS = require('aws-sdk');
// Set the region
AWS.config.update({ region: 'us-east-1' });

// Create S3 service object
s3 = new AWS.S3();

router.get('/list', async (req, res) => {
    s3.listBuckets(function (err, data) {
        if (err) {
            console.log("Error", err);
        } else {
            console.log("Success", data.Buckets);
            res.send(data.Buckets)
        }
    });
})

router.post('/create', (req, res) => {
    var bucketParams = {
        Bucket: `${req.body.name}`
    };

    // call S3 to create the bucket
    s3.createBucket(bucketParams, function (err, data) {
        if (err) {
            console.log("Error", err);
        } else {
            console.log("Success", data);
            res.send(data)
        }
    });
});

router.delete('/delete/:name', (req, res) => {
    var bucketParams = {
        Bucket: `${req.params.name}`
    };

    // Call S3 to delete the bucket
    s3.deleteBucket(bucketParams, function (err, data) {
        if (err) {
            console.log("Error", err);
            res.status(409).send(err)
        } else {
            console.log("Success", data);
            res.send(data)
        }
    });
});


module.exports = router

