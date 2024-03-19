import cron from 'node-cron';
import twilio from 'twilio';
import dotenv from 'dotenv';
import User from './models/user.model.js';
import Note from './models/note.model.js'; 

dotenv.config();

const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

const sendSMS = async (to, body) => {
    try {
        await twilioClient.messages.create({
            to,
            from: process.env.TWILIO_PHONE_NUMBER,
            body,
        });
        console.log(`SMS sent to ${to}`);
    } catch (error) {
        console.error(`Failed to send SMS: ${error.message}`);
    }
};

const fetchRandomNote = async (userId) => {
    try {
        const notes = await Note.find({ userId });
        if (notes.length > 0) {
            const randomNote = notes[Math.floor(Math.random() * notes.length)];
            return randomNote.note_text;
        }
        return null;
    } catch (error) {
        console.error(`Failed to fetch notes: ${error.message}`);
        return null;
    }
};

const dailySmsTask = cron.schedule('0 8 * * *', async () => {
    console.log('Running Daily SMS Task');
    const users = await User.find({ 
        'notificationSettings.receiveSMS': true,
        'notificationSettings.smsFrequency': 'daily'
    });

    for (const user of users) {
        const noteText = await fetchRandomNote(user._id);
        if (noteText && user.phoneNumber) {
            await sendSMS(user.phoneNumber, noteText);
        }
    }
}, {
    scheduled: false
});

const weeklySmsTask = cron.schedule('0 8 * * 1', async () => {
    console.log('Running Weekly SMS Task');
    const users = await User.find({
        'notificationSettings.receiveSMS': true,
        'notificationSettings.smsFrequency': 'weekly'
    });

    // Similar user iteration and message sending as in the daily task
}, {
    scheduled: false
});

const monthlySmsTask = cron.schedule('0 8 1 * *', async () => {
    console.log('Running Monthly SMS Task');
    const users = await User.find({
        'notificationSettings.receiveSMS': true,
        'notificationSettings.smsFrequency': 'monthly'
    });

    // Similar user iteration and message sending as in the daily task
}, {
    scheduled: false
});

dailySmsTask.start();
weeklySmsTask.start();
monthlySmsTask.start();
