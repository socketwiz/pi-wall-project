
/**
 * Setup the Web Socket listeners for navigation
 */

const socket = new WebSocket(`ws://${window.location.host}/ws/common/`);

socket.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log(`ws: ${data.scale_position}`);
  switch (data.scale_position) {
    case 0:
      window.location = '/';
      break;
    case 1:
      window.location = '/weather';
      break;
    case 2:
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
