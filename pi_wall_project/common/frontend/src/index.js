
/**
 * Setup the socket.io listeners for navigation
 */

const socket = new WebSocket(`ws://${window.location.host}/ws/common/`);

socket.onmessage = (event) => {
  const data = event.data;
  console.log(`ws: ${data}`);
  switch (data) {
    case 'redirect-photos':
      window.location = '/';
      break;
    case 'redirect-weather':
      window.location = '/weather';
      break;
    case 'redirect-wifi':
      window.location = '/wifi';
      break;
    default:
      console.error(`unknown-route: ${data}`);
      break;
  }
};
socket.onclose = (event) => {
  console.log(event);
};
