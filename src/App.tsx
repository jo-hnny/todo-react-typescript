import * as React from 'react'
import { Layout, Menu } from 'antd'
const { Header, Sider, Content } = Layout
import { connect } from 'react-redux'
import Types from './components/Types'
import TodoList from './components/TodoList'
import {
  addType,
  deleteType,
  changeCurrentType
} from './store/modules/type.reducer'
import {
  ITodo,
  delTodo,
  changeTodoStatus,
  addTodo
} from './store/modules/todo.reducer'

interface IProps {
  types: string[]
  todoList: ITodo[]
  currentType: string
  addType: (type: string) => void
  deleteType: (index: number) => void
  changeCurrentType: (type: string) => void
  delTodo: (index: number) => void
  addTodo: (todo: ITodo) => void
  changeTodoStatus: (payload: { index: number; type: string }) => void
}

class App extends React.Component<IProps, any> {
  public render() {
    return (
      <Layout style={{ width: '100%', height: '100%' }}>
        <Header>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['1']}
            style={{ lineHeight: '64px' }}
          >
            <Menu.Item key="1">我的TODO</Menu.Item>
          </Menu>
        </Header>
        <Layout>
          <Sider width={200} style={{ background: '#fff' }}>
            <Types
              types={this.props.types}
              deleteType={this.props.deleteType}
              addType={this.props.addType}
              changeCurrentType={this.props.changeCurrentType}
              currentType={this.props.currentType}
            />
          </Sider>
          <Layout style={{ padding: '24px' }}>
            <Content
              style={{
                background: '#fff',
                padding: 24,
                margin: 0,
                minHeight: 280,
                position: 'relative'
              }}
            >
              <TodoList
                todoList={this.props.todoList}
                delTodo={this.props.delTodo}
                addTodo={this.props.addTodo}
                changeTodoStatus={this.props.changeTodoStatus}
                currentType={this.props.currentType}
              />
            </Content>
          </Layout>
        </Layout>
      </Layout>
    )
  }
}

const mapDispatchToProps = (dispatch: any) => ({
  addType: (type: string) => dispatch(addType(type)),
  deleteType: (index: number) => dispatch(deleteType(index)),
  changeCurrentType: (type: string) => dispatch(changeCurrentType(type)),
  delTodo: (index: number) => dispatch(delTodo(index)),
  addTodo: (todo: ITodo) => dispatch(addTodo(todo)),
  changeTodoStatus: (payload: { type: string; index: number }) =>
    dispatch(changeTodoStatus(payload))
})

const mapStateToProps = ({ type, todo }: any) => ({
  types: type.types,
  currentType: type.currentType,
  todoList: todo.todoList.filter(
    (item: ITodo) => item.type === type.currentType
  )
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
