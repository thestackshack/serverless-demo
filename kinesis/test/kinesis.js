const AWS = require('aws-sdk');

var credentials = new AWS.SharedIniFileCredentials({profile: 'bluefin'});
AWS.config.credentials = credentials;

const kinesis = new AWS.Kinesis();

describe('kinesis', function() {
    it('put', function (done) {
        var params = {
            Data: 'TEST' /* Strings will be Base-64 encoded on your behalf */, /* required */
            PartitionKey: 'key1', /* required */
            // TODO use 'cim stack-show' to get your kinesis stream name.
            StreamName: 'cim-lambda-kinesis-KinesisStream-38AGJE2AA69Z', /* required */
        };
        kinesis.putRecord(params, function(err, data) {
            if (err) console.log(err, err.stack); // an error occurred
            else     console.log(data);           // successful response
            done();
        });
    });
});