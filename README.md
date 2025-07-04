# Classify Korean Alphabet Letters

The web app can be found [here](https://classify-hangul.vercel.app/)

<img width="463" alt="image" src="https://github.com/user-attachments/assets/af835ce1-698b-4e93-b907-5f518e478315" />

## Usage

You need to open the console to check when the model has been loaded

<img width="1511" alt="image" src="https://github.com/user-attachments/assets/192b7db9-7495-4278-b7db-7511adba3f7e" />

1. Draw letters in the top left box with your mouse 
2. Click classify (note: an output will appear only once the model has been loaded)

Output can be seen in the console but also in the app itself. The console also includes probabilities

<img width="1505" alt="image" src="https://github.com/user-attachments/assets/41133ebc-b168-4719-a128-e1c9156100db" />

## Project structure

```
hangul-classifier/
├── app.py                   # Flask backend server
├── index.html               # main web interface
├── script.js                # frontend js logic
├── hangul_model.json        # TensorFlow.js model architecture to be loaded using tfjs
├── group1-shard1of1.bin     # Pre-trained model weights
└── README.md   
```
