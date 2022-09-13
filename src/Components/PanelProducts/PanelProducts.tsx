import { useState, useEffect } from "react";
import ContentHeader from "./ContentHeader/ContentHeader";
import GridHeader from "./GridHeader/GridHeader";
import {
  Grid,
  SelectChangeEvent,
  Divider,
  Box,
  CircularProgress,
} from "@mui/material";
import { DashWrapper, paginationStyle } from "../../Styles/PanelProducts";
import Product from "./Product/Product";
import PanelPagination from "../PanelPagination/PanelPagination";
import {
  useDeleteProductMutation,
  useGetAllProductsQuery,
} from "../../features/products/productsApi";
import { IProduct } from "../../Services/Utils/Types/product";
import {
  errorMessage,
  successMessage,
} from "../../Services/Utils/toastMessages";
import NotFound from "../EmptyList/NotFound";
import { ErrorText, PStack } from "../../Styles/panelCommon";

const PanelProducts = () => {
  const [list, setList] = useState<IProduct[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = list.slice(indexOfFirstProduct, indexOfLastProduct);
  const { data: products, isLoading, isError } = useGetAllProductsQuery();
  const [deleteProduct] = useDeleteProductMutation();

  const [selectedStatus, setSelectedStatus] = useState("status");
  const [selectedAmount, setSelectedAmount] = useState("20");

  const selectedStatusHandler = (event: SelectChangeEvent) => {
    setSelectedStatus(event.target.value);
  };
  const selectedAmountHandler = (event: SelectChangeEvent) => {
    setSelectedAmount(event.target.value);
  };

  async function handleRemove(id: string) {
    try {
      const response = await deleteProduct(id).unwrap();
      successMessage(response?.message);
    } catch (err: any) {
      errorMessage(err?.message);
    }
  }
  useEffect(() => {
    if (products?.data) {
      setList(products.data);
    }
  }, [products]);

  return (
    <Grid container rowSpacing={4}>
      <Grid item xs={12}>
        <ContentHeader title="Products" />
      </Grid>

      <Grid item xs={12}>
        <DashWrapper
          sx={{ borderBottomLeftRadius: "0", borderBottomRightRadius: "0" }}
        >
          <GridHeader
            selectedStatus={selectedStatus}
            selectedAmount={selectedAmount}
            selectedStatusHandler={selectedStatusHandler}
            selectedAmountHandler={selectedAmountHandler}
          />
        </DashWrapper>
        <Divider
          sx={{ borderColor: "common.panelBorderGrey", opacity: ".1" }}
        />
        <DashWrapper
          sx={{
            borderTopLeftRadius: "0",
            borderTopRightRadius: "0",
            overflow: "hidden",
          }}
        >
          <Grid container spacing={2}>
            {isLoading && (
              <PStack>
                <CircularProgress color="error" />
              </PStack>
            )}
            {isError && <ErrorText>ERROR:Could not retrieve data!</ErrorText>}
            {products?.data.length === 0 && !isLoading ? (
              <NotFound />
            ) : (
              currentProducts.map(({ _id, title, price, image }) => (
                <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={_id}>
                  <Product
                    id={_id!}
                    title={title}
                    price={price}
                    image={image}
                    onRemove={handleRemove}
                  />
                </Grid>
              ))
            )}
          </Grid>
          <Box sx={paginationStyle}>
            <PanelPagination
              productsPerPage={productsPerPage}
              totalProducts={list.length}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </Box>
        </DashWrapper>
      </Grid>
    </Grid>
  );
};

export default PanelProducts;
