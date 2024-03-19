import cron from 'node-cron'
import twilio from 'twilio'
import dotenv from 'dotenv'
import User from './models/user.model.js'
import Note from './models/note.model.js'

// Load environment variables; this is where our Twilio credentials are stored.
dotenv.config()

// Setting up the Twilio client with our account SID and auth token from .env file.
const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)

// Function to send an SMS. It takes the recipient's number and the message body as parameters.
const sendSMS = async (to, body) => {
    try {
        // Attempt to send a message using Twilio's API.
        await twilioClient.messages.create({
            to,
            from: process.env.TWILIO_PHONE_NUMBER,
            body
        })
        console.log(`SMS sent to ${to}`) // Log success for debugging.
    } catch (error) {
        console.error(`Failed to send SMS: ${error.message}`) // Catch and log any errors.
    }
}

// Fetches a random note from a user's collection of notes.
const fetchRandomNote = async (userId) => {
    try {
        const notes = await Note.find({ userId }) // Find all notes by the user.
        if (notes.length > 0) {
            // If there are notes, select one at random.
            const randomNote = notes[Math.floor(Math.random() * notes.length)]
            return randomNote.note_text // Return the text of the random note.
        }
        return null // If no notes are found, return null.
    } catch (error) {
        console.error(`Failed to fetch notes: ${error.message}`)
        return null // Return null if there's an error fetching notes.
    }
}

// Scheduled tasks for sending SMS notifications at different frequencies.
const dailySmsTask = cron.schedule('0 8 * * *', async () => {
    console.log('Running Daily SMS Task')
    const users = await User.find({
        'notificationSettings.receiveSMS': true,
        'notificationSettings.smsFrequency': 'daily'
    })

    // For each user who wants daily notifications, fetch a random note and send it if possible.
    for (const user of users) {
        const noteText = await fetchRandomNote(user._id)
        if (noteText && user.phoneNumber) {
            await sendSMS(user.phoneNumber, noteText)
        }
    }
}, {
    scheduled: false // Start the task manually.
})

const weeklySmsTask = cron.schedule('0 8 * * 1', async () => {
    console.log('Running Weekly SMS Task')
    // Fetch users for weekly notifications and send them a random note, similar to the daily task.
}, {
    scheduled: false
})

const monthlySmsTask = cron.schedule('0 8 1 * *', async () => {
    console.log('Running Monthly SMS Task')
    // Fetch users for monthly notifications and send them a random note, similar to the daily task.
}, {
    scheduled: false
})

// Starting each cron job.
dailySmsTask.start()
weeklySmsTask.start()
monthlySmsTask.start()
