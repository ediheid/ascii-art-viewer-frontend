# ASCII Art Printer - Frontend

## Description

This is the **frontend** for the ASCII Art Printer app. It allows users to upload an ASCII art text file, set a printing interval (in milliseconds), and watch the ASCII art being printed line by line, with a progress bar to show completion.

- Min and max interval values to ensure the ASCII Art is printed correctly - (I found when the interval was too fast it would cut of the image).
- Basic error handling and time out handling (todo: update with vee-validate)
- Inline validation messages
- Disable `print` button when conditions are not met
- Double validation for file type, the input itself only accepts `.txt` files, but I added an extra layer of validation to the file uploader just in case

## Features

- Upload ASCII art text files.
- Set a custom interval for printing each line.
- Real-time progress updates via WebSocket.
- User-friendly interface built with Vue 3 Composition API.

---

## Prerequisites

- **Node.js** (node version specified in `.nvmrc` file)
- **npm** (comes with Node.js)

---

## Installation and Setup

1. Clone repository to a folder of your choice.
2. Navigate to the folder:
   ```bash
   cd ascii-art-viewer
   ```
3. Install dependencies: (check `.nvmrc` for node version)

   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open your browser and navigate to:
   ```bash
   http://localhost:5173
   ```

---

## Usage

1. Upload a text file containing ASCII art.
2. Enter the interval (in milliseconds) between lines.
3. Click the Print button to start printing the ASCII art line by line.
4. Watch the progress bar and percentage update in real-time.

---

## Backend

Ensure the backend server is running before using the frontend. For instructions, see the backend's README.

## Technologies Used

1. Vue 3 (Composition API)
2. TypeScript
3. Vite (for fast development)
4. Socket.IO (WebSocket for real-time communication)
5. Axios (HTTP requests)

---

## Example Input

Here's an example ASCII art file you can use to test the application:

Save this as `duck.txt` and upload it to the app!

```bash
       ,----,
___.`      `,
`===  D     :
  `'.      .'
     )    (                   ,
    /      \_________________/|
   /                          |
  |                           ;
  |               _____       /
  |      \       ______7    ,'
  |       \    ______7     /
   \       `-,____7      ,'   jgs
^~^~^~^`\                  /~^~^~^~^
~^~^~^ `----------------' ~^~^~^
~^~^~^~^~^^~^~^~^~^~^~^~^~^~^~^~


```
