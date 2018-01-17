const AWS = require('aws-sdk');
AWS.config.update({
  region: process.env.AWS_REGION
});

/*  Using the ports json object that automatically gets generated and attached to a function
    from Stackery's blueprint */
const ports = JSON.parse(process.env.STACKERY_PORTS);

module.exports = (obj) => {
  const sns = new AWS.SNS();
  const topicArn = ports[0][0].topicArn;

  const params = {
    Message: JSON.stringify(obj),
    TopicArn: topicArn
  };
  return sns.publish(params).promise();
};
