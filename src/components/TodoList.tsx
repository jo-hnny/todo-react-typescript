import * as React from 'react'
import { ITodo } from '../store/modules/todo.reducer'
import { List, Checkbox, Affix, Button, Icon, Modal, Input } from 'antd'
import styled from 'styled-components'

export interface IProps {
  todoList: ITodo[]
  currentType: string
  delTodo: (index: number) => void
  addTodo: (todo: ITodo) => void
  changeTodoStatus: (index: number) => void
}

interface IState {
  showModal: boolean
  content: string
}

export default class TodoList extends React.Component<IProps, IState> {
  public readonly state: IState = {
    showModal: false,
    content: ''
  }

  private inputRef: React.RefObject<Input> = React.createRef()

  public handleOk = () => {
    this.props.addTodo({
      content: this.state.content,
      type: this.props.currentType,
      status: false
    })
    this.setState({
      showModal: false,
      content: ''
    })
  }

  public handleCancel = () => {
    this.setState({
      showModal: false,
      content: ''
    })
  }

  public modalShow = () => {
    this.setState({ showModal: true })
    setTimeout(() => {
      if (this.inputRef.current) {
        this.inputRef.current.input.focus()
      }
    }, 0)
  }

  public changeTodoContent = (e: any) => {
    this.setState({ content: e.target.value })
  }

  public render() {
    const TodoContent: any = styled.p`
      text-decoration: ${(props: any) => {
        return props.status ? 'line-through' : 'none'
      }};
    `
    const renderItem = ({ content, status }: ITodo, index: number) => (
      <List.Item
        key={index}
        actions={[
          <Checkbox
            key={index}
            checked={status}
            onChange={this.props.changeTodoStatus.bind(this, index)}
          />
        ]}
      >
        <TodoContent status={status}>{content}</TodoContent>
      </List.Item>
    )
    return [
      <List
        key="0"
        bordered={false}
        dataSource={this.props.todoList}
        renderItem={renderItem}
      />,
      <Affix key="1" style={{ position: 'absolute', right: 20, bottom: 20 }}>
        <Button
          type="primary"
          shape="circle"
          size="large"
          onClick={this.modalShow}
        >
          <Icon type="plus" />
        </Button>
      </Affix>,
      <Modal
        key="2"
        visible={this.state.showModal}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        closable={false}
        title="New Todo"
        maskClosable={false}
        cancelText="取消"
        okText="确定"
      >
        <Input
          ref={this.inputRef}
          type="text"
          placeholder="让我们做点什么"
          value={this.state.content}
          onChange={this.changeTodoContent}
        />
      </Modal>
    ]
  }
}
