# duelyst-mod-loader
> A mod loader for Duelyst. WIP.

## Usage

1. Download [mod-loader-setup.bat](https://raw.githubusercontent.com/cowboy/duelyst-mod-loader/master/mod-loader-setup.bat).
 * (Right-click that link, then choose "Save link as...")
 * Save it into your `C:\Users\YOUR_USER_NAME\.counterplay\duelyst\` directory.
1. Double-click the downloaded file to run it.
 * If you see a "Windows protected your PC" dialog, click "More info" and then "Run anyway"...
 * BUT don't just run scripts you've downloaded from the internet! Look at the source code first. If you don't know what the script does, find someone who does, or don't run it. You've been warned!
1. If the setup script ran correctly, you should now see `mods` and `mod-loader` directories.
 * `mods\` is where you put your mods.
 * `mod-loader\` is where the mod loader files are stored. These files will be refreshed whenever `mod-loader-setup` is run.
 * Additionally, the Duelyst app index file should have been modified to run the mod-loader.
1. Start Duelyst.
 * Press `Ctrl-Shift-I` to open the inspector.
 * Scroll all the way up.
 * You should see a `Hey look, I'm a sample mod!` message. If so, the mod loader is working!
 * After adding new mods, you'll need to restart Duelyst.

## Notes

* Tested in Windows 10

## Contributing

File an issue! Create a PR! Ping me in the [Duelyst discord server](https://discordapp.com/invite/0WbpmyLbu52aphyb) (although I'm usually AFK).

## License

Copyright (c) 2017 "Cowboy" Ben Alman  
MIT License  
https://github.com/cowboy/duelyst-mod-loader
