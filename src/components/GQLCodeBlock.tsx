/** @jsxImportSource theme-ui **/
import { Themed } from 'theme-ui'
import Editor, { Monaco, OnChange } from '@monaco-editor/react'

// https://github.com/brijeshb42/monaco-themes/tree/master/themes
import solarizedDark from '../theme/Solarized-dark.json'
import { MouseEventHandler } from 'react'

type GQLCodeBlockProps = {
  title?: string
  readOnly?: boolean
  height?: string
  value: string | string[]
  onClick?: MouseEventHandler<HTMLDivElement>
  handleEditorChange?: OnChange
}

const GQLCodeBlock = ({ title, readOnly, height = '200px', value, handleEditorChange, onClick }: GQLCodeBlockProps) => {
  const handleEditorWillMount = (monaco: Monaco) => {
    monaco.editor.defineTheme('solarizedDark', solarizedDark);
    monaco.editor.setTheme('solarizedDark');
  } 
  return (
    <div className="GQLCodeBlock-wrap" onClick={onClick}>
      {title ? <Themed.h5 sx={{ m: 0, py: 2, px: '.75rem', bg: 'white' }}>{title}</Themed.h5> : null}
      <Editor
        theme="solarizedDark"
        options={{
          minimap: {
            enabled: false,
          },
          scrollBeyondLastLine: false,
          readOnly: readOnly
        }}
        beforeMount={handleEditorWillMount}
        onChange={handleEditorChange}
        height={height}
        defaultLanguage="graphql"
        defaultValue={value.toString()}
      />
    </div>
  )
}

export default GQLCodeBlock
