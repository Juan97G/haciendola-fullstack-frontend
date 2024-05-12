import React, {useEffect, useState} from 'react';
import "./styles.css";
import Layout from "../../components/Layout";
import {useAuthStore} from "../../store/AuthStore";
import {useNavigate} from "react-router-dom";
import {Button, Pagination, Table, TableHeaderCell} from "semantic-ui-react";
import {deleteProductById, getAllProducts} from "../../services/productsService";
import Loading from "../../components/Loading";
import {toast} from "react-toastify";
import ModalProduct from "../../components/ModalProduct";
import {useFormProductStore} from "../../store/FormProductStore";

const Products = () => {

  /* STATES */
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(15);

  /* STORE */
  const { auth } = useAuthStore();
  const { open, openModalCreate, openModalEdit } = useFormProductStore();

  /* HOOKS */
  const navigate = useNavigate();

  useEffect( () => {
    (async () => {
      setIsLoading(true);

      const allProducts = await getAllProducts();

      if (allProducts) setProducts(allProducts);
      else setProducts([]);

      setIsLoading(false);
    })();
  }, [open]);

  /* FUNCTIONS */
  const deleteProduct = async (idProduct) => {
    setIsLoading(true);

    const response = await deleteProductById(idProduct);

    if (response) {
      const filterProducts = products.filter((prod) => prod.id !== idProduct);
      setProducts(filterProducts);

      toast.success("Producto eliminado correctamente");
    } else {
      toast.error("Se ha presentado un error al eliminar el producto");
    }

    setIsLoading(false);
  }


  if (!auth) return navigate("/unauthorized");

  return (
    <Layout>
      { isLoading && <Loading /> }
      <div className="productos-container">
        <div className="title-and-button-add">
          <h1>Productos</h1>

          <Button basic onClick={() => openModalCreate()}>
            Crear producto
          </Button>
        </div>

        <div className="table-contain">
          <Table striped unstackable>
            <Table.Header>
              <TableHeaderCell>Título</TableHeaderCell>
              <TableHeaderCell>SKU</TableHeaderCell>
              <TableHeaderCell>Gramos</TableHeaderCell>
              <TableHeaderCell>Stock</TableHeaderCell>
              <TableHeaderCell>Precio</TableHeaderCell>
              <TableHeaderCell>Código de Barras</TableHeaderCell>
              <TableHeaderCell>Acciones</TableHeaderCell>
            </Table.Header>
            <Table.Body>
              { products.length > 0
                ? (
                  products.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((product) => (
                    <Table.Row key={product.id}>
                      <Table.Cell>{product.title}</Table.Cell>
                      <Table.Cell>{product.sku}</Table.Cell>
                      <Table.Cell>{product.grams}</Table.Cell>
                      <Table.Cell>{product.stock}</Table.Cell>
                      <Table.Cell>{product.price}</Table.Cell>
                      <Table.Cell>{product.barcode}</Table.Cell>
                      <Table.Cell>
                        <Button
                          circular
                          color='linkedin'
                          icon='edit'
                          size="small"
                          style={{marginRight: 5}}
                          onClick={() =>  openModalEdit(product)}
                        />
                        <Button
                          circular
                          color='google plus'
                          icon='trash alternate'
                          size="small"
                          onClick={() => deleteProduct(product.id)}
                        />
                      </Table.Cell>
                    </Table.Row>
                  ))
                ) : (
                  <Table.Row>
                    <Table.Cell colSpan={7}>
                      <p className="text-not-records-products">No se han encontrado registros de productos</p>
                    </Table.Cell>
                  </Table.Row>
                )
              }
            </Table.Body>
          </Table>
        </div>

        { products.length > 0 && (
          <div className="pagination">
            <Pagination
              boundaryRange={1}
              defaultActivePage={page + 1}
              siblingRange={1}
              totalPages={Math.round(products.length / rowsPerPage)}
              onPageChange={(_, data) => setPage(data.activePage - 1)}
            />
          </div>
        )}
      </div>
      <ModalProduct/>
    </Layout>
  );
};

export default Products;
