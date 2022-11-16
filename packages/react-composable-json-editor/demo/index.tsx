import * as React from 'react'
import { createRoot } from 'react-dom/client'
import hljs from 'highlight.js'
import { useJsonEditorData, BooleanEditor, ObjectEditor, StringEditor, NumberEditor, ArrayEditor, EnumEditor, ObjectArrayEditor, DialogContainer, EnumArrayEditor } from '../dist/'

function Main() {
  const [readOnly, setReadOnly] = React.useState(false)
  const { value, update, getArrayProps } = useJsonEditorData({
    stringExample: 'a string example',
    booleanExample: false,
    numberExample: 123.4,
    objectExample: {
      propertyExample1: '',
      propertyExample2: 0,
    },
    inlineObjectExample: {
      propertyExample1: '',
      propertyExample2: 0,
    },
    arrayExample: ['item1', 'item2'],
    inlineArrayExample: ['item1', 'item2'],
    optionalExample: undefined as string | undefined,
    enumExample: 'enum 1' as 'enum 1' | 'enum 2',
    colorExample: '#000000',
    textareaExample: '',
    imagePreviewExample: 'http://image2.sina.com.cn/bj/art/2004-08-02/U91P52T4D51657F160DT20040802125523.jpg',
    itemTitleExample: [
      {
        propertyExample1: 'foo',
        propertyExample2: 1,
      },
      {
        propertyExample1: 'bar',
        propertyExample2: 2,
      },
    ],
    inlineObjectArrayExample: [
      {
        propertyExample1: 'foo',
        propertyExample2: 1,
        propertyExample3: {
          propertyExample4: 2,
          propertyExample5: '',
        },
      },
      {
        propertyExample1: 'bar',
        propertyExample2: 2,
        propertyExample3: {
          propertyExample4: 3,
          propertyExample5: '',
        },
      },
    ],
    enumTitlesExample: 'enum 1' as 'enum 1' | 'enum 2',
    enumArrayExample: ['foo'] as ('foo' | 'bar')[],
  })
  const valueHtml = hljs.highlight('json', JSON.stringify(value, null, '  ')).value
  return (
    <div style={{ position: 'relative' }}>
      <a href='https://github.com/plantain-00/schema-based-json-editor/tree/master/packages/react-composable-json-editor/demo/index.tsx' target='_blank'>the source code of the demo</a>
      <BooleanEditor style={{ display: 'inline' }} value={readOnly} setValue={v => setReadOnly(v)} /> read only
      <br />
      <div style={{ width: '49%', margin: '10px', position: 'absolute', left: '0px' }}>
        <ObjectEditor
          properties={{
            'A string example': <StringEditor value={value.stringExample} setValue={update((draft, v) => draft.stringExample = v)} />,
            'A boolean example': <BooleanEditor value={value.booleanExample} setValue={update((draft, v) => draft.booleanExample = v)} />,
            'A number example': <NumberEditor value={value.numberExample} setValue={update((draft, v) => draft.numberExample = v)} />,
            'A object example': <ObjectEditor
              properties={{
                'Property example 1': <StringEditor value={value.objectExample.propertyExample1} setValue={update((draft, v) => draft.objectExample.propertyExample1 = v)} />,
                'Property example 2': <NumberEditor value={value.objectExample.propertyExample2} setValue={update((draft, v) => draft.objectExample.propertyExample2 = v)} />,
              }}
            />,
            'A inline object example': <ObjectEditor
              inline
              properties={{
                'Property example 1': <StringEditor value={value.inlineObjectExample.propertyExample1} setValue={update((draft, v) => draft.inlineObjectExample.propertyExample1 = v)} />,
                'Property example 2': <NumberEditor value={value.inlineObjectExample.propertyExample2} setValue={update((draft, v) => draft.inlineObjectExample.propertyExample2 = v)} />,
              }}
            />,
            'A array example': <ArrayEditor
              {...getArrayProps(v => v.arrayExample, '')}
              items={value.arrayExample.map((f, i) => <StringEditor value={f} setValue={update((draft, v) => draft.arrayExample[i] = v)} />)}
            />,
            'A inline array example': <ArrayEditor
              inline
              {...getArrayProps(v => v.inlineArrayExample, '')}
              items={value.inlineArrayExample.map((f, i) => <StringEditor value={f} setValue={update((draft, v) => draft.inlineArrayExample[i] = v)} />)}
            />,
            'A optional example': [
              <BooleanEditor value={value.optionalExample !== undefined} setValue={update((draft, v) => draft.optionalExample = v ? '' : undefined)} />,
              value.optionalExample !== undefined ? <StringEditor value={value.optionalExample} setValue={update((draft, v) => draft.optionalExample = v)} /> : undefined,
            ],
            'A enum example': <EnumEditor value={value.enumExample} enums={['enum 1', 'enum 2'] as const} setValue={update((draft, v) => draft.enumExample = v)} />,
            'A enum example 2': <EnumEditor select value={value.enumExample} enums={['enum 1', 'enum 2'] as const} setValue={update((draft, v) => draft.enumExample = v)} />,
            'A color example': <StringEditor type='color' value={value.colorExample} setValue={update((draft, v) => draft.colorExample = v)} />,
            'A textarea example': <StringEditor textarea value={value.textareaExample} setValue={update((draft, v) => draft.textareaExample = v)} />,
            'A image preview example': <StringEditor value={value.imagePreviewExample} setValue={update((draft, v) => draft.imagePreviewExample = v)} />,
            'A item title example': <ArrayEditor
              {...getArrayProps(v => v.itemTitleExample, { propertyExample1: '', propertyExample2: 0 })}
              title={(i) => value.itemTitleExample[i].propertyExample1}
              items={value.itemTitleExample.map((f, i) => <ObjectEditor
                properties={{
                  'Property example 1': <StringEditor value={f.propertyExample1} setValue={update((draft, v) => draft.itemTitleExample[i].propertyExample1 = v)} />,
                  'Property example 2': <NumberEditor value={f.propertyExample2} setValue={update((draft, v) => draft.itemTitleExample[i].propertyExample2 = v)} />,
                }}
              />)}
            />,
            'A inline object array example': <ObjectArrayEditor
              {...getArrayProps(v => v.inlineObjectArrayExample, { propertyExample1: '', propertyExample2: 0, propertyExample3: { propertyExample4: 0, propertyExample5: '' } })}
              properties={value.inlineObjectArrayExample.map((f, i) => ({
                'Property example 1': <StringEditor value={f.propertyExample1} setValue={update((draft, v) => draft.inlineObjectArrayExample[i].propertyExample1 = v)} />,
                'Property example 2': <NumberEditor value={f.propertyExample2} setValue={update((draft, v) => draft.inlineObjectArrayExample[i].propertyExample2 = v)} />,
                'Property example 3': <DialogContainer><ObjectEditor
                  inline
                  properties={{
                    'Property example 3': <NumberEditor value={f.propertyExample3.propertyExample4} setValue={update((draft, v) => draft.inlineObjectArrayExample[i].propertyExample3.propertyExample4 = v)} />,
                    'Property example 4': <StringEditor value={f.propertyExample3.propertyExample5} setValue={update((draft, v) => draft.inlineObjectArrayExample[i].propertyExample3.propertyExample5 = v)} />,
                  }}
                /></DialogContainer>,
              }))}
            />,
            'A enum titles example': <EnumEditor enumTitles={['enum title 1', 'enum title 2']} value={value.enumTitlesExample} enums={['enum 1', 'enum 2'] as const} setValue={update((draft, v) => draft.enumTitlesExample = v)} />,
            'A enum array example': <EnumArrayEditor enumTitles={['foo title', 'bar title']} value={value.enumArrayExample} enums={['foo', 'bar'] as const} setValue={update((draft, v) => draft.enumArrayExample = v)} />,
          }}
          readOnly={readOnly}
        />
      </div>
      <div style={{ margin: '10px', width: '49%', position: 'fixed', right: '10px', height: '100%', overflowY: 'scroll' }}>
        Value:
        <pre style={{ borderColor: 'black', padding: '10px' }}><code dangerouslySetInnerHTML={{ __html: valueHtml }}></code></pre>
      </div>
    </div>
  )
}

const container = document.querySelector('#container')
if (container) {
  createRoot(container).render(<Main />)
}
