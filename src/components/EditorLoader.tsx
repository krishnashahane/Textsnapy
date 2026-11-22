'use client'

import dynamic from 'next/dynamic'

// The editor (canvas engine, controls) is client-only and code-split out of the page bundle.
const Editor = dynamic(() => import('@/editor/Editor'), {
  ssr: false,
  loading: () => (
    <div className="editor editor--loading" aria-busy="true" aria-label="Loading editor">
      <div className="editor__preview">
        <div className="skeleton skeleton--stage" />
      </div>
      <div className="editor__panel">
        <div className="skeleton" style={{ height: 180 }} />
        <div className="skeleton" style={{ height: 120 }} />
        <div className="skeleton" style={{ height: 260 }} />
      </div>
    </div>
  ),
})

export default function EditorLoader(props: { initialTemplate?: string; headingLevel?: 2 | 3 }) {
  return (
    <div id="editor" className="editor-wrap">
      <Editor {...props} />
    </div>
  )
}
