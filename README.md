# vscode-htmltagwrap
Wraps a chunk of HTML code in tags

#Instructions for Developing Extensions for VSCode
1.	Head over to the repo: https://github.com/microsoft/vscode-extensionbuilders 
2.	Add in your project details to the wiki: https://github.com/Microsoft/vscode-extensionbuilders/wiki/Projects 


#Objective of this Extension

##How it starts

- contributes.keybindings
- contributes.command

```
"contributes": {
    "keybindings": [{
        "command": "extension.htmlTagWrap",
        "key": "ctrl+shift+w",
        "mac": "cmd+shift+w",
        "when": "editorTextFocus"
    }]
}
```

#TODO:

- Make the `<p>` tag default inserted tags with multi-selection of the `p` part
- Once user hits spacebar, then the second multi-cursor is lost so the user can write attributes like classes or styles. (Idea courtesy of Ruben Rios)
- Once tags are wrapping the code, the code should be tabbed in a level for proper formatting.
- Does the hotkey work on Mac?

Should we support `getSelections()` allowing multiple selections to be wrapped?

#Automatic Symmetrical Wrapping
Down the road it would be nice to allow anything to intelligently wrap a chunk of code (e.g. if you type a tag `<p>` it will automatically type a `</p>` later; if you type a `<!--` then it will type a `-->`; if you type a `/*` then it will type `*/`; if you type `{('` then it will type `')}`).
We may accomplish this with `isOneLine(): boolean;`