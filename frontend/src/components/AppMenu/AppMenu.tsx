import { Layout, Menu, MenuProps, theme } from "antd";
import { useNavigate } from "react-router-dom";
import Sider from "antd/es/layout/Sider";
import { useContext } from "react";
import { UtilsContext } from "../../context/utilsContext";
import { AuthContext } from "../../context/authContext";
import { UserOutlined } from '@ant-design/icons';
import { PropsChildrenComponent } from "../../types/types";
type MenuItem = Required<MenuProps>['items'][number];


const AppMenu = ({ children }: PropsChildrenComponent) => {
  const { drawerStatus } = useContext(UtilsContext);
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const items: MenuItem[] = [
    { key: 'categorias', label: 'Categoria' },
    { type: 'divider' },
    { key: 'produtos', label: 'Produto' },
  ];
  const menuHorizontalItem: MenuItem[] = [
    {key: 'logout', icon:<UserOutlined />, label:'Sair', onClick: () => { logout() }}
  ]
  const onClick: MenuProps['onClick'] = (e) => {
    navigate(`/${e.key}`);
  };

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <>
      <Menu style={{justifyContent:"end"}} items={menuHorizontalItem} mode="horizontal"></Menu>
      {(drawerStatus && localStorage.getItem('authToken')) ? (
        <Layout>
          <Sider style={{ background: colorBgContainer }} width={255}>
            <Menu
              onClick={onClick}
              style={{ width: 256 }}
              defaultSelectedKeys={['category']}
              mode="inline"
              items={items}
            />
          </Sider>
          <Layout.Content>{children}</Layout.Content>
        </Layout>
      ) : (
        children
      )}
    </>
  );
};

export default AppMenu;