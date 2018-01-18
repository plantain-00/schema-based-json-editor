import { Component, Input, Output, EventEmitter } from '@angular/core'
import * as common from 'schema-based-json-editor'
import { iconTemplateHtml } from './variables'

@Component({
  selector: 'icon',
  template: iconTemplateHtml
})
export class IconComponent {
  @Input()
    icon: common.Icon
  @Input()
    text: string
  @Output()
    onClick = new EventEmitter()
  @Input()
    theme: common.Theme
}
