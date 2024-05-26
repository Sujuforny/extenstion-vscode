"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = __importStar(require("vscode"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
// This method is called when your extension is activated
function activate(context) {
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
            }
            else {
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
        }
        catch (error) {
            vscode.window.showErrorMessage(`Error: ${error.message}`);
        }
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
// This method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map