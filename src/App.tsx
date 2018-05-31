import * as React from 'react'
import { Layout, Menu } from 'antd'
const { Header, Sider, Content } = Layout
import { connect } from 'react-redux'
import Types from './components/Types'
import { addType, deleteType } from './store/modules/type.reducer'

interface IProps {
  types: string[]
  addType: (type: string) => void
  deleteType: (index: number) => void
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
            <Menu.Item key="2">类型管理</Menu.Item>
          </Menu>
        </Header>
        <Layout>
          <Sider width={200} style={{ background: '#fff' }}>
            <Types
              types={this.props.types}
              deleteType={this.props.deleteType}
              addType={this.props.addType}
            />
          </Sider>
          <Layout style={{ padding: '24px' }}>
            <Content
              style={{
                background: '#fff',
                padding: 24,
                margin: 0,
                minHeight: 280
              }}
            >
              12312
            </Content>
          </Layout>
        </Layout>
      </Layout>
    )
  }
}

const mapDispatchToProps = (dispatch: any) => ({
  addType: (type: string) => dispatch(addType(type)),
  deleteType: (index: number) => dispatch(deleteType(index))
})

const mapStateToProps = ({ type }: any) => ({
  types: type.types
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
