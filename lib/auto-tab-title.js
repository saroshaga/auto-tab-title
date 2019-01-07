'use babel';

import { CompositeDisposable } from 'atom';

export default {

  subscriptions: null,

  untitledFileLabel: 'untitled',

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
      // Get the current tab title
      let tabTitle = editor.getTitle();
      // Extract the div element of the respective tab title
      let currentTabElement = document.getElementsByClassName('texteditor tab sortable')[tabIndex].childNodes[0];
      // Assign a temporary title only when file is not empty. Else, retain 'untitled'.
      if (!editor.isEmpty()) {
        if ((tabTitle === this.untitledFileLabel && currentTabElement.innerText === this.untitledFileLabel)
         || currentTabElement.getAttribute('data-name') === null) {
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
        currentTabElement.innerText = this.untitledFileLabel;
      }
      ++tabIndex;
    });
  }

};
