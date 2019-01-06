'use babel';

import { CompositeDisposable } from 'atom';

export default {

  subscriptions: null,

  activate(state) {
    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'auto-tab-title:tilify': () => this.tilify()
    }));
  },

  deactivate() {
    this.subscriptions.dispose();
  },

  serialize() {
  },

  tilify() {
    var tabIndex = 0;
    atom.workspace.observeTextEditors(editor => {
      let tabTitle = editor.getTitle();
      console.log('Current title of tab is: '+ tabTitle);
      let currentTabElement = document.getElementsByClassName('texteditor tab sortable')[tabIndex];
      currentTabElement = currentTabElement.childNodes[0];
      if (tabTitle === 'untitled' && currentTabElement.innerText === 'untitled' && !editor.isEmpty()) {
        currentTabElement.innerText = editor.lineTextForScreenRow(0);
      }
      ++tabIndex;
    });
  }

};
