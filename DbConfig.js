import AWS from 'aws-sdk'

let awsConfig = {
    region: "us-east-1",
    endpoint: "http://localhost:8000",
    accessKeyId: "fakeMyKeyId",
    secretAccessKey: "fakeSecretAccessKey"
};
AWS.config.update(awsConfig);

let dynamoDB=new AWS.DynamoDB();

export default dynamoDB;