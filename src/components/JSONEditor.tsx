/** @jsxImportSource theme-ui **/
import { Themed } from 'theme-ui'
import Editor, { Monaco, OnChange } from '@monaco-editor/react'

// https://github.com/brijeshb42/monaco-themes/tree/master/themes
import solarizedDark from '../theme/Solarized-dark.json'
import { MouseEventHandler } from 'react'

type GQLCodeBlockProps = {
  height?: string
  value: string
  onClick?: MouseEventHandler<HTMLDivElement>
  handleEditorChange?: OnChange
}

const JSONEditor = ({
  height = '150px',
  value,
  handleEditorChange,
  onClick,
}: GQLCodeBlockProps) => {
  const handleEditorWillMount = (monaco: Monaco) => {
    monaco.editor.defineTheme('solarizedDark', solarizedDark)
    monaco.editor.setTheme('solarizedDark')
  }
  return (
    <div className="GQLCodeBlock-wrap" onClick={onClick}>
      <Editor
        theme="solarizedDark"
        beforeMount={handleEditorWillMount}
        onChange={handleEditorChange}
        height={height}
        defaultLanguage="json"
        defaultValue={value}
      />
    </div>
  )
}

export default JSONEditor
