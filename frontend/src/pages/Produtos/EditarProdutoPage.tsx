import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Form, Input, Button, Card, Space, Select, message } from 'antd';
import { useCreateProductMutation, useGetProductByIdQuery, useUpdateProductMutation } from '../../redux/produtos';
import { ProdutoDTO } from '../../dto/produtoDTO';
import { useGetCategoriesQuery } from '../../redux/categorias';
import '../../style.css';
import { RoutesPath } from '../../utils/constants';
import { CategoriaDTO } from '../../dto/categoriaDTO';

const EditarProdutoPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: product, refetch } = useGetProductByIdQuery(Number(id),{skip:!id});
  const { data: categories } = useGetCategoriesQuery({});
  const [updateProduct] = useUpdateProductMutation();
  const [createProduct] = useCreateProductMutation();
  const [form] = Form.useForm();
  const navigate = useNavigate();

  useEffect(() => {
    if(id) {
      refetch()
    }
  },[id, refetch])

  useEffect(() => {
    if (product) {
      form.setFieldsValue(product);
    }
  }, [product, form]);

  const handleFinish = async (values: ProdutoDTO) => {
    try {
      if(id) {
        const response = await updateProduct({ id: Number(id), ...values });
        if(response.error) {
          throw response.error;
        }
        message.success('Atualizado com sucesso!');
      } else {
        const response = await createProduct(values);
        if(response.error) {
          throw response.error;
        }
        message.success('Cadastrado com sucesso!');
      }
      navigate('/produtos');
    } catch (error) {
      message.error('Ocorreu um erro!');
      console.error(error);
    }
  };

  // if (isLoadingProduct) return <div>Carregando...</div>;

  return (
    <Card title="Editar Produto" style={{width:"100%"}}>
      <Form form={form}
        onFinish={handleFinish}
        layout='horizontal'
        labelCol={{span:4}}
        wrapperCol={{span:10}}
        >
        <Form.Item name="nome" label="Nome" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="preco" label="Preço" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="categoriaId" label="Categoria" rules={[{required: true}]}>
          <Select>
            {categories.map((category:CategoriaDTO) => (<Select.Option key={category.id} value={category.id}>{category.nome}</Select.Option>))}
          </Select>
        </Form.Item>
        <Form.Item style={{display:'flex', justifyContent:'end'}} >
          <Space size="middle">
            <Button type='default' onClick={() => navigate(RoutesPath.PRODUTOS)}>Voltar</Button>
            <Button type="primary" htmlType="submit">
              Salvar
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default EditarProdutoPage;
