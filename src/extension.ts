import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

// This method is called when your extension is activated
export function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "create-simple-vue" is now active!');

	let disposable = vscode.commands.registerCommand('create-simple-vue.runScript', async () => {
		try {
			const directoryName = await vscode.window.showInputBox({ prompt: 'Enter the directory name' });
			if (!directoryName) {
				vscode.window.showErrorMessage('No directory name provided.');
				return;
			}

			const fileName = await vscode.window.showInputBox({ prompt: 'Enter the file name (including extension, e.g., test.vue)' });
			if (!fileName) {
				vscode.window.showErrorMessage('No file name provided.');
				return;
			}

			const baseName = path.parse(fileName).name;
			const directoryPath = path.join(vscode.workspace.rootPath || '', directoryName);

			if (!fs.existsSync(directoryPath)) {
				fs.mkdirSync(directoryPath, { recursive: true });
				vscode.window.showInformationMessage(`Directory '${directoryName}' created.`);
			} else {
				vscode.window.showInformationMessage(`Directory '${directoryName}' already exists.`);
			}

			const vueTemplateContent = `<template src="./${baseName}.html"></template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    name: 'UserInformation',
    data() {
        return {
           //
        }
    },

    props: {
        restart: {
            type: Boolean
        }
    },

    watch: {
        restart() {
            if (!this.restart) {
                return;
            } else {
                this.clearAllData();
                this.$emit('alreadyReloadData')
            }
        }
    },

    created() {
        //
    },

    computed: {
    //
    },

    mounted() {
        // this.$nextTick(() => {
        //     (this.$refs.employeeNo as HTMLInputElement).focus();
        // });
    },

    methods: {

        //btn

        //click

        //onChange

        //method

        //scroll 

    }
})
</script>

<style lang="scss" scoped>

</style>
`;

			const htmlTemplateContent = `<h1>Hello, this is the page: ${baseName}</h1>`;

			const vueFilePath = path.join(directoryPath, `${baseName}.vue`);
			const htmlFilePath = path.join(directoryPath, `${baseName}.html`);

			fs.writeFileSync(vueFilePath, vueTemplateContent);
			fs.writeFileSync(htmlFilePath, htmlTemplateContent);

			vscode.window.showInformationMessage(`Files '${baseName}.vue' and '${baseName}.html' created in directory '${directoryName}' with the specified content.`);
		} catch (error: any) {
			vscode.window.showErrorMessage(`Error: ${error.message}`);
		}
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() { }
