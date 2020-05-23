import * as React from 'react'
import * as common from 'schema-based-json-editor'

export class Description extends React.Component<{
  theme: common.Theme;
  message?: string;
}, unknown> {
  render() {
    if (this.props.message) {
      return <p className={this.props.theme.description}>{this.props.message}</p>
    }
    return null
  }
}
