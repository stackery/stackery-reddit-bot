const AWS = require('aws-sdk');
AWS.config.update({
  region: process.env.AWS_REGION
});

module.exports = (obj) => {
  const sns = new AWS.SNS();
  const topicArn = `${process.env.TOPIC_NAME}`;

  const params = {
    Message: JSON.stringify(obj),
    TopicArn: topicArn
  };
  return sns.publish(params).promise();
};
