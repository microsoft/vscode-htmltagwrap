//
// Note: This example test is leveraging the Mocha test framework.
// Please refer to their documentation on https://mochajs.org/ for help.
//

import {expect} from 'chai';
import {workspace, window, Selection, Position, commands, extensions, Uri, TextEditor, Range} from 'vscode';
import {copySync, CopyOptions, emptyDir} from 'fs-extra';
import * as extension from '../src/extension';

extension.activate();
let extensionID = 'bradgashler.htmltagwrap';
let samplesFolder = extensions.getExtension(extensionID).extensionPath + '/test/sampleFiles/';
let tempFolder = samplesFolder + 'temp/';

function parametrizedTest(startFilePath: string, expectedResultFilePath: string, selectionStart: Position, selectionEnd: Position, failMessage: string) {
	let result: string;
	let expectedResult: string;
	let editor: TextEditor;
	let workingFilePath = tempFolder + startFilePath;
	copySync(samplesFolder + startFilePath, workingFilePath, { clobber: true });

	let testPromise = workspace.openTextDocument(workingFilePath).then((workingDocument) => {
		return window.showTextDocument(workingDocument);
	}).then((_editor) => {
		editor = _editor;
	}).then(() => {
		editor.selection = new Selection(selectionStart, selectionEnd);
		return commands.executeCommand('extension.htmlTagWrap').then(() => new Promise((f) => setTimeout(f, 500)));
	}).then(() => {
		result = editor.document.getText();
	}).then(() => {
		return workspace.openTextDocument(samplesFolder + expectedResultFilePath);
	}).then((expectedResultDocument) => {
		expectedResult = expectedResultDocument.getText();
	}).then(() => {
		return commands.executeCommand('workbench.action.closeActiveEditor').then(() => new Promise((f) => setTimeout(f, 500)));
	});

	return testPromise.then(() => {
		expect(result).not.to.be.equal(undefined, 'File loding error');
		expect(expectedResult).not.to.be.equal(undefined, 'File loding error');
		expect(result).to.be.equal(expectedResult, failMessage);
	});
}


suite('Extension Tests', function () {
	test('HTML with tabs block wrap test', function () {
		return parametrizedTest('tabFile.html', 'expectedTabBlockWrapFileResult.html', new Position(1, 1), new Position(6, 6), 'Tab using block wrap does not work');
	});
	test('HTML with spaces block wrap test', function () {
		return parametrizedTest('spaceFile.html', 'expectedSpaceBlockWrapFileResult.html', new Position(1, 4), new Position(7, 9), 'Space using block wrap does not work');
	});
	test('HTML with tabs line wrap test', function () {
		return parametrizedTest('tabFile.html', 'expectedTabLineWrapFileResult.html', new Position(2, 2), new Position(2, 11), 'Tab using line wrap does not work');
	});
	test('HTML with spaces line wrap test', function () {
		return parametrizedTest('spaceFile.html', 'expectedSpaceLineWrapFileResult.html', new Position(2, 8), new Position(2, 17), 'Space using line wrap does not work');
	});
	teardown((done) => emptyDir(tempFolder, done));
});