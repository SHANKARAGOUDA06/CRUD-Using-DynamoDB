import CommonServices from "../Services/CommonServices.js";

const Insert = async (req, res) => {
    let Request = req.body;

    let value = {
        Sid: Request.Sid,
        Department: Request.Department,
        Sname: Request.Sname,
        Sclass: Request.Sclass,
        Sgrade: Request.Sgrade
    }

    try {
        await CommonServices.Insert(value);
        res.send({ status: "success", message: 'inserted' })
    }
    catch (err) {
        console.log(err)
        res.send({ status: "Error", message: { 'Not-inserted': err } })
    }
}

const Fetch = async (req, res) => {
    let Request = req.body;
    let value = {
        keycolumn: Object.keys(Request)[0],
        keyvalue: Request[Object.keys(Request)[0]]
    }
    console.log(value)
    try {
        let data = await CommonServices.Fetch(value);
        res.send(data)
    }
    catch (err) {
        console.log(err)
    }
}
const Update = async (req, res) => {
    let Request = req.body
    let value = {
        Sid: Request.Sid,
        Department: Request.Department,
        Sname: Request.Sname,
        Sclass: Request.Sclass,
        Sgrade: Request.Sgrade
    }
    try {
        let data = await CommonServices.Update(value);
        res.send(data)
    }
    catch (err) {
        console.log(err)
    }
}
const remove = async (req, res) => {
    let Request = req.body
    let value = {
        Sid: Request.Sid
    }
    try {
        let status = await CommonServices.remove(value)
        if (status) {
            res.send({ status: "success", message: 'deleted' })
        }
        else {
            res.send({ status: "Invalid-Input", message: 'Not-deleted' })
        }
    }
    catch (err) {
        console.log(err)
    }
}
const FetchGsi = async (req, res) => {
    let Request = req.body
    let value = {
        Department: Request.Department
    }
    try {
        let data = await CommonServices.FetchGsi(value);
        res.send(data)
    }
    catch (err) {
        throw err
    }

}
const FetchMore = async (req, res) => {
    let Request = req.body;
    let value = {
        Sid: Request.Sid
    }
    console.log(value)
    try {
        let data = await CommonServices.FetchMore(value)
        res.send(data)
    }
    catch (err) {
        throw err
    }
}
const FetchAll = async (req, res) => {
    try {
        let data = await CommonServices.FetchAll();
        res.send(data)
    }
    catch (err) {
        throw err
    }
}
const controller = {
    Insert,
    Fetch,
    Update,
    remove,
    FetchGsi,
    FetchMore,
    FetchAll
}

export default controller