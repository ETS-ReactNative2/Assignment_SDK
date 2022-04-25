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
                        Value: `${req.body.iname}`
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
            res.send(data.Reservations);
        }
    });
})

router.get('/state/:state/:id', (req, res) => {
    var params = {
        InstanceIds: [`${req.params.id}`],
        DryRun: true
    };
    let state = `${req.params.state}`
    if (state.toUpperCase() === "START") {
        // Call EC2 to start the selected instances
        ec2.startInstances(params, function (err, data) {
            if (err && err.code === 'DryRunOperation') {
                params.DryRun = false;
                ec2.startInstances(params, function (err, data) {
                    if (err) {
                        console.log("Error", err);
                    } else if (data) {
                        console.log("Success", data.StartingInstances);
                        res.send(data.StartingInstances)
                    }
                });
            } else {
                console.log("You don't have permission to start instances.");
            }
        });
    } else if (state.toUpperCase() === "STOP") {
        // Call EC2 to stop the selected instances
        ec2.stopInstances(params, function (err, data) {
            res.send(err);
            if (err && err.code === 'DryRunOperation') {
                params.DryRun = false;
                ec2.stopInstances(params, function (err, data) {
                    if (err) {
                        console.log("Error", err);
                    } else if (data) {
                        console.log("Success", data.StoppingInstances);
                        res.send(data.StoppingInstances)
                    }
                });
            } else {
                console.log("You don't have permission to stop instances");
            }
        });
    }
});

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