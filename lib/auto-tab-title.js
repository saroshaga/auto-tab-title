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
      let tabTitle = editor.getTitle();
      let currentTabElement = document.getElementsByClassName('texteditor tab sortable')[tabIndex].childNodes[0];
      if (!editor.isEmpty()) {
        if ((tabTitle === this.untitledFileLabel && currentTabElement.innerText === this.untitledFileLabel)
         || currentTabElement.getAttribute('data-name') === null) {
           currentTabElement.innerText = editor.lineTextForScreenRow(0);
        }
      }
      else {
        currentTabElement.innerText = this.untitledFileLabel;
      }
      ++tabIndex;
    });
  }

};
