import { Table, Button, Space } from 'antd';
import { useGetCategoriesQuery } from '../../redux/categorias';
import { useNavigate } from 'react-router-dom';

const CategoriasPage = () => {
  const { data, error, isLoading } = useGetCategoriesQuery({});
  const navigate = useNavigate();

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Nome',
      dataIndex: 'nome',
      key: 'nome',
    },
    {
      title: 'Ações',
      key: 'actions',
      render: (record: { id: number }) => (
        <Space size="middle">
          <Button type="default" onClick={() => navigate(`/categorias/${record.id}`)} >Editar</Button>
          <Button danger>Excluir</Button>
        </Space>
      ),
    },
  ];

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>Ocorreu um erro ao carregar as categorias</div>;
  }

  return (
    <div>
      <h2>Lista de Categorias</h2>
      <Table columns={columns} dataSource={data} rowKey="id" bordered={true}/>
    </div>
  );
};

export default CategoriasPage;
