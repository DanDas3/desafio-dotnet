import { Table, Button, Space } from 'antd';
import { useGetProductsQuery } from '../../redux/produtos';
import { useNavigate } from 'react-router-dom';

const ProductsPage = () => {
  const { data, error, isLoading } = useGetProductsQuery({});
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
      title: 'Preço',
      dataIndex: 'preco',
      key: 'preco',
    },
    {
      title: 'Categoria',
      dataIndex: 'categoria',
      key: 'categoria',
      render: (category: { name: string }) => category?.name,
    },
    {
      title: 'Ações',
      key: 'actions',
      render: (record:any) => (
        <Space size="middle">
          <Button type="default" onClick={() => navigate(`/produtos/${record.id}`)}>Editar</Button>
          <Button danger>Excluir</Button>
        </Space>
      ),
    },
  ];

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>Ocorreu um erro ao carregar os produtos</div>;
  }

  return (
    <div>
      <h2>Lista de Produtos</h2>
      <Table columns={columns} dataSource={data} rowKey="id" />
    </div>
  );
};

export default ProductsPage;
