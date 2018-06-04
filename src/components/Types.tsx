import * as React from 'react'
import { Menu, Button, Icon, Input } from 'antd'
import Styled from 'styled-components'

interface IProps {
  types: string[]
  currentType: string
  addType: (type: string) => void
  deleteType: (index: number) => void
  changeCurrentType: (type: string) => void
}

interface IState {
  showInput: boolean
}

export default class Types extends React.Component<IProps, IState> {
  public readonly state: IState = {
    showInput: false
  }

  private readonly inputRef: React.RefObject<Input> = React.createRef()

  public showInput = () => {
    this.setState({ showInput: true })
    setTimeout(
      () => this.inputRef.current && this.inputRef.current.input.focus(),
      0
    )
  }

  public addType = (e: any) => {
    if (e.target.value) {
      this.props.addType(e.target.value)
      this.props.changeCurrentType(e.target.value)
    }
    e.target.value = ''
    this.setState({ showInput: false })
  }

  public changeCurrentType = ({ key }: any) => {
    this.props.changeCurrentType(key)
  }

  public render() {
    const TypeItem = Styled(Menu.Item)`
      display: flex;
      justify-content: space-between;
      align-items: center;
    `
    return (
      <div>
        <Menu
          mode="inline"
          selectedKeys={[this.props.currentType]}
          style={{ height: '100%', borderRight: 0 }}
          onSelect={this.changeCurrentType}
        >
          {this.props.types.map((type, index) => (
            <TypeItem key={type}>
              {type}
              <Button
                type="primary"
                onClick={this.props.deleteType.bind(this, index)}
              >
                <Icon type="delete" style={{ margin: 0 }} />
              </Button>
            </TypeItem>
          ))}
        </Menu>
        <Input
          ref={this.inputRef}
          type="text"
          style={{
            margin: '10px auto',
            width: '95%',
            display: this.state.showInput ? 'block' : 'none'
          }}
          onPressEnter={this.addType}
          onBlur={this.addType}
        />
        <Button
          type="primary"
          style={{ display: 'block', width: '95%', margin: '0 auto' }}
          onClick={this.showInput}
        >
          <Icon type="plus" />
        </Button>
      </div>
    )
  }
}
