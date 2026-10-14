const { spawn } = require('child_process');

// 1️⃣ Build the Vite app (if not already built). In production we assume the build already exists.
// 2️⃣ Serve the built assets using `vite preview` (or a simple static server like `serve`).
// 3️⃣ Launch the Discord bot.

function startPreview() {
  // `vite preview` serves the built `dist` folder on the given port.
  const preview = spawn('npx', ['vite', 'preview', '--port', process.env.PORT || '3000'], {
    stdio: 'inherit',
    env: { ...process.env, NODE_ENV: 'production' },
  });
  preview.on('close', (code) => {
    console.warn('Vite preview exited with code', code);
    process.exit(code);
  });
  return preview;
}

function startBot() {
  const bot = spawn('node', ['discord-bot/bot.js'], {
    stdio: 'inherit',
    env: { ...process.env, NODE_ENV: 'production' },
  });
  bot.on('close', (code) => {
    console.warn('Discord bot exited with code', code);
    process.exit(code);
  });
  return bot;
}

// Start both processes
const previewProc = startPreview();
const botProc = startBot();

// Graceful shutdown handling
function shutdown() {
  console.log('Shutting down...');
  previewProc.kill('SIGTERM');
  botProc.kill('SIGTERM');
  process.exit(0);
}
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
