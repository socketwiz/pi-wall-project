# Setting up the kiosk

/etc/systemd/system/pm2.service
```
[Unit]
Description=PM2 process manager
Documentation=https://pm2.keymetrics.io/
After=network.target

[Service]
User=root
LimitNOFILE=infinity
LimitNPROC=infinity
LimitCORE=infinity
TimeoutStartSec=8
Environment=PATH=/usr/bin:/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin
Environment=PM2_HOME=/root/.pm2
Restart=always
RestartSec=8

ExecStart=/usr/local/share/.config/yarn/global/node_modules/pm2/bin/pm2 resurrect --no-daemon
ExecReload=/usr/local/share/.config/yarn/global/node_modules/pm2/bin/pm2 reload all
ExecStop=/usr/local/share/.config/yarn/global/node_modules/pm2/bin/pm2 kill

[Install]
WantedBy=multi-user.target
```
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
