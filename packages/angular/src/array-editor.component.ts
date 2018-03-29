import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core'
import * as common from 'schema-based-json-editor'
import { Dragula, MarkdownIt, HLJS } from 'schema-based-json-editor/dist/libs'
import { arrayEditorTemplateHtml } from './variables'

@Component({
  selector: 'array-editor',
  template: arrayEditorTemplateHtml
})
export class ArrayEditorComponent {
  @Input()
  schema!: common.ArraySchema
  @Input()
  initialValue!: common.ValueType[]
  @Input()
  title?: string
  @Output()
  updateValue = new EventEmitter<common.ValidityValue<common.ValueType[] | undefined>>()
  @Input()
  theme!: common.Theme
  @Input()
  icon!: common.Icon
  @Input()
  locale!: common.Locale
  @Output()
  onDelete = new EventEmitter()
  @Input()
  readonly?: boolean
  @Input()
  required?: boolean
  @Input()
  hasDeleteButton!: boolean
  @Input()
  dragula?: Dragula
  @Input()
  md?: MarkdownIt
  @Input()
  hljs?: HLJS
  @Input()
  forceHttps?: boolean
  @Input()
  disableCollapse?: boolean

  collapsed?: boolean = false
  value?: common.ValueType[]
  errorMessage!: string
  buttonGroupStyleString = common.buttonGroupStyleString
  filter = ''

  @ViewChild('drakContainer')
    private drakContainer!: ElementRef

  private renderSwitch = 1
  private drak?: dragula.Drake
  private invalidIndexes: number[] = []

  private get getValue () {
    if (this.value !== undefined && !this.collapsed) {
      return this.value
    }
    return []
  }
  get filteredValues () {
    return this.getValue.map((p, i) => ({ p, i }))
            .filter(({ p, i }) => common.filterArray(p, i, this.schema.items, this.filter))
  }
  get showFilter () {
    return this.getValue.length >= common.minItemCountIfNeedFilter
  }
  ngOnInit () {
    this.collapsed = this.schema.collapsed
    this.value = common.getDefaultValue(this.required, this.schema, this.initialValue) as common.ValueType[]
    this.updateValue.emit({ value: this.value, isValid: !this.errorMessage && this.invalidIndexes.length === 0 })
  }
  get isReadOnly () {
    return this.readonly || this.schema.readonly
  }
  get hasDeleteButtonFunction () {
    return this.hasDeleteButton && !this.isReadOnly
  }
  get hasAddButton () {
    return !this.isReadOnly && this.value !== undefined
  }
  get titleToShow () {
    return common.getTitle(this.title, this.schema.title)
  }
  ngAfterViewInit () {
    if (this.drakContainer && this.dragula) {
      const container = this.drakContainer.nativeElement as HTMLElement
      this.drak = this.dragula([container])
      this.drak!.on('drop', (el: HTMLElement, target: HTMLElement, source: HTMLElement, sibling: HTMLElement | null) => {
        if (this.value) {
          common.switchItem(this.value, el, sibling)
          this.renderSwitch = -this.renderSwitch
          this.updateValue.emit({ value: this.value, isValid: !this.errorMessage && this.invalidIndexes.length === 0 })
        }
      })
    }
  }
  ngOnDestroy () {
    if (this.drak) {
      this.drak.destroy()
    }
  }
  trackByFunction = (index: number, item: { p: common.ValueType, i: number }) => {
    return (1 + item.i) * this.renderSwitch
  }
  collapseOrExpand = () => {
    this.collapsed = !this.collapsed
  }
  toggleOptional = () => {
    this.value = common.toggleOptional(this.value, this.schema, this.initialValue) as common.ValueType[] | undefined
    this.validate()
    this.updateValue.emit({ value: this.value, isValid: !this.errorMessage && this.invalidIndexes.length === 0 })
  }
  addItem () {
    this.value!.push(common.getDefaultValue(true, this.schema.items, undefined)!)
    this.updateValue.emit({ value: this.value, isValid: !this.errorMessage && this.invalidIndexes.length === 0 })
  }
  onDeleteFunction (i: number) {
    this.value!.splice(i, 1)
    this.renderSwitch = -this.renderSwitch
    this.validate()
    this.updateValue.emit({ value: this.value, isValid: !this.errorMessage && this.invalidIndexes.length === 0 })
  }
  onChange (i: number, { value, isValid }: common.ValidityValue<common.ValueType>) {
    this.value![i] = value
    this.validate()
    common.recordInvalidIndexesOfArray(this.invalidIndexes, isValid, i)
    this.updateValue.emit({ value: this.value, isValid: !this.errorMessage && this.invalidIndexes.length === 0 })
  }
  onFilterChange (e: { target: { value: string } }) {
    this.filter = e.target.value
  }
  private validate () {
    this.errorMessage = common.getErrorMessageOfArray(this.value, this.schema, this.locale)
  }
}
