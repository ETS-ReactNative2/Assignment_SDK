# Assignment_SDK

This is an Assignment on AWS SDK (Software Development Kit). We will be using to to access various AWS services from our own designed APIs.

## Access Link (until instance terminates)

http://54.242.142.78:3000/

*(please access through mozilla firefox)*

## Tech Stack
* Backend: Nodejs
* Frontend: ReactJs
* Deployment: Docker and AWS EC2

## Running the Application
* As an Image is already published of the Code, you just need to pull the image to your local machine (after installing docker) and then run the contianer
  with the command specified.

## Installing Docker (on Ubuntu)
Visit this link: https://docs.docker.com/engine/install/ubuntu/

## Image Link (check for updates regularly)
* Run the Following Command
  ```bash
  docker pull dakshinnovaccer/assignment_sdk:12.0
  docker pull dakshinnovaccer/react_sdk:4.0
  ```
* To run the container of the Node application
  ```bash
  sudo docker run --name new_cont -p 3500:3500 -e AWS_ACCESS_KEY_ID=##### -e AWS_SECRET_ACCESS_KEY=#### -e AWS_DEFAULT_REGION=#### dakshinnovaccer/assignment_sdk:8.0
  ```
  * new_cont --> name of the container
  * AWS_ACCESS_KEY_ID --> the access key generated from the user
  * AWS_SECRET_ACCESS_KEY --> secret access key generated
  * AWS_DEFAULT_REGION --> the default region you want your services to be at
  * dakshinnovaccer/assignment_sdk:8.0 00> name of the image
  
  
## Necessary Installations
* Node
  ```bash
  sudo apt-get update
  sudo apt-get install nodejs
  sudo apt-get install npm
  sudo apt-get update
  ```
  Now at the location where package.json is in the 'node' folder run the following command on the terminal
  ```bash
  npm install
  npm install pm2 -g
  ```
  It will install all the necessary node packages
  
  To run the Node Server
  ```bash
  pm2 start index.js --watch
  ```

* React
  
  Now at the location where package.json is in the 'node' folder run the following command on the terminal
  ```bash
  npm install
  ```
  It will install all the necessary react packages
  
  To run the Client Machine
  ```bash
  npm start
  ```
  
## Functionalities
### S3 Bucket
Amazon Simple Storage Service (Amazon S3) is an object storage service offering industry-leading scalability, data availability, security, and performance. Customers of all sizes and industries can store and protect any amount of data for virtually any use case, such as data lakes, cloud-native applications, and mobile apps. With cost-effective storage classes and easy-to-use management features, you can optimize costs, organize data, and configure fine-tuned access controls to meet specific business, organizational, and compliance requirements.

aws-sdk is used as the sdk for the NodeJs related apps for AWS services

In S3, the follwoing services are implemented
* **Creation of Buckets**

  Method: Post
  
  We will use Postman to showcase how to make API calls
  
  In the http API call of Postman type 
  ```url
  http://localhost:3500/s3/create
  ```
  In headers
  
  Key: Content-Type
  
  Value: application/json
  
  In Body:
  ```json
  {
    "name": "name of bucket"
   }
  ```
  
  
* **Listing Buckets**

  Method: get
  ```url
  http://localhost:3500/s3/list
  ```
* **Uploading Content in the Bucket (try through Postman)**
  
* **Listing of Buckets content**
  
  Method: get
  ```url
  http://localhost:3500/listobj/name_of_bucket
  ```
* **Deleting Bucket**
  
  Mehod: Delete
  ```url
  http://localhost:3500/delete/name_of_bucket
  
### EC2

* **Creation of Instance**
  ```url
  http://localhost:3500/ec2/create
  ```
  Method: Post
  
  We will use Postman to showcase how to make API calls
  
  In the http API call of Postman type 
  ```url
  http://localhost:3500/ec2/create
  ```
  In headers
  
  Key: Content-Type
  
  Value: application/json
  
  In Body:
  ```json
  {
    "imgid":"ami-04505e74c0741db8d", 
    "inst": "t2.micro",
    "iname": "Instance_name"
  }
  ```
* **Listing of Instance**
  ```API
  http://localhost:3500/ec2/list
  ```
  Method: get
 
* **Terminating Instance** 
  ```API
  http://localhost:3500/ec2/terminate/instance_id
  ```
  Method: delete
 
## Screeshots of the Working App
* Homepage

![alt_text](https://github.com/daksh-innovaccer/Assignment_SDK/blob/master/Images/Home%20Page.png)

* S3 Buckets Listed

![S3_buckets](https://github.com/daksh-innovaccer/Assignment_SDK/blob/master/Images/s3bucket_listing.png)

* S3 Bucket Creation

![bucket_creation](https://github.com/daksh-innovaccer/Assignment_SDK/blob/master/Images/creating_new_bucket.png)

* S3 Bucket Created

![Bucket Created](https://github.com/daksh-innovaccer/Assignment_SDK/blob/master/Images/new_bucket_created.png)

* Instance Listing

![instance_listing](https://github.com/daksh-innovaccer/Assignment_SDK/blob/master/Images/ec2instances_listing.png)

* Instance Creation

*AMI id is the id of the Amazon Machine Image used for creation of this instance, here it is of Ubuntu.*

![Instance_creation](https://github.com/daksh-innovaccer/Assignment_SDK/blob/master/Images/new_instance_creation.png)

* Instance Getting Created

![instance_pending](https://github.com/daksh-innovaccer/Assignment_SDK/blob/master/Images/instance_getting_created.png)

* Stopping Instance (after it gets created)

![Instance Stopping](https://github.com/daksh-innovaccer/Assignment_SDK/blob/master/Images/stopped_instance.png)

 ## Notes about the project
 * Please Open the EC2 Link through Mozilla firefox, don't use Google Chrome
 * Also please don't stop the instance with id : i-020ab79480108ffc3, the app will crash if the instance is stopped. You can stop/start/terminate other instances
* EC2 link will work until the lab closes
* If the link not works, see the readme file for the screenshots
* localhost will work always
* Please read README file in the github
* If wants to run from localhost, change the USER_BASE_URL in services files in client folder from <ip of ec2>:3500 to localhost:3500
 
 ## Further Improvements
 * Implementing the Download functionality in S3
 * Implementing Upload files from frontend
 * Check other services of AWS too.
 * Add authentication


