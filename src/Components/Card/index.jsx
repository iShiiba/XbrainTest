import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import { Box, Button, TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { cartUpdate } from "../../Redux/cartReducer";
import { styled } from "@mui/material/styles";
import { lightBlue } from "@mui/material/colors";

const Card = (props) => {
  const [fade, setFade] = useState(false);
  const useStyles = makeStyles((theme) => ({
    cardContainer: {
      "&:hover": {
        boxShadow: "0 0 11px rgba(33,33,33,.2)",
      },
      boxShadow: fade ? "0 0 11px rgba(33,33,33,.2)" : "",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      width: "308px",
      height: "410px",
      marginTop: "40px",
      [theme.breakpoints.up("sm")]: {
        width: "224px",
        height: "316px",
      },
      [theme.breakpoints.up("md")]: {
        width: "237px",
        height: "342px",
      },
    },
    wrapper: {
      width: "306px",
      position: "absolute",
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      justifyContent: "space-between",
      marginTop: fade ? "156px" : "256px",
      backgroundColor: "rgba(255,255,255, 0.5)",
      [theme.breakpoints.up("sm")]: {
        width: "222px",
        marginTop: fade ? "106px" : "206px",
      },
    },
    counterContainer: {
      display: "flex",
      flexDirection: "column",
      gap: "16px",
      marginBottom: "15px",
    },
    counter: {
      height: "40px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    button: {
      width: "286px",
      height: "40px",
      color: "#019CDF",
      [theme.breakpoints.up("sm")]: {
        width: "197px",
        height: "29px",
      },
    },
    textField: {
      width: "174px",
      height: "40px",
      marginRight: "16px",
      marginLeft: "16px",
      [theme.breakpoints.up("sm")]: {
        width: "100px",
        height: "40px",
      },
    },
    iconCircle: {
      "&:hover": {
        boxShadow: "0 0 11px rgba(33,33,33,.2)",
      },
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "40px",
      height: "40px",
      borderRadius: "50%",
      backgroundColor: "#B0BEC5",
      border: "none",
    },
    icon: {
      padding: "0px",
      width: "24px",
      height: "24px",
      [theme.breakpoints.up("sm")]: {
        width: "16px",
        height: "16px",
      },
    },
    imageContainer: {
      padding: "0",
      position: "relative",
      marginBottom: "118px",
    },
    imageProd: {
      width: "276px",
      height: "276px",
      [theme.breakpoints.up("sm")]: {
        width: "198px",
        height: "197px",
      },
      [theme.breakpoints.up("md")]: {
        width: "237px",
        height: "237px",
      },
    },
    textContainer: {
      width: "282px",
      display: "flex",
      flexDirection: "column",
      textAlign: "left",
      [theme.breakpoints.up("sm")]: {
        width: "202px",
      },
    },
    typeTitle: {
      fontSize: "14px",
      fontWeight: "normal",
      fontFamily: "sans-serif",
      color: "#546E7A",
      width: "250px",
      margin: "0",
      margin: "15px 0 6px 0",
      [theme.breakpoints.up("sm")]: {
        width: "210px",
        fontSize: "12px",
      },
      [theme.breakpoints.up("md")]: {
        width: "210px",
        fontSize: "14px",
      },
    },
    typePrice: {
      fontSize: "18px",
      fontFamily: "sans-serif",
      fontWeight: "normal",
      color: "#546E7A",
      margin: "0 0 5px 0",
      [theme.breakpoints.up("sm")]: {
        fontSize: "14px",
      },
      [theme.breakpoints.up("md")]: {
        width: "210px",
        fontSize: "18px",
      },
    },
    typePortion: {
      fontSize: "12px",
      fontWeight: "normal",
      fontFamily: "sans-serif",
      color: "#90A4AE",
      [theme.breakpoints.up("sm")]: {
        fontSize: "10px",
      },
      [theme.breakpoints.up("md")]: {
        fontSize: "12px",
      },
    },
  }));
  const style = useStyles();
  const dispatch = useDispatch();

  const [counter, setCounter] = useState(0);

  const onChangeHandlePlus = (event) => {
    event.stopPropagation();
    setCounter((prevState) => prevState + 1);
  };

  const onChangeHandleMinus = (event) => {
    event.stopPropagation();
    if (counter === 0) return;
    setCounter((prevState) => prevState - 1);
  };

  const onAdd = (event) => {
    event.stopPropagation();
    const prodObj = {
      counter,
      price: props.price,
      id: props.idx,
    };
    dispatch(cartUpdate(prodObj));
  };

  const ColorButton = styled(Button)(({ theme }) => ({
    color: "white",
    width: "286px",
    height: "40px",
    backgroundColor: lightBlue[500],
    "&:hover": {
      backgroundColor: lightBlue[700],
    },
    [theme.breakpoints.up("sm")]: {
      width: "197px",
      height: "29px",
    },
  }));

  return (
    <Box
      className={style.cardContainer}
      elevation={0}
      onClick={() => {
        setFade((prev) => !prev);
      }}
    >
      <Box className={style.imageContainer}>
        <img className={style.imageProd} src={props.img} alt="product image" />
      </Box>
      <Box className={style.wrapper}>
        <Box className={style.textContainer}>
          <Box component="h1" className={style.typeTitle}>
            {props.type}
          </Box>
          <Box component="h1" className={style.typePrice}>
            {`R$ ${props.price},00`}
          </Box>
          <Box>
            <Box component="h1" className={style.typePortion}>
              Em até 12x de R$ 124,92
            </Box>
            <Box component="h1" className={style.typePortion}>
              {`R$ ${props.portion} à vista (10% de desconto)`}
            </Box>
          </Box>
        </Box>

        {fade && (
          <Box className={style.counterContainer}>
            <Box className={style.counter}>
              <Box
                component="button"
                onClick={onChangeHandleMinus}
                className={style.iconCircle}
              >
                <img
                  className={style.icon}
                  src="././images/baseline-remove-24px.svg"
                  alt="remove icon"
                />
              </Box>

              <TextField
                inputProps={{ min: 0, style: { textAlign: "center" } }}
                id="counter-textField"
                variant="outlined"
                value={counter}
                disabled
                className={style.textField}
                size="small"
              />
              <Box
                component="button"
                onClick={onChangeHandlePlus}
                className={style.iconCircle}
              >
                <img
                  className={style.icon}
                  src="././images/baseline-add-24px.svg"
                  alt="add icon"
                />
              </Box>
            </Box>
            <ColorButton
              variant="contained"
              className={style.button}
              onClick={onAdd}
            >
              ADICIONAR
            </ColorButton>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Card;
