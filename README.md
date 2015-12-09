# vscode-htmltagwrap
##What is it
Wraps your selection in HTML tags.  Can wrap an inline selection or a selection of multiple lines.

![Wrap text in your images](images/screenshot.png)

##How to Use It
Select a block of text or a string of text.  Press <kbd>Alt</kbd> + <kbd>W</kbd> or <kbd>Option</kbd> + <kbd>W</kbd> for Mac.  Type the tag name you want, and it will populate the beginning and end tag automatically.

##Known Issues
It works only with code using tab formatting.  It won't currently play nice with spaces, if that's how you roll.  I would like to address this in the future.  Feel free to submit a pull request if you beat me to it.

##Report Issues
I welcome pull requests.  Please report an issue on GitHub if you have trouble.  We haven't tested this on Mac yet.

##Future features being explored
- Once a user hits spacebar, then the second multi-cursor is lost so the user can write attributes like classes or styles. (Idea courtesy of Ruben Rios)
- Does the hotkey work on Mac?
- Should we support `getSelections()` allowing multiple selections to be wrapped?