import AWS from 'aws-sdk'

let awsConfig = {
    region: "us-east-1",
    endpoint: "http://localhost:8000",
    accessKeyId: "fakeMyKeyId",
    secretAccessKey: "fakeSecretAccessKey"
};
AWS.config.update(awsConfig);

let dynamoDB = new AWS.DynamoDB();

let params = {
    TableName: 'StudentTable',
    KeySchema: [
        {
            AttributeName: 'Sid',
            KeyType: 'HASH'
        },
    ],
    AttributeDefinitions: [
        {
            AttributeName: 'Sid',
            AttributeType: 'N'
        },
        {
            AttributeName: 'Department',
            AttributeType: 'S'
        }
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5
    },
    GlobalSecondaryIndexes: [
        {
            IndexName: 'Department',
            KeySchema: [
                {
                    AttributeName: 'Department', KeyType: 'HASH'
                }
            ],
            Projection: {
                ProjectionType: 'ALL'
            },
            ProvisionedThroughput: {
                ReadCapacityUnits: 5,
                WriteCapacityUnits: 5
            }
        }
    ]

}
dynamoDB.createTable(params, (err, data) => {
    if (err) console.log(err);
    console.log(data)
})