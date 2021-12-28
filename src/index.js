import * as monaco from 'monaco-editor/esm/vs/editor/editor.api.js';

const parseJson = (jsonStr) => {
  if (jsonStr) {
    try {
      return JSON.stringify(JSON.parse(jsonStr), null, 4);
    } catch (error) {
      return jsonStr;
    }
  }
};

window.onload = function () {
  const createEditorModel = (val) => monaco.editor.createModel(val, 'json');
  this.original = '';
  this.modified = '';

  const init = () => {
    this.diffEditor = monaco.editor.createDiffEditor(
      document.getElementById('container'),
      { readOnly: false, originalEditable: true, formatOnPaste: true },
    );
    this.diffEditor.setModel({
      original: createEditorModel(this.original),
      modified: createEditorModel(this.modified),
    });
    const navi = monaco.editor.createDiffNavigator(diffEditor, {
      followsCaret: true, // resets the navigator state when the user selects something in the editor
      ignoreCharChanges: true, // jump from line to line
    });

    window.setInterval(function () {
      navi.next();
    }, 2000);
  };

  init();

  const dataBtn = document.getElementById('dataBtn');
  const urlInput = document.getElementById('urlInput');
  const iframe = document.getElementById('currentif');
  const jsonTextarea = document.getElementById('jsonTextarea');
  const parseJsonBtn = document.getElementById('parseJson');
  const uploadInput = document.getElementById('j-upload-input');
  const checkUpload = document.getElementById('check');

  // 更新editor数据
  const updateEditorValue = (left, right) => {
    this.original = left || this.original;
    this.modified = right || this.modified;
    this.diffEditor.setModel({
      original: createEditorModel(left || this.original),
      modified: createEditorModel(right || this.modified),
    });
  };

  // 格式化json数据
  parseJsonBtn.onclick = function () {
    const jsonStringVal = jsonTextarea.value;
    const jsonFormatVal = parseJson(jsonStringVal);
    updateEditorValue(jsonFormatVal);
  };

  // 解析上传本地json文件
  checkUpload.onclick = function () {
    console.log(uploadInput.files[0], 'uploadInput');
    var reader = new FileReader(); //新建一个FileReader
    reader.readAsText(uploadInput.files[0], 'UTF-8'); //读取文件
    reader.onload = function (evt) {
      var fileString = evt.target.result;
      updateEditorValue(null, fileString);
    };
  };

  dataBtn.onclick = function () {
    const url = urlInput.value;
    iframe.src = url;
  };
};
