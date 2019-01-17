const Event = require('../models/events.model');
const config = require('../../config/config');

exports.addEvent = (req, res) => {

  // We can use express-validator package or joi package for the input validation for more particular validation error messages. 
  // For now I am applying validations manually

  const eventName = req.body.eventName
  const location = req.body.location
  const description = req.body.description
  const eventType = req.body.eventType
  if (!eventName || !location || !description || !eventType ){
    return res.status(400).send("Bad request")
  }

  if (typeof(eventName) !== "string" || typeof(location) !== "string" || typeof(description) !== "string" || typeof(eventType) !== "string"){
    return res.status(400).send("Bad request: Please check your parameters")
  }

    const event = new Event({
        eventName: eventName,
        location: location, 
        description: description,
        eventType: eventType
    });

    event.save()
      .then(event => {
        res.status(200).send({ message:"Event added successfully",data : event });
      })
      .catch(err => {
        return res.status(500).send({message:"There was a problem adding the event." , description: err.message})
      })
}

exports.getAllEvents = (req, res) => {

    Event.find({})
    .then(data => {
        console.log({"data":data})
        if (!data || data === null){
            return res.status(404).send({message : "No data found" , data : null})
        }

        if (Array.isArray(data)){
            return res.status(200).send({message:"Data found" , data: data})
        }
    })
    .catch(err => {
        return res.status(500).send('Error on the server.');
    })
}

