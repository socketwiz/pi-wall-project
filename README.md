# Automatically launch the browser in kiosk mode
~/.config/autostart/pi-wall-project.desktop
```
[Desktop Entry]
Type=Application
Name=AutoChromium
Exec=chromium-browser --noerrdialogs --disable-session-crashed-bubble --disable-infobars --kiosk http://pi/
StartupNotify=false
```
