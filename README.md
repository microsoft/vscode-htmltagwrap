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
Should we support `getSelections()` allowing multiple selections to be wrapped?