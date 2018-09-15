import * as React from 'react'
import * as common from 'schema-based-json-editor'

export class Optional extends React.Component<{
  required?: boolean;
  value?: common.ValueType;
  isReadOnly?: boolean;
  theme: common.Theme;
  locale: common.Locale;
  toggleOptional: () => void;
}, {}> {
  render() {
    if (!this.props.required && (this.props.value === undefined || !this.props.isReadOnly)) {
      return (
        <div className={this.props.theme.checkbox}>
          <label>
            <input type='checkbox'
              onChange={this.props.toggleOptional}
              checked={this.props.value === undefined}
              disabled={this.props.isReadOnly} />
            {this.props.locale.info.notExists}
          </label>
        </div>
      )
    }
    return null
  }
}
