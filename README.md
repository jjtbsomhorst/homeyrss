# Homey RSS Feed reader

This is a simple feed reader for Homey.

## Donate

If you like the app. Please consider a donation

[![paypal](https://www.paypal.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=Q67ZKATD9QVLY)

## Actions

Read RSS Titles:
Reads the complete list or the first x amount of items from the RSS Feed specified. You can now specify which data should be spoken. Choose from title, description or both!

Read a specific Item from RSS Feed:
Reads a specific item in a RSS Feed. The index is 0 based. So if you want to hear the first item you specify 0. 

## Changelog

1.0.3
* Fixed a bug that would cause the app to crash when using a https:// url instead of http://

1.0.2
* Fixed a bug that would cause the app to crash after a while
* Added a new feature. Now you can specificy which item it should speak.

1.0.1
* Fixed a bug that would cause the app to read the rss feed only once.

1.0.0
* Complete rewrite of this module. This leads to smaller file size, lower memory usage
and new features!

* Added possibility to specify how many items you want to hear. 

0.0.2 
* Removed Title argument for action. Title is now read from the feed itself.
* Changed action. You can now specify what homey will read for you. Title, Description or both

0.0.1
* Initial release
