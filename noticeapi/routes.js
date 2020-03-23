const AWS = require('aws-sdk');
const express = require('express');
const moment = require('moment-timezone');

const IS_OFFLINE = process.env.NODE_ENV !== 'production';
// const PLANCHECK_TABLE = process.env.TABLE;
const NOTICE = IS_OFFLINE === true ? 'notice': process.env.NOTICE
const dynamoDb = IS_OFFLINE === true ?
    new AWS.DynamoDB.DocumentClient({
        region: 'us-east-2',
        endpoint: 'http://127.0.0.1:8000',
    }) :
    new AWS.DynamoDB.DocumentClient();



const router = express.Router();

router.get('/moment', (req,res) => {
  res.send(moment().format('MM-DD-YYYY'))
})
// get all records. uri: http://localhost:3000/api/records
router.get('/api/records', (req, res) => {
  const params = {
    TableName: NOTICE
  };
  dynamoDb.scan(params, (error, result) => {
      if (error) {
          res.status(400).json({ error: 'Error fetching the records' });
      }
      let toSend = result.Items.sort((a, b) => (b.dateReleased > a.dateReleased) ? 1 : -1)
      res.json(toSend);
  });
})

// get specific record. uri: http://localhost:3000/api/record?id=delo&timeStamp=2020-02-25T10:56:01+08:00
router.get('/api/record', (req, res) => {
  let noticeTitle = req.query.noticeTitle
  let dateReleased = req.query.dateReleased
  const params = {
    TableName: NOTICE,
    Key: {
      noticeTitle: noticeTitle,
      dateReleased: dateReleased
    }
  };
  dynamoDb.get(params, (error, result) => {
    if (error) {
        res.status(400).json({ error: 'Error fetching the record' });
    }
    res.json(result.Item);
  });
})

// add record
router.post('/api/record', (req, res) => {
  console.log(req.body)
  const params = {
    TableName: NOTICE,
    Item: req.body
  };
  console.log(params)
  dynamoDb.put(params, (error, result) => {
    if (error) {
        res.status(400).json({ error: 'Error fetching the record' });
    }
    res.json(result.Item);
  });
  // res.send('test backend')
})

// edit record
router.put('/api/record', (req, res) => {
  console.log(req.body)
  const params = {
    TableName: NOTICE,
    Key: {
      userId: req.body.userId,
      timeStamp: req.body.timeStamp
    },
    UpdateExpression: 'set #transactionStatus = :transactionStatus',
    ExpressionAttributeNames: { '#transactionStatus': 'transactionStatus' },
    ExpressionAttributeValues: { ':transactionStatus': req.body.transactionStatus }
  };
  console.log(params)
  dynamoDb.update(params, (error, result) => {
    if (error) {
        res.status(400).json({ error: 'Error fetching the record' });
    }
    res.json(result);
  });
})

//delete record
router.delete('/api/record', (req, res) => {
  console.log(req.body)
  const params = {
    TableName: NOTICE,
    Key: {
      noticeTitle: req.body.noticeTitle,
      dateReleased: req.body.dateReleased
    }
  };
  console.log(params)
  dynamoDb.delete(params, (error, result) => {
    if (error) {
        res.status(400).json({ error: 'Error fetching the record' });
    }
    res.json(result);
  });
})


module.exports = router;