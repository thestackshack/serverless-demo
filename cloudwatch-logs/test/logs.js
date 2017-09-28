const AWS = require('aws-sdk');

var credentials = new AWS.SharedIniFileCredentials({profile: 'bluefin'});
AWS.config.credentials = credentials;

var cloudwatchlogs = new AWS.CloudWatchLogs();

// TODO use your LogGroup name from 'cim stack-show'.
const LOG_GROUP_NAME = 'cim-lambda-cloudwatch-logs-LogGroup-1V8ZQ698LC9UP';
var now = new Date();
const LOG_STREAM_NAME = 'test'+now.getTime();

describe('logs', function() {
    it('put', function (done) {
        var params = {
            logGroupName: LOG_GROUP_NAME, /* required */
            logStreamName: LOG_STREAM_NAME /* required */
        };
        cloudwatchlogs.createLogStream(params, function(err, data) {
            var params = {
                logEvents: [/* required */
                    {
                        message: 'ERROR: There was an error.', /* required */
                        timestamp: now.getTime() /* required */
                    },
                    /* more items */
                ],
                logGroupName: LOG_GROUP_NAME, /* required */
                logStreamName: LOG_STREAM_NAME /* required */
            };
            cloudwatchlogs.putLogEvents(params, function (err, data) {
                if (err) console.log(err, err.stack); // an error occurred
                else console.log(data);           // successful response
                done();
            });
        });
    });
});