# Automatically launch the browser in kiosk mode
~/.config/autostart/cal.desktop
```
[Desktop Entry]
Type=Application
Name=AutoChromium
Exec=chromium-browser --noerrdialogs --disable-session-crashed-bubble --disable-infobars --kiosk http://localhost:8080/
StartupNotify=false
```
