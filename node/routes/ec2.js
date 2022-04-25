const express = require("express")
const router = express.Router()

// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Load credentials and set region from JSON file
AWS.config.update({ region: 'us-east-1' });

// Create EC2 service object
var ec2 = new AWS.EC2();

// AMI is amzn-ami-2011.09.1.x86_64-ebs
router.get("/", (req, res) => { // root path
    res.send("<h1>Welcome to EC2 CRUD</h1>")
})

router.post("/create", (req, res) => {
    const params = {
        ImageId: `${req.body.imgid}`,
        InstanceType: `${req.body.inst}`,
        // KeyName: 'My-Key-Pair',
        MinCount: 1,
        MaxCount: 1,
        // SubnetId: 'subnet-#####',
        TagSpecifications: [
            {
                ResourceType: "instance",
                Tags: [
                    {
                        Key: "Name",
                        Value: "Node SDK EC2 Creation"
                    }
                ]
            }
        ]
    };

    ec2.runInstances(params, function (err, data) {
        if (err) {
            console.log(err, err.stack); // an error occurred
            res.send(err)
        } else {
            console.log(data);  
            res.send(data)         // successful response
        }
    });
})

router.get('/list', (req, res) => {

    var params = {
        DryRun: false
    };

    // Call EC2 to retrieve policy for selected bucket
    ec2.describeInstances(params, function (err, data) {
        if (err) {
            console.log("Error", err.stack);
            res.send(err.stack)
        } else {
            console.log("Success", JSON.stringify(data));
            res.send(data)
        }
    });
})

router.get("/stop/:inst", (req, res) => {
    var params = {
        InstanceIds: `${req.params.inst}`,
        DryRun: true
    };
    ec2.stopInstances(params, function (err, data) {
        if (err && err.code === 'DryRunOperation') {
            params.DryRun = false;
            ec2.stopInstances(params, function (err, data) {
                if (err) {
                    console.log("Error", err);
                } else if (data) {
                    console.log("Success", data.StoppingInstances);
                }
            });
        } else {
            console.log("You don't have permission to stop instances");
        }
    });
})

router.get("/start/:inst", (req, res) => {
    var params = {
        InstanceIds: `${req.params.inst}`,
        DryRun: true
    };
    ec2.startInstances(params, function (err, data) {
        if (err && err.code === 'DryRunOperation') {
            params.DryRun = false;
            ec2.startInstances(params, function (err, data) {
                if (err) {
                    console.log("Error", err);
                } else if (data) {
                    console.log("Success", data.StartingInstances);
                }
            });
        } else {
            console.log("You don't have permission to start instances.");
        }
    });
})

router.delete("/terminate/:inst", (req, res) => {
    const params = {
        InstanceIds: [`${req.params.inst}`]
    };

    ec2.terminateInstances(params, function (err, data) {
        if (err) {
            console.log(err, err.stack); // an error occurred
        } else {
            console.log(data);           // successful response
        }
    });
})

module.exports = router