from channels.generic.websocket import WebsocketConsumer
try:
    from pyky040 import pyky040
except RuntimeError:
    print('pyky040 can only be run on the Raspberry pi')
import threading
import json


class CommonConsumer(WebsocketConsumer):
    def connect(self):
        self.accept()

        def ch_callback(scale_position):
            print('Hello world! The scale position is {}'.format(scale_position))
            self.send(text_data=json.dumps({
                'scale_position': scale_position
            }))

        def switch_callback():
            print('Button pushed: {} position: {}')
            self.send(text_data=json.dumps({
                'button_pressed': True
            }))

        try:
            # Init the encoder pins
            pi_encoder = pyky040.Encoder(CLK=17, DT=27, SW=22)

            # Setup the options and callbacks (see documentation)
            pi_encoder.setup(
                scale_min=0,
                scale_max=3,
                step=1,
                chg_callback=ch_callback,
                sw_callback=switch_callback
            )

            switch_thread = threading.Thread(target=pi_encoder.watch)
            switch_thread.start()
        except Exception as error:
            print('ERROR: {}'.format(error))

    def disconnect(self, close_code):
        self.send(text_data=json.dumps({
            'close_code': close_code
        }))

    def receive(self, text_data):
        self.send(text_data=json.dumps({
            'message': 'hello'
        }))
