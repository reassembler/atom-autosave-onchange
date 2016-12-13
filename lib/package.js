'use babel';

class Package {

    constructor() {
    }

    onDidChangeCursorPosition(editor, workspace) {

        if ( this._shouldSave(editor) && !this._autocompleteTriggered(workspace))
            this.trigger(editor);
    }

    onDidStopChanging( editor, workspace ) {

        if ( this._shouldSave(editor) && !this._autocompleteTriggered(workspace))
            this.trigger(editor);
    }

    onAutoCompleteClose( editor ) {

        if ( this._shouldSave(editor) )
            this.trigger(editor);
    }

    trigger(editor) {
        editor.save();
        this.notify(editor);
    }

    _shouldSave(editor) {
        return ( editor.isModified() && editor.getPath() ) ? true : false;
    }

    _autocompleteTriggered( workspace ) {
        return workspace.querySelector('.autocomplete-plus') ? true : false;
    }
    
    notify(editor) {
        message = "";
        file = editor.buffer.file;

        if (file && file.path) {
            message = file.path;
        }

        note1 = atom.notifications.addInfo("Autosaved " + message, {dismissable: true});

        setTimeout (function() {note1.dismiss()}, 3000);
    }    
}


export { Package };
