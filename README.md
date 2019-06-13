# Setting up the kiosk

- systemctl start pm2
- systemctl stop pm2
- systemctl restart pm2
- systemctl status pm2

As root initialize the pm2 configuration.

``` shell
$ pm2 start /path/to/pi-wall-project
$ pm2 save
```

# Automatically launch the browser in kiosk mode
~/.config/autostart/cal.desktop
```
[Desktop Entry]
Type=Application
Name=AutoChromium
Exec=chromium-browser --noerrdialogs --disable-session-crashed-bubble --disable-infobars --kiosk http://localhost:8080/
StartupNotify=false
```
