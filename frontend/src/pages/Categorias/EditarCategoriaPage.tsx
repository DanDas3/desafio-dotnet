import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Form, Input, Button, Table, Checkbox } from 'antd';
import { useGetCategoryByIdQuery, useUpdateCategoryMutation } from '../../redux/categorias';
import { useGetProductsQuery } from '../../redux/produtos';
import { CategoriaDTO } from '../../dto/categoriaDTO';
import '../../style.css';

const EditarCategoriaPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: category, isLoading: isLoadingCategory } = useGetCategoryByIdQuery(Number(id));
  const { data: products } = useGetProductsQuery({});
  const [updateCategory] = useUpdateCategoryMutation();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [formState, setFormState] = useState<CategoriaDTO>({
    id: Number(id),
    nome: '',
    produtos: [], 
  });

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
      title: 'Selecionar',
      key: 'select',
      render: (_: any, record: any) => (
        <Checkbox
          checked={formState.produtos.includes(record.id)}
          onChange={(e) => handleCheckboxChange(record.id, e.target.checked)}
        />
      ),
    },
  ];

  useEffect(() => {
    if (category) {
      form.setFieldsValue(category);
    }
  }, [category, form]);

  const handleFormChange = (changedValues: Partial<CategoriaDTO>) => {
    setFormState((prev) => ({ ...prev, ...changedValues }));
  };

  const handleCheckboxChange = (productId: number, checked: boolean) => {
    setFormState((prev) => {
      const produtos = checked
        ? [...prev.produtos, productId]
        : prev.produtos.filter((id) => id !== productId); 
      return { ...prev, produtos };
    });
  };

  const handleFinish = async (values: any) => {
    await updateCategory({ id: Number(id), ...values });
    navigate('/categorias');
  };

  if (isLoadingCategory) return <div>Carregando...</div>;

  return (
    <div>
      
      <h2><Button className='botao-voltar' onClick={() => {navigate('/categorias')}}>{"<"}</Button>Editar Categoria</h2>
      <Form form={form} 
        onFinish={handleFinish}
        onValuesChange={(changedValues) => handleFormChange(changedValues)}>
        <Form.Item name="nome" label="Nome" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Salvar
          </Button>
        </Form.Item>
      </Form>
      <h2>Produtos</h2>
        <Table
          columns={columns}
          dataSource={products}
          rowKey="id"
          pagination={false}
        />
    </div>
  );
};

export default EditarCategoriaPage;
