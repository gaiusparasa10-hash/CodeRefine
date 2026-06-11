import Editor from "@monaco-editor/react";

export default function CodeEditor({
  code,
  setCode,
  language
}) {

  return (

    <Editor
      height="650px"
      theme="vs-dark"
      language={language}
      value={code}
      onChange={(value) =>
        setCode(value || "")
      }
      options={{
        fontSize: 16,
        minimap: {
          enabled: false
        },
        scrollBeyondLastLine: false,
        wordWrap: "on",
        automaticLayout: true
      }}
    />

  );
}