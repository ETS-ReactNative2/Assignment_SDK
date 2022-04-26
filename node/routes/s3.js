const express = require("express")
const router = express.Router()
var fs = require('fs');

var AWS = require('aws-sdk');
;
AWS.config.update({ region: 'us-east-1' })
s3 = new AWS.S3();

router.get("/", (req, res) => { // root path
    res.send("<h1>Welcome to S3 CRUD</h1>")
})

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
router.get('/listobj/:name',(req, res) => {
    var bucketParams = {
        Bucket: `${req.params.name}`
    };
    s3.listObjects(bucketParams, function (err, data) {

        if (err) {
            console.log("Error", err);
            res.send(err)
        } else {
            console.log("Success", data);
            res.send(data)
        }
    });
})

router.post('/create', (req, res) => {
    var bucketParams = {
        Bucket: `${req.body.name}`
    };

    s3.createBucket(bucketParams, function (err, data) {
        if (err) {
            console.log("Error", err);
            res.send(err)
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


router.post("/upload", (req, res) => {
    var uploadParams = {
        Bucket: `${req.body.name}`,
        file: `${req.body.file}`,
        body: "",
        key: ""
    }
    var file = uploadParams.file
    var fileStream = fs.createReadStream(file);
    fileStream.on('error', function (err) {
        console.log('File Error', err);
    });
    uploadParams.body = fileStream;
    var path = require('path');
    uploadParams.key = path.basename(file);
    s3.upload(uploadParams, function (err, data) {
        if (err) {
            console.log("Error", err);
            res.send(err)
        } if (data) {
            console.log("Upload Success", data.Location);
            res.send(data.Location)
        }
    });
})


router.get('/download-file', function (req, res, next) {

    // download the file via aws s3 here
    var fileKey = req.query['fileKey'];

    console.log('Trying to download file', fileKey);

    // AWS.config.update(
    //     {
    //         accessKeyId: "....",
    //         secretAccessKey: "...",
    //         region: 'ap-southeast-1'
    //     }
    // );
    var s3 = new AWS.S3();
    var options = {
        Bucket: `${req.body.name}`,
        Key: fileKey,
    };

    res.attachment(fileKey);
    var fileStream = s3.getObject(options).createReadStream();
    fileStream.pipe(res);
});

module.exports = router

