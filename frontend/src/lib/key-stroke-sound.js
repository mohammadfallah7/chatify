const keyStrokeSounds = [
  new Audio("/sounds/keystroke1.mp3"),
  new Audio("/sounds/keystroke2.mp3"),
  new Audio("/sounds/keystroke3.mp3"),
  new Audio("/sounds/keystroke4.mp3"),
];

export const playRandomKeyStrokeSound = () => {
  const randomKeyStrokeSound =
    keyStrokeSounds[Math.floor(Math.random() * keyStrokeSounds.length)];

  randomKeyStrokeSound.currentTime = 0;
  randomKeyStrokeSound
    .play()
    .catch((error) =>
      console.error("Error playing key stroke sound audio", error),
    );
};
