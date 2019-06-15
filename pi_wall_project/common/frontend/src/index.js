
/**
 * Setup the socket.io listeners for navigation
 */
export function pushNavigation() {
  const socket = new WebSocket('ws://localhost:3000/ws');

  // Listen for messages
  socket.addEventListener('message', function eventListener(event) {
    const data = event.data;

    switch (data) {
      case 'redirect-weather':
        window.location = '/';
        break;
      case 'redirect-bus':
        window.location = '/bus';
        break;
      case 'redirect-wifi':
        window.location = '/wifi';
        break;
      default:
        console.error(`unknown-route: ${data}`);
        break;
    }
  });
}
