/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'
import Editor from '@monaco-editor/react'
import { useRef } from 'react'

// https://github.com/brijeshb42/monaco-themes/tree/master/themes
import solarizedDark from '../theme/Solarized-dark.json'

type GQLCodeBlockProps = {
  title?: string
  readOnly?: boolean
  height?: string
  value: any
}

const GQLCodeBlock = ({ title, readOnly, height = '200px', value }: GQLCodeBlockProps) => {
  const handleEditorWillMount = (monaco) => {
    monaco.editor.defineTheme('solarizedDark', solarizedDark);
    monaco.editor.setTheme('solarizedDark');
  } 
  return (
    <div className="GQLCodeBlock-wrap">
      {title ? <Styled.h5 sx={{ m: 0, py: 2, bg: 'white' }}>{title}</Styled.h5> : null}
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
        height={height}
        defaultLanguage="graphql"
        defaultValue={value.toString()}
      />
    </div>
  )
}

export default GQLCodeBlock
