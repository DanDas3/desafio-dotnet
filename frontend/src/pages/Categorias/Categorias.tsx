import { Table, Button, Space, Card, message } from 'antd';
import { useDeleteCategoryByIdMutation, useGetCategoriesQuery } from '../../redux/categorias';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { formatIdRoute, RoutesPath } from '../../utils/constants';
import ConfirmationModal from '../../components/Modal/ConfirmationModal';
import { FileAddTwoTone } from '@ant-design/icons';
const CategoriasPage = () => {
  const { data, error, isLoading, refetch } = useGetCategoriesQuery({});
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [deleteCategoryById] = useDeleteCategoryByIdMutation();
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
      title: 'Ações',
      key: 'actions',
      render: (record: { id: number }) => (
        <Space size="middle" style={{width:10}}>
          <Button type="default" onClick={() => navigate(formatIdRoute(RoutesPath.EDITAR_CATEGORIAS,record.id))} >Editar</Button>
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
      const response = await deleteCategoryById(id);
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
  }, [refetch])

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>Ocorreu um erro ao carregar as categorias</div>;
  }

  return (
    <>
      <ConfirmationModal 
      handleOk={()=>deleteProcess(idDelete)}
      title='Deseja excluir esta categoria?'
      open={openModal}
      setOpen={setOpenModal} /> 
      <Card title={"Lista de Categorias"} style={{width:"100%"}}>
        <div style={{display:'flex', justifyContent:'end', paddingBottom:5}}>
          <Button icon={<FileAddTwoTone />} onClick={() => navigate(RoutesPath.REGISTRAR_CATEGORIAS) }>Novo</Button>
        </div>
        <Table columns={columns} dataSource={data} rowKey="id" bordered={true}/>
      </Card>
    </>
  );
};

export default CategoriasPage;
