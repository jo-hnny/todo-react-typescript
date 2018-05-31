import * as React from 'react'

interface IProps {
  types: string[]
}

export default class TodoEditor extends React.Component<IProps, any> {
  public render() {
    return (
      <form>
        <div>
          <label htmlFor="">类型</label>
          <select name="" id="">
            {this.props.types.map(type => <option key={type}>{type}</option>)}
          </select>
        </div>
      </form>
    )
  }
}
