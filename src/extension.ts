// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

function getTabString(editor: vscode.TextEditor): string {
	let spacesUsed = <boolean>editor.options.insertSpaces;
	if (spacesUsed) {
		let numOfUsedSpaces = <number>editor.options.tabSize;
		return ' '.repeat(numOfUsedSpaces);
	}

	return '\t';
}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate() { 

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "copythis" is now active!'); 

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	vscode.commands.registerCommand('extension.htmlTagWrap', () => {
		// The code you place here will be executed every time your command is executed

		var editor = vscode.window.activeTextEditor;
		if (editor != undefined) {
			
			console.log('Window has been got');
			
			var selection = editor.selection;
			var selectedText = editor.document.getText(selection);
			
			var firstIndex = 1;
			var lastIndex = selectedText.length;
			
			console.log('selection is: ' + selectedText);
			console.log('length is: ' + lastIndex);
			console.log('selection.start.character: ' + selection.start.character);
			console.log('selection.end.character: ' + selection.end.character);
			
			var selectionStart = selection.start;
			var selectionEnd = selection.end;
			
			if (selectionEnd.line > selectionStart.line) {
				//Wrap it as a block
				var lineAbove = selectionStart.line - 1;
				var lineBelow = selectionEnd.line + 1;
				
				//console.log('tabSize = ' + tabSize);
				let tabSizeSpace = getTabString(editor);
				var selectionStart_spaces = editor.document.lineAt(selectionStart.line).text.substring(0, selectionStart.character);
				
				//console.log('tabsizeSpace =' + tabSizeSpace);
				
				editor.edit((editBuilder) => {
					
					//last line
					for (var i = selectionEnd.line; i >= selectionStart.line; i--) {
						var _lineNumber = i;
						
						if (_lineNumber === selectionEnd.line) {
							editBuilder.insert(new vscode.Position(_lineNumber, selectionEnd.character), '\n' + selectionStart_spaces + '</p>');
							editBuilder.insert(new vscode.Position(_lineNumber, 0), tabSizeSpace);
							console.log('End line done.  Line #: ' + _lineNumber);
						}
						else if (_lineNumber === selectionStart.line) {
							editBuilder.insert(new vscode.Position(_lineNumber, selectionStart.character), '<p>\n' + selectionStart_spaces + tabSizeSpace);
							console.log('Start Line done.  Line #: ' + _lineNumber);
							console.log('selectionStart_spaces = ' + selectionStart_spaces);
						}
						else {
							console.log('FOR Loop line #: ' + _lineNumber);
							editBuilder.insert(new vscode.Position(_lineNumber, 0), tabSizeSpace);
						}
						
					}
					
					//
					
					//
					
				/*
				*	.then() => {}  is called a lambda funciton.  It's in multiple programming language, new to ECMAScript6.
				*	It's like saying then(function(x));
				*
				*/					
				}).then(() => {
					console.log('Edit applied!');
					
					var bottomTagLine = lineBelow + 1;
					var firstTagSelectionSelection: vscode.Selection = new vscode.Selection(selectionStart.line, selectionStart.character + 1, selectionStart.line, selectionStart.character + 2);
					var lastTagSelectionSelection: vscode.Selection = new vscode.Selection(bottomTagLine, selectionStart.character + 2, bottomTagLine, selectionStart.character + 3);
					var tagSelections: vscode.Selection[] = [firstTagSelectionSelection, lastTagSelectionSelection];
					
					editor.selections = tagSelections;
				}, (err) => {
					console.log('Edit rejected!');
					console.error(err);
				});
				
							
			}
			
			
			else {
				//Wrap it inline
				editor.edit((editBuilder) => {
						editBuilder.insert(new vscode.Position(selectionEnd.line, selectionEnd.character), '</p>');
						editBuilder.insert(new vscode.Position(selectionEnd.line, selectionStart.character), '<p>');
					}).then(() => {
						console.log('Edit applied!');
						
						var firstTagSelectionSelection: vscode.Selection = new vscode.Selection(selectionStart.line, selectionStart.character + 1, selectionStart.line, selectionStart.character + 2);
						var lastTagSelectionSelection: vscode.Selection = new vscode.Selection(selectionEnd.line, selectionEnd.character + 3 + 2, selectionEnd.line, selectionEnd.character + 3 + 3);
						var tagSelections: vscode.Selection[] = [firstTagSelectionSelection, lastTagSelectionSelection];
						
						editor.selections = tagSelections;
					}, (err) => {
						console.log('Edit rejected!');
						console.error(err);
					});				
			}
			
				
		};
		
	});
}