#!/usr/bin/env node

var amqp = require('amqplib/callback_api');

amqp.connect('amqp://user:bitnami@localhost', function(error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1;
        }

        var queue = 'hello';

        channel.assertQueue(queue, {
            durable: false
        });

        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

        channel.consume(queue, function(msg) {
            console.log(" [x] Received %s", msg.content.toString());
        }, {
            noAck: true // when true - receiver doesn't have any problems and is ready to receive. 
                            // when false - receiver has a problem and asks rabbit to store the message in its memory
        });
    });
});