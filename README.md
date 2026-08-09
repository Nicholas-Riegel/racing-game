# Racing Game

A fast-paced car racing game built with TypeScript where you survive as long as possible by dodging enemy vehicles.

## Play Now

**Live Demo:** [https://nicholas-riegel.github.io/racing-game/](https://nicholas-riegel.github.io/racing-game/)

## Features

- **Survival Mode** — Stay alive by avoiding enemy cars
- **Real-time Timer** — Track how long you survive
- **High Score System** — Your best survival time is saved during your session
- **Smooth Animations** — Uses `requestAnimationFrame` for fluid car and road movement
- **Collision Detection** — Precise hit detection between player and enemy vehicles
- **Background Music** — Ambient audio during gameplay
- **Responsive Controls** — Keyboard controls for player movement

## How to Play

1. Click the **Play** button to start the game
2. Use **arrow keys** or **WASD** to move your red car left and right
3. Avoid the black enemy cars coming down the road
4. Survive as long as possible to build your high score
5. Click **Play** again to restart

## Technologies

- **TypeScript** — Type-safe game logic
- **HTML5** — Game structure and canvas
- **CSS3** — Animations and styling
- **Vanilla JavaScript** — No frameworks, pure DOM manipulation

## Project Structure

```
src/
├── Game.ts           — Main game manager
├── Race.ts           — Race/game session logic, timer, collision detection
├── app.ts            — Entry point
└── RaceElements/
    ├── Road.ts       — Road animation
    ├── PlayerCar.ts  — Player vehicle control
    └── EnemyCar.ts   — Enemy vehicle spawning and behavior

public/
└── [compiled JavaScript files]

style.css            — Game styling and animations
index.html           — Game page structure
```

## Building

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Compile TypeScript:**
   ```bash
   tsc
   ```

3. **Open in browser:**
   - Open `index.html` in your web browser, or
   - Serve via a local development server

## Development Notes

- The game uses `setInterval()` for collision detection and enemy spawning
- Road animations are created with CSS keyframe animations
- Car movements are calculated in real-time based on DOM positioning
- The high score persists for the current session (resets on page refresh)
