
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { MarkdownTipModule } from 'markdown-tip-angular'
import { Select2Module } from 'select2-angular-component'
import { FileUploaderModule } from 'file-uploader-angular-component'

/**
 * @public
 */
@NgModule({
  declarations: [
    JSONEditorComponent,
    BooleanEditorComponent,
    ArrayEditorComponent,
    EditorComponent,
    NullEditorComponent,
    NumberEditorComponent,
    ObjectEditorComponent,
    StringEditorComponent,
    AnyEditorComponent,
    IconComponent,
    OptionalComponent,
    DescriptionComponent
  ],
  imports: [
    CommonModule,
    MarkdownTipModule,
    Select2Module,
    FileUploaderModule
  ],
  exports: [
    JSONEditorComponent,
    BooleanEditorComponent,
    ArrayEditorComponent,
    EditorComponent,
    NullEditorComponent,
    NumberEditorComponent,
    ObjectEditorComponent,
    StringEditorComponent,
    AnyEditorComponent,
    IconComponent,
    OptionalComponent,
    DescriptionComponent
  ]
})
export class JSONEditorModule { }

import { JSONEditorComponent } from './index.component'
export * from './index.component'

import { BooleanEditorComponent } from './boolean-editor.component'
export { BooleanEditorComponent }

import { ArrayEditorComponent } from './array-editor.component'
export { ArrayEditorComponent }

import { EditorComponent } from './editor.component'
export { EditorComponent }

import { NullEditorComponent } from './null-editor.component'
export { NullEditorComponent }

import { NumberEditorComponent } from './number-editor.component'
export { NumberEditorComponent }

import { ObjectEditorComponent } from './object-editor.component'
export { ObjectEditorComponent }

import { StringEditorComponent } from './string-editor.component'
export { StringEditorComponent }

import { AnyEditorComponent } from './any-editor.component'
export { AnyEditorComponent }

import { IconComponent } from './icon.component'
export { IconComponent }

import { OptionalComponent } from './optional.component'
export { OptionalComponent }

import { DescriptionComponent } from './description.component'
export { DescriptionComponent }
