// Create canvas element
const canvas = document.createElement('canvas');

// Optional: Set attributes like id, width, height
canvas.id = "gameArea";
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Append canvas to the document body or any other container
document.body.appendChild(canvas);

DEBUG_MODE = true;
console.log(EventBus)
const mySubscription = EventBus.subscribe("MY_EVENT", (event) => {
    console.log(`Received MyEvent with data: ${JSON.stringify(event)}`);
});
const myPublication = EventBus.publish("MY_EVENT", (event) => {
     console.log(`Received MyEvent with data: ${JSON.stringify(event)}`);
});