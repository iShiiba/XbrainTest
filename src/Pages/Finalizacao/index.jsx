import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { orange } from "@mui/material/colors";
import { makeStyles } from "@mui/styles";
import { useSelector, useDispatch } from "react-redux";
import { cartClear } from "../../Redux/cartReducer";
import { formClear } from "../../Redux/formReducer";

const useStyles = makeStyles((theme) => ({
  page: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    maxWidth: "90%",
    height: "332px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",

    textAlign: "center",
  },
  imageContainer: {
    width: "85%",
    display: "flex",
    justifyContent: "flex-end",
  },
  image: {
    width: "150px",
    height: "123px",
  },
  textContainer: {
    display: "flex",
    flexDirection: "column",
    margin: "0",
    padding: "0",
  },
  typeTitle: {
    fontSize: "20px",
    fontWeight: "normal",
    color: "#546E7A",
    margin: "0",
    padding: "0",
    [theme.breakpoints.up("md")]: {
      fontSize: "24px",
    },
  },
  typeText: {
    width: "100%",
    fontSize: "16px",
    fontWeight: "normal",
    margin: "0",
    color: "#546E7A",
    padding: "0",
    [theme.breakpoints.up("md")]: {
      fontSize: "18px",
    },
  },
  typeTotal: {
    fontSize: "16px",
    fontWeight: "normal",
    margin: "0 5px",
    color: "#019CDF",
    padding: "0",
    [theme.breakpoints.up("md")]: {
      fontSize: "18px",
    },
  },
}));

const Finalizacao = () => {
  const style = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const total = useSelector((state) => state.cart.total);
  const name = useSelector((state) => state.form.name);

  const ColorButton = styled(Button)(({ theme }) => ({
    color: "white",
    width: "209px",
    height: "38px",
    backgroundColor: orange[500],
    "&:hover": {
      backgroundColor: orange[700],
    },
  }));
  return (
    <Box className={style.page}>
      <Box className={style.container}>
        <Box>
          <Box component="h1" className={style.typeTitle}>
            {`${name},`}
          </Box>
          <Box className={style.textContainer}>
            <Box component="h1" className={style.typeText}>
              Sua compra no valor
              <Box component="span" className={style.typeTotal}>
                {`R$ ${total},00`}
              </Box>
            </Box>
            <Box component="h1" className={style.typeText}>
              foi finalizada com sucesso
            </Box>
          </Box>
        </Box>
        <Box className={style.imageContainer}>
          <img
            className={style.image}
            src="../images/purchase.png"
            alt="image"
          />
        </Box>

        <ColorButton
          variant="contained"
          onClick={() => {
            dispatch(cartClear());
            dispatch(formClear());
            navigate("/produto");
          }}
        >
          INICIAR NOVA COMPRA
        </ColorButton>
      </Box>
    </Box>
  );
};

export default Finalizacao;
