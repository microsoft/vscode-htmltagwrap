// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode'; 

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

		var editor = vscode.window.getActiveTextEditor();
		if (editor != undefined) {
			console.log('Window has been got');
			
			var selection = editor.getSelection();
			var selectedText = editor.getTextDocument().getTextInRange(selection); //Am I doiong more than reading here?
			
			var firstIndex = 1;
			var lastIndex = selectedText.length;
			
			console.log('selection is: ' + selectedText);
			console.log('length is: ' + lastIndex);
			
			var selectionStart = selection.start;
			var selectionEnd = selection.end;
			
			var lineAbove = selectionStart.line - 1;
			var lineBelow = selectionEnd.line + 1;
			
			let tabSize = editor.getOptions().tabSize;


			//TODO:
			//if the selection is multiple lines, then we'll wrap tags on new lines above and below it
			//if the selection is an entire line and only one line, then we'll wrap tags on that line
			//if the selection is less than a full line, then we wrap tags inline
			
			/*
			To tab in everything a level when adding tags that are above and below the selection,
			do a FOR LOOP and add 5 spaces on each line at character 1 before doing the insertion of tags.
			*/
			
			
			
			//REFERENCE CODE ************************************
			editor.edit((editBuilder) => {
				var totalLines = selectionEnd.line - selectionStart.line;
				
				/*
				for (var i = 0; i < totalLines; i++) {
					var _lineNumber = selectionStart.line + i;
					console.log('FOR Loop: ' + _lineNumber);
					editBuilder.insert(new vscode.Position(_lineNumber, 1), 'TEST');
				}
				*/
				
				editBuilder.insert(new vscode.Position(selectionEnd.line, selectionEnd.character), '\n</p>');
				
				editBuilder.insert(new vscode.Position(selectionStart.line, selectionStart.character), '<p>\n');
				
					
			}).then(() => {
				console.log('Edit applied!');
				
				var bottomTagLine = lineBelow + 1;
				var firstTagSelectionSelection: vscode.Selection = new vscode.Selection(selectionStart.line, 2, selectionStart.line, 3);
				var lastTagSelectionSelection: vscode.Selection = new vscode.Selection(bottomTagLine, 3, bottomTagLine, 4);
				var tagSelections: vscode.Selection[] = [firstTagSelectionSelection, lastTagSelectionSelection];
				
				editor.setSelections(tagSelections)
			}, (err) => {
				console.log('Edit rejected!');
				console.error(err);
			});
			
			
		};
		
	});
}