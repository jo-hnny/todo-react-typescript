import * as React from 'react'
import { Menu, Button, Icon, Input } from 'antd'
import Styled from 'styled-components'

interface IProps {
  types: string[]
  addType: (type: string) => void
  deleteType: (index: number) => void
}

interface IState {
  showInput: boolean
}

export default class Types extends React.Component<IProps, IState> {
  public readonly state: IState = {
    showInput: false
  }

  private readonly inputRef: any = React.createRef()

  public showInput = () => {
    this.setState({ showInput: true })
    setTimeout(() => this.inputRef.current.input.focus(), 0)
  }

  public addType = (e: any) => {
    if (e.target.value) {
      this.props.addType(e.target.value)
    }
    this.setState({ showInput: false })
  }

  public render() {
    const TypeItem = Styled(Menu.Item)`
      display: flex;
      justify-content: space-between;
    `
    return (
      <div>
        <Menu
          mode="inline"
          defaultSelectedKeys={['0']}
          style={{ height: '100%', borderRight: 0 }}
        >
          {this.props.types.map((type, index) => (
            <TypeItem key={index}>
              {type}
              <Button
                type="primary"
                onClick={this.props.deleteType.bind(this, index)}
              >
                <Icon type="delete" />
              </Button>
            </TypeItem>
          ))}
        </Menu>
        <Input
          ref={this.inputRef}
          type="text"
          style={{
            margin: '10px auto',
            display: this.state.showInput ? 'block' : 'none'
          }}
          onBlur={this.addType}
        />
        <Button
          type="primary"
          style={{ width: '100%', margin: '0 auto' }}
          onClick={this.showInput}
        >
          <Icon type="plus" />
        </Button>
      </div>
    )
  }
}
