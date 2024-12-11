import { Table, Button, Space, Card, message } from 'antd';
import { useDeleteProductByIdMutation, useGetProductsQuery } from '../../redux/produtos';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { formatIdRoute, RoutesPath } from '../../utils/constants';
import { CategoriaDTO } from '../../dto/categoriaDTO';
import { FileAddTwoTone } from '@ant-design/icons';
import ConfirmationModal from '../../components/Modal/ConfirmationModal';

const ProductsPage = () => {
  const { data, error, isLoading, refetch } = useGetProductsQuery({});
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [deleteProductById] = useDeleteProductByIdMutation();
  const [idDelete, setIdDelete] = useState<number>(0);
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
      render: (categoria: CategoriaDTO) => categoria?.nome,
    },
    {
      title: 'Ações',
      key: 'actions',
      render: (record: {id: number}) => (
        <Space size="middle" style={{width:70}}>
          <Button type="default" onClick={() => navigate(formatIdRoute(RoutesPath.EDITAR_PRODUTOS,record.id))}>Editar</Button>
          <Button danger onClick={() => {
            setOpenModal(true)
            setIdDelete(record.id);
          }}>Excluir</Button>
        </Space>
      ),
    },
  ];

  const deleteProcess = async (id: number) => {
    try {
      const response = await deleteProductById(id);
      if(response.error) {
        throw response.error;
      }
      message.success('Excluído com sucesso!');
      refetch();
    } catch (error) {
      message.error('Erro ao excluir!');
      console.error(error)
    }
    setOpenModal(false);
  }

  useEffect(() => {
    refetch();
  },[refetch])

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>Ocorreu um erro ao carregar os produtos</div>;
  }

  return (
    <>
      <ConfirmationModal 
      handleOk={()=>deleteProcess(idDelete)}
      title='Deseja excluir este produto?'
      open={openModal}
      setOpen={setOpenModal} />
      <Card title='Lista de Produtos' style={{width:"100%"}}>
        <div style={{display:'flex', justifyContent:'end', paddingBottom:5}}>
          <Button icon={<FileAddTwoTone />} onClick={() => navigate(RoutesPath.REGISTRAR_PRODUTOS) }>Novo</Button>
        </div>
        <Table columns={columns} dataSource={data} rowKey="id" pagination={{defaultCurrent:4,}} bordered={true}/>
      </Card>
    </>
  );
};

export default ProductsPage;
