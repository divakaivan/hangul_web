var canvas, ctx, clearButton, saveImageButton, classifyButton;
var pos = {x:0, y:0};
var model;

function setPosition(e){
    pos.x = e.clientX - canvas.offsetLeft;
    pos.y = e.clientY - canvas.offsetTop;
}
    
function draw(e) {
    if(e.buttons !== 1) return;
    ctx.beginPath();
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.strokeStyle = 'black';
    ctx.moveTo(pos.x, pos.y);
    setPosition(e);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
}
    
function erase() {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function saveImage() {
    var dataURL = canvas.toDataURL('image/png');
    var image = new Image();
    image.src = dataURL;
    var shape = [canvas.width, canvas.height];
    fetch('/save_image', {
        method: 'POST',
        body: JSON.stringify({ image_data: dataURL, shape: shape }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.message);
    })
    .catch(error => {
        console.error('Error saving image:', error);
    });
}

async function classifyImage() {
    var inputTensor = preprocessImage();
    var shape = inputTensor.shape;
    fetch('/classify_image', {
        method: 'POST',
        body: JSON.stringify({ image_data: canvas.toDataURL('image/png'), shape: shape }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.message);
    })
    .catch(error => {
        console.error('Error classifying image:', error);
    });
}

function preprocessImage() {
    var dataURL = canvas.toDataURL('image/png');
    var image = new Image();
    image.src = dataURL;
    var tensor = tf.browser.fromPixels(image)
        .resizeNearestNeighbor([128, 128]) // Resize to match model's input shape
        .toFloat();
    // Ensure that the image has 3 color channels (RGB)
    if (tensor.shape[2] === 4) { // Check if image has alpha channel
        tensor = tensor.slice([0, 0, 0], [128, 128, 3]); // Remove alpha channel
    }
    tensor = tensor.expandDims(0); // Add batch dimension
    return tensor.div(255.0); // Normalize pixel values
}

async function loadModel() {
    model = await tf.loadLayersModel('static/hangul_model.json');
    // console.log('Model loaded successfully');
    console.log(model.summary())
}
    
function init() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext("2d");
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mousedown", setPosition);
    canvas.addEventListener("mouseenter", setPosition);
    
    clearButton = document.getElementById('cb');
    clearButton.addEventListener("click", erase);

    saveImageButton = document.getElementById('saveImageBtn');
    saveImageButton.addEventListener("click", saveImage);

    classifyButton = document.getElementById('classifyBtn');
    classifyButton.addEventListener("click", classifyImage);

    loadModel();
}

// Call the init function when the page is loaded
window.onload = function() {
    init();
};
