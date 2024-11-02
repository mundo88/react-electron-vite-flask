import React, { useState } from 'react'
import {NodeHeader} from './Node'
import { Handle, Position } from 'reactflow';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-python';
import 'prismjs/themes/prism.css'; //Example style, you can use another


export default function PythonCodeEditor() {
    const [code, setCode] = useState(
        `def add(a, b) {\n  return a + b;\n}`
      );
  return (
    <>
        <Handle type="target" position={Position.Top} />
        <div className='rounded-md bg-white border gap-2 react-node overflow-hidden'>
            <NodeHeader title={'Python Code Editor'}/>
            <div className='p-4'>
                <Editor
                    value={code}
                    onValueChange={code => setCode(code)}
                    highlight={code => highlight(code, languages.python)}
                    padding={10}
                    style={{
                        fontFamily: '"Fira code", "Fira Mono", monospace',
                        fontSize: 12,
                    }}
                    className='nodrag text-sm border rounded-md !outline-none px-4 py-2'
                />
            </div>
        </div>
        <Handle type="source" position={Position.Bottom} />
    </>
  )
}
