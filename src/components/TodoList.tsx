import * as React from 'react'

export interface ITodo {
  type: string
  content: string
}

export interface IProps {
  todos: ITodo[]
}

export default class TodoList extends React.Component<IProps, any> {
  public render() {
    return (
      <div>
        {this.props.todos.map(({ content }) => <p key={content}>{content}</p>)}
      </div>
    )
  }
}
