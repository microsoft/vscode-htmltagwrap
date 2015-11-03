# vscode-htmltagwrap
Wraps your selection in HTML tags.  Can wrap an inline selection or a selection of multiple lines.


#how to use it

##Hotkey
Select a block of text or a string of text.  Press "Alt+W" or "Option+W" for Mac. 

##Report Issues
Please report an issue on GitHub if you have trouble.  We haven't tested this on Mac yet.

#Developer TODO List:

##Known Issues
-If you use "Shift+Tab" on a line within your selection and then try to wrap it, the autotabbing done while wrapping doesn't work as expected.

##Future features being explored

- Once user hits spacebar, then the second multi-cursor is lost so the user can write attributes like classes or styles. (Idea courtesy of Ruben Rios)
- Does the hotkey work on Mac?

Should we support `getSelections()` allowing multiple selections to be wrapped?

#Automatic Symmetrical Wrapping
Down the road it would be nice to allow anything to intelligently wrap a chunk of code (e.g. if you type a tag `<p>` it will automatically type a `</p>` later; if you type a `<!--` then it will type a `-->`; if you type a `/*` then it will type `*/`; if you type `{('` then it will type `')}`).
We may accomplish this with `isOneLine(): boolean;`

#Instructions for Developing Extensions for VSCode
1.	Head over to the repo: https://github.com/microsoft/vscode-extensionbuilders 
2.	Add in your project details to the wiki: https://github.com/Microsoft/vscode-extensionbuilders/wiki/Projects 