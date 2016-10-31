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
	console.log('Congratulations, your extension "htmlTagWrap" is now active!'); 

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	vscode.commands.registerCommand('extension.htmlTagWrap', () => {
		// The code you place here will be executed every time your command is executed

		const editor = vscode.window.activeTextEditor;
		let tabSizeSpace = getTabString(editor);

		if(editor == null) {
			return;
		}
 
		editor.edit((editBuilder) => {

			const selections = editor.selections;
			
			for(const selection of selections) {

				const selectionStart = selection.start;
				const selectionEnd = selection.end;
				
				if(selectionEnd.line !== selectionStart.line) {
					// Wrap it as a block
					// TODO : This could be a bit better -- we should be finding the first non-whitespace character instead of taking
					// the beginning of the selection.
					var selectionStart_spaces = editor.document.lineAt(selectionStart.line).text.substring(0, selectionStart.character);
					//console.log('selectionStart_spaces = ' + selectionStart_spaces);
					//console.log('tabsizeSpace =' + tabSizeSpace);

					editBuilder.insert(new vscode.Position(selectionEnd.line, selectionEnd.character), '\n' + selectionStart_spaces + '</p>');
					editBuilder.insert(new vscode.Position(selectionEnd.line, 0), tabSizeSpace);

					console.log('End line done.  Line #: ' + selectionEnd.line);

					for (let lineNumber = selectionEnd.line - 1; lineNumber > selectionStart.line; lineNumber--) {
						console.log('FOR Loop line #: ' + lineNumber);
						editBuilder.insert(new vscode.Position(lineNumber, 0), tabSizeSpace);
					}

					// Modify first line of selection
					editBuilder.insert(new vscode.Position(selectionStart.line, selectionStart.character), '<p>\n' + selectionStart_spaces + tabSizeSpace);
					console.log('Start Line done.  Line #: ' + selectionStart.line);
				}
				else {
					//Wrap it inline
					editBuilder.insert(new vscode.Position(selectionEnd.line, selectionStart.character), '<p>');
					editBuilder.insert(new vscode.Position(selectionEnd.line, selectionEnd.character), '</p>');
				}
			}
		}).then(() => {
			console.log('Edit applied!');

			// Need to fetch selections again as they are no longer accurate (since the new tags were inserted)
			const selections = editor.selections;
			const toSelect: Array<vscode.Selection> = new Array<vscode.Selection>();

			for(let selection of selections) {
				
				// Careful : the selection starts at the beginning of the text but ends *after* the closing </p> tag
				if(selection.end.line !== selection.start.line) {
					// block
					let lineAbove = selection.start.line - 1;
					let lineBelow = selection.end.line;
					let startPosition = selection.start.character - tabSizeSpace.length + 1;
					let endPosition = selection.end.character - 2;

					toSelect.push(new vscode.Selection(lineAbove, startPosition, lineAbove, startPosition + 1));
					toSelect.push(new vscode.Selection(lineBelow, endPosition, lineBelow, endPosition + 1));
				}
				else {
					// same line, just get to the p by navigating backwards
					let startPosition = selection.start.character - 2;
					let endPosition = selection.end.character - 2;

					// When dealing with an empty selection, both the start and end position end up being *after* the closing </p> tag
					// backtrack to account for that
					if(selection.start.character === selection.end.character) {
						startPosition -= 4;
					}

					toSelect.push(new vscode.Selection(selection.start.line, startPosition, selection.start.line, startPosition + 1))
					toSelect.push(new vscode.Selection(selection.end.line, endPosition, selection.end.line, endPosition + 1))
				}

				editor.selections = toSelect;
			}

		}, (err) => {
			console.log('Edit rejected!');
			console.error(err);
		});
	});
}