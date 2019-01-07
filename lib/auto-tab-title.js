'use babel';

import { CompositeDisposable } from 'atom';

export default {

  subscriptions: null,

  activate(state) {
    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'auto-tab-title:titlify': () => this.titlify()
    }));
  },

  deactivate() {
    this.subscriptions.dispose();
  },

  serialize() {
  },

  titlify() {
    var tabIndex = 0;
    atom.workspace.observeTextEditors(editor => {
      // Extract the div element of the respective tab title
      let currentTabElement;
      if (document.getElementsByClassName('texteditor tab sortable')[tabIndex] !== undefined) {
        currentTabElement = document.getElementsByClassName('texteditor tab sortable')[tabIndex].childNodes[0];
      }
      // Assign a temporary title only when file is not empty. Else, retain 'untitled'.
      if (!editor.isEmpty()) {
        if (currentTabElement.getAttribute('data-name') !== editor.getTitle()) {
           let fileLineNumber = 0;
           let tempTitle = editor.lineTextForScreenRow(fileLineNumber);
           // This is to ensure that a blank line doesn't become the title
           while (tempTitle === '' && fileLineNumber <= editor.getLastScreenRow()) {
             tempTitle = editor.lineTextForScreenRow(++fileLineNumber);
           }
           currentTabElement.innerText = tempTitle;
        }
      }
      else {
        currentTabElement.innerText = 'untitled';
      }
      ++tabIndex;
    });
  }

};
