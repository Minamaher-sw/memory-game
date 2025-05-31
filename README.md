# memory-game
MaharaTeck Typescript Final project ( Memory Game )

 Memory Game - TypeScript
A simple memory matching game built with TypeScript, HTML, and CSS. This project is part of the learnin https://maharatech.gov.eg/course/view.php?id=976.

🚀 Features
    Match pairs of cards by memory
    Score tracking
    Responsive design
    Written in TypeScript for better type safety
🛠️ Technologies Used
  TypeScript
  HTML5
  CSS
📁 Project Structure
memory-game/
│
├── src/
│   ├── models/
│   │   └── Card.ts
│   ├── components/
│   │   └── Game.ts
│   ├── index.ts
│   └── styles.css
│
├── assets/
│   └── images/
│
├── index.html
├── tsconfig.json
└── README.md

▶️ How to Run

Clone the repository:
  git clone https://github.com/yourusername/memory-game.git
  cd memory-game
Install dependencies (if using Parcel or npm scripts):
  Run the project:
    npm run start
    Open http://localhost:1234 in your browser.

📦 If you're not using a bundler, you can simply open index.html directly in the browser.

🧪 Example Code (TypeScript)
export class Card {
  constructor(public id: number, public imageUrl: string, public matched = false) {}
}

📌 Learning Objectives
Practice with TypeScript classes, interfaces, and types
Understand DOM manipulation using TS
Build a small interactive project





