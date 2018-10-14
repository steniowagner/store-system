import React from 'react';

import { withFormik, Form } from 'formik';
import * as Yup from 'yup';

import {
  SectionTitleWrapper,
  SectionTitle,
  Section,
  Wrapper,
  RowItem,
  Row,
} from '../../components/common/FormUtils';

import ActionButton from '../../components/common/ActionButton';
import Input from '../../components/common/CustomInput';

type Props = {
  onChageFormToEditMode: Function,
  handleChange: Function,
  handleSubmit: Function,
  onRemoveUser: Function,
  handleBlur: Function,
  touched: Object,
  values: Object,
  errors: Object,
  user: Object,
  isSubmitting: boolean,
  mode: string,
};

const renderBarcodeAndNameRow = (mode: string, handleChange: Function, handleBlur: Function, touched: Object, errors: Object) => (
  <Row>
    <RowItem>
      <Input
        //error={touched.barCode && errors.barCode}
        disabled={mode === 'visualize'}
        //value={values.barCode}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="Informe o Código de Barras"
        label="Código de Barras"
        type="text"
        id="barCode"
      />
    </RowItem>
    <RowItem>
      <Input
        //error={touched.name && errors.name}
        disabled={mode === 'visualize'}
        //value={values.name}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="Informe o Nome do Produto"
        label="Nome"
        type="text"
        id="name"
      />
    </RowItem>
  </Row>
);

const renderPriceRow = (mode: string, handleChange: Function, handleBlur: Function, touched: Object, errors: Object): Object => (
  <Row>
    <RowItem>
      <Input
        //error={touched.barCode && errors.barCode}
        disabled={mode === 'visualize'}
        //value={values.barCode}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="Informe o Preço de Venda"
        label="Preço de Venda"
        type="number"
        id="salePrice"
      />
    </RowItem>
    <RowItem>
      <Input
        //error={touched.name && errors.name}
        disabled={mode === 'visualize'}
        //value={values.name}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="Informe o Preço de Custo"
        label="Preço de Custo"
        type="number"
        id="costPrice"
      />
    </RowItem>
  </Row>
);

const renderCategoryAndProductBrand = (mode: string, handleChange: Function, handleBlur: Function, touched: Object, errors: Object): Object => (
  <Row>
    <RowItem>
      <Input
        //error={touched.barCode && errors.barCode}
        disabled={mode === 'visualize'}
        //value={values.barCode}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="Informe o Preço de Venda"
        label="Preço de Venda"
        type="number"
        id="salePrice"
      />
    </RowItem>
    <RowItem>
      <Input
        //error={touched.name && errors.name}
        disabled={mode === 'visualize'}
        //value={values.name}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="Marca"
        label="Preço de Custo"
        type="number"
        id="costPrice"
      />
    </RowItem>
  </Row>
);

const ProductForm = ({
  onChageFormToEditMode,
  handleChange,
  onRemoveUser,
  handleSubmit,
  isSubmitting,
  handleBlur,
  touched,
  values,
  errors,
  user,
  mode,
}: Props): Object => (
  <Wrapper>
    <Form>
      <Section>
        <SectionTitleWrapper>
          <SectionTitle>
            Informações do Produto
          </SectionTitle>
        </SectionTitleWrapper>
        {renderBarcodeAndNameRow(mode, handleChange, handleBlur, touched, errors)}
        {renderPriceRow(mode, handleChange, handleBlur, touched, errors)}
        {/* renderCategoryAndProductBrand(mode, handleChange, handleBlur, touched, errors) */ }
      </Section>
      <Section>
        <SectionTitleWrapper>
          <SectionTitle>
            Estoque
          </SectionTitle>
        </SectionTitleWrapper>
        <RowItem>
          <Input
            //error={touched.barCode && errors.barCode}
            disabled={mode === 'visualize'}
            //value={values.barCode}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Quantidade em Estoque"
            label="Informe a Quantidade em Estoque"
            type="number"
            id="stockQuantity"
          />
        </RowItem>
      </Section>

      <ActionButton
        onChageFormToEditMode={onChageFormToEditMode}
        onRemoveUser={onRemoveUser}
        disabled={isSubmitting}
        onClick={handleSubmit}
        mode={'create'}
      />
    </Form>
  </Wrapper>
);

const CustomForm = withFormik({
  mapPropsToValues: ({ product }) => ({
    name: '',
    barCode: '',
  }),

  validationSchema: _props => Yup.lazy(() => Yup.object().shape({
    name: Yup.string()
      .required('O Nome é obrigatório.'),

    barCode: Yup.string()
      .required('O Código de Barras é obrigatório.'),
  })),

  handleSubmit(values, { setSubmitting, props }) {
    console.log(values)
    /* const { onCreateUser, onEditUser, mode } = props;

    const properCallback = (mode === 'edit' ? onEditUser : onCreateUser);
    properCallback({ name: values.name, username: values.username, password: values.password });

    setSubmitting(false); */
  },
})(ProductForm);

export default CustomForm;
