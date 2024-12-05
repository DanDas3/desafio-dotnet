import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Form, Input, Button, Table, Checkbox } from 'antd';
import { useGetProductByIdQuery, useUpdateProductMutation } from '../../redux/produtos';
import { ProdutoDTO } from '../../dto/produtoDTO';
import { useGetCategoriesQuery } from '../../redux/categorias';
import '../../style.css';

const EditarProdutoPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading: isLoadingProduct } = useGetProductByIdQuery(Number(id));
  const { data: categories } = useGetCategoriesQuery({});
  const [updateProduct] = useUpdateProductMutation();
  const [form] = Form.useForm();
  const [categoryIdState, setCategoryIdState] = useState<number>(0);
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
      title: 'Selecionar',
      key: 'select',
      render: (record: ProdutoDTO) => (
        <Checkbox
          checked={categoryIdState === record.id}
          onChange={(e) => handleCheckboxChange(record.id??0, e.target.checked)}
        />
      ),
    },
  ];

  const handleCheckboxChange = (categoriaId: number, checked: boolean) => {
    if(checked) {
      setCategoryIdState(categoriaId);
    }
  };

  useEffect(() => {
    if (product) {
      form.setFieldsValue(product);
    }
  }, [product, form]);

  const handleFinish = async (values: any) => {
    console.log(values);
    
    await updateProduct({ id: Number(id), categoriaId: categoryIdState, ...values });
    navigate('/produtos');
  };

  if (isLoadingProduct) return <div>Carregando...</div>;

  return (
    <div>
      <h2><Button className='botao-voltar'>{"<"}</Button>Editar Produto</h2>
      <Form form={form}
        onFinish={handleFinish}>
        <Form.Item name="nome" label="Nome" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Salvar
          </Button>
        </Form.Item>
      </Form>
      <h2>Categorias</h2>
        <Table
          columns={columns}
          dataSource={categories}
          rowKey="id"
          pagination={false}
        />
    </div>
  );
};

export default EditarProdutoPage;
