
import dynamoDB from "../DbConfig.js"
const Insert = async (value) => {
    try {
        let params = {
            Item: {
                Sid: { N: value.Sid },
                Department: { S: value.Department },
                Sname: { S: value.Sname },
                Sclass: { S: value.Sclass },
                Sgrade: { S: value.Sgrade }
            },
            TableName: 'StudentTable'
        }
        await dynamoDB.putItem(params).promise();
        return { status: true }
    }
    catch (err) {
        console.log(err);
        return { status: false, err: err }
    }
}
const Scan = async (value) => {
    try {
        if (!value) {
            let params = { TableName: 'StudentTable' }
            const data = await dynamoDB.scan(params).promise();
            console.log(data.Items)
            return data
        }
        else {
            let params = {
                ExpressionAttributeValues: {
                    ':Department': { S: value.Department },

                },
                FilterExpression: "Department=:Department",
                TableName: 'StudentTable',
            }
            const data = await dynamoDB.scan(params).promise();
            console.log(data.Items)
            return data
        }
    }
    catch (err) {
        console.log(err)
    }
}

const update = async (value) => {
    let params = {
        TableName: 'StudentTable',
        Key: {
            Sid: { N: value.Sid }
        },
        UpdateExpression: 'SET Department = :Department, Sname = :Sname,Sclass = :Sclass,Sgrade = :Sgrade',
        ExpressionAttributeValues: {
            ':Department': { S: value.Department },
            ':Sname': { S: value.Sname },
            ':Sclass': { S: value.Sclass },
            ':Sgrade': { S: value.Sgrade }
        },
        ReturnValues: 'ALL_NEW',
    }
    try {
        let data = await dynamoDB.updateItem(params).promise();
        return data.Attributes
    }
    catch (err) {
        console.log(err)
    }
}
const remove = async (value) => {
    let params = {
        TableName: 'StudentTable',
        Key: {
            Sid: { N: value.Sid }
        }
    }
    try {
        await dynamoDB.deleteItem(params).promise()
        return { status: true }
    }
    catch (err) {
        console.log(err)
    }
}
const query = async (value) => {
    console.log(value.keycolumn + ":" + value.keyvalue)
    let params = {
        TableName: "StudentTable",
        ExpressionAttributeValues: {
            ":columnvalue": { N: value.keyvalue }
        },
        KeyConditionExpression: `${value.keycolumn} =:columnvalue`
    }
    try {
        let data = await dynamoDB.query(params).promise();
        return data
    }
    catch (err) {
        console.log(err)
    }
}
const FetchMore = async (value) => {
    let batchkeys = value.Sid.map((i) => (
        { Sid: { N: i } }
    ));
    console.log(batchkeys)
    let params = {
        RequestItems: {
            "StudentTable": {
                Keys: batchkeys
            }
        }
    }
    try {
        let data = await dynamoDB.batchGetItem(params).promise();
        return data
    }
    catch (err) {
        throw err
    }
}
// let FetchAll = async () => {
//     try {
//         let data = await dynamoDB.scan({ TableName: "StudentTable" }).promise();
//         return data;
//     }
//     catch (err) {
//         throw err
//     }
// }
const CommonModel = {
    Insert, Scan, update, remove, query, FetchMore,
    // FetchAll
}

export default CommonModel