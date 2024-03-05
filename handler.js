import express from 'express'
import bodyParser from 'body-parser';
import controller from './Controller/Controller.js';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => res.send("It's Working"));

app.post('/Insert', controller.Insert);
app.post('/Fetch', controller.Fetch);
app.post('/FetchMore', controller.FetchMore);
app.post('/FetchAll', controller.FetchAll);
app.post('/Update', controller.Update);
app.post('/delete', controller.remove);
app.post('/FetchWithGsi', controller.FetchGsi);

app.listen(3001, console.log('Running On 3001'))