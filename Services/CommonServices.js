import CommonModel from "../Model/CommonModel.js";

const Insert = async (value) => {
    try {
        await CommonModel.Insert(value);
    }
    catch (err) {
        console.log(err)
    }
}

const Fetch = async (value) => {
    try {
        let data = await CommonModel.query(value);
        console.log(data.Items)
        return data
    }
    catch (err) {
        console.log(err)
    }
}

const Update = async (value) => {
    try {
        let data = await CommonModel.update(value);
        return data
    }
    catch (err) {
        console.log(err)
    }
}
const remove = async (value) => {
    try {
        let data = await CommonModel.query(value);
        if (data.Items.length) {
            await CommonModel.remove(value);
            return true
        }
        else {
            return false
        }
    }
    catch (err) {
        console.log(err)
    }
}
const FetchGsi = async (value) => {
    try {
        let data = await CommonModel.Scan(value);
        return data
    }
    catch (err) {
        throw err
    }
}
const FetchMore = async (value) => {
    try {
        let data = await CommonModel.FetchMore(value);
        return data
    }
    catch (err) {
        throw err
    }
}
const FetchAll = async () => {
    try {
        let data = await CommonModel.Scan();
        return data
    }
    catch (err) {
        throw err
    }
}
const CommonServices = {
    Insert, Fetch, Update, remove, FetchGsi, FetchMore, FetchAll
}

export default CommonServices