import { Editor } from '@monaco-editor/react';

interface MarkdownEditorProps {
  width: string;
  height: string;
  value: string;
  onChange: (value: string) => void;
}

const MarkdownEditor = ({ width, height, value, onChange }: MarkdownEditorProps) => {
  return (
    <Editor
      width={width}
      height={height}
      value={value}
      onChange={(value) => onChange(value || '')}
      language="markdown"
      theme="vs-dark"
    />
  );
};

export default MarkdownEditor;
