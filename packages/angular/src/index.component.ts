import { Component, Input, Output, EventEmitter } from '@angular/core'

import * as common from 'schema-based-json-editor'
export * from 'schema-based-json-editor'
import { indexTemplateHtml } from './variables'

/**
 * @public
 */
@Component({
  selector: 'json-editor',
  template: indexTemplateHtml
})
export class JSONEditorComponent {
  @Input()
  schema!: common.Schema
  @Input()
  initialValue!: common.ValueType
  @Output()
  updateValue = new EventEmitter<common.ValidityValue<common.ValueType | undefined>>()
  @Input()
  theme?: string
  @Input()
  icon?: string
  @Input()
  locale?: common.Locale
  @Input()
  readonly?: boolean
  @Input()
  dragula?: common.Dragula
  @Input()
  markdownit?: any
  @Input()
  hljs?: common.HLJS
  @Input()
  forceHttps?: boolean
  @Input()
  disableCollapse?: boolean
  @Input()
  noSelect2?: boolean
  @Input()
  minItemCountIfNeedFilter?: number
  @Input()
  monacoEditor?: common.MonacoEditor

  get themeObject() {
    return common.getTheme(this.theme)
  }
  get localeObject() {
    return common.getLocale(this.locale)
  }
  get iconObject() {
    return common.getIcon(this.icon, this.localeObject)
  }
  md?: any

  getReference = (name: string) => {
    if (this.schema.definitions) {
      return this.schema.definitions[name.substring('#/definitions/'.length)]
    }
    return undefined
  }

  ngOnInit() {
    this.md = common.initializeMarkdown(this.markdownit, this.hljs, this.forceHttps)
  }
}
