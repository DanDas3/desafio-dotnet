import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Form, Input, Button, Table, Card, Space, message } from 'antd';
import { useCreateCategoryMutation,  useGetCategoryByIdQuery,  useUpdateCategoryMutation } from '../../redux/categorias';
import { CategoriaDTO } from '../../dto/categoriaDTO';
import '../../style.css';

const EditarCategoriaPage = () => {
  const { id } = useParams<{ id: string }>();
  const {data:category,refetch} = useGetCategoryByIdQuery(Number(id),{skip:!id})
  const [updateCategory] = useUpdateCategoryMutation();
  const [createCategory] = useCreateCategoryMutation();
  const [form] = Form.useForm();
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
    },{
      title:'Preço',
      dataIndex:'preco',
      key:'preco'
    },
  ];

  useEffect(() => {
    if(id) {
      refetch()
    }
  },[id, refetch])

  useEffect(() => {
    if (category) {
      form.setFieldsValue(category);
    }
  }, [category, form]);

  const handleFinish = async (values: CategoriaDTO) => {
    try {
      if(id) {
        const response = await updateCategory({ id: Number(id), ...values });
        if(response.error) {
          throw response.error
        }
        message.success('Atualizado com sucesso!');
      } else {
        const response = await createCategory(values);
        if(response.error) {
          throw response.error;
        }
        message.success('Cadastrado com sucesso!');
      }
      navigate('/categorias');      
    } catch (error) {
      console.error(error)
    }
  };

  return (
    <Card title="Editar Categoria" style={{width:"100%"}}>
      <Form form={form} 
        onFinish={handleFinish}>
        <Form.Item name="nome" label="Nome" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item style={{display:'flex', justifyContent:'end'}}>
          <Space size="middle">
            <Button type='default' onClick={()=>navigate('/categorias')}>Voltar</Button>
            <Button type="primary" htmlType="submit">
              {id ? 'Atualizar' : 'Salvar'}
            </Button>
          </Space>
        </Form.Item>
      </Form>
      {category?.produtos && <h2>Produtos</h2>}
        {category?.produtos && <Table
          columns={columns}
          dataSource={category?.produtos}
          rowKey="id"
          pagination={false}
        />}
    </Card>
  );
};

export default EditarCategoriaPage;
