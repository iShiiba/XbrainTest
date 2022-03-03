import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../../Components/Card";
import { makeStyles } from "@mui/styles";
import { styled } from "@mui/material/styles";
import {
  Box,
  TextField,
  Button,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  FormHelperText,
} from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { orange } from "@mui/material/colors";
import { useSelector, useDispatch } from "react-redux";
import { formUpdate } from "../../Redux/formReducer";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    maxWidth: "100vw",
    height: "100vh",
    margin: "0",
    padding: "0",
  },
  cardWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
    gap: "10px",

    [theme.breakpoints.up("sm")]: {
      padding: "0",
      margin: "0",
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "flex-start",
    },
    [theme.breakpoints.up("md")]: {
      padding: "0",
      margin: "0",
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-around",
    },
  },
  title: {
    fontSize: "16px",
    color: "#546E7A",
    width: "95vw",
    height: "34px",
    borderBottom: "1px solid #ECEFF1",
    fontWeight: "normal",
    [theme.breakpoints.up("sm")]: {
      fontSize: "18px",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "24px",
    },
  },
  dataContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: "15px",
    [theme.breakpoints.up("sm")]: {
      margin: "0",
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
    },
    [theme.breakpoints.up("md")]: {
      margin: "0",
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-around",
    },
  },
  dataWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    [theme.breakpoints.up("sm")]: {
      margin: "0",
      padding: "20px",
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "flex-start",
      width: "100%",
    },
    [theme.breakpoints.up("md")]: {
      margin: "0",
      padding: "0",
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-around",
      width: "100%",
      gap: 0,
    },
  },
  textField: {
    width: "308px",
    height: "56px",
    [theme.breakpoints.up("sm")]: {
      width: "320px",
      height: "56px",
    },
    [theme.breakpoints.up("md")]: {
      width: "459px",
      height: "56px",
    },
  },
  formControl: {
    width: "164px",
    [theme.breakpoints.up("sm")]: {
      marginTop: "10px",
    },
  },
  selectField: {
    width: "308px",
    [theme.breakpoints.up("sm")]: {
      width: "164px",
      height: "56px",
    },
    [theme.breakpoints.up("md")]: {
      width: "174px",
      height: "56px",
    },
  },
  typeTotal: {
    fontSize: "18px",
    fontWeight: "normal",
    fontFamily: "sans-serif",
    color: "#546E7A",
    marginRight: "15px",
    [theme.breakpoints.up("md")]: {
      fontSize: "24px",
    },
  },
  totalBox: {
    marginTop: "20px",
    width: "90%",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
  },
}));

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Produto = () => {
  const style = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const total = useSelector((state) => state.cart.total);

  const ColorButton = styled(Button)(({ theme }) => ({
    color: "white",
    width: "187px",
    height: "40px",
    backgroundColor: orange[500],
    "&:hover": {
      backgroundColor: orange[700],
    },
  }));

  const [gender, setGender] = useState("");
  const [prod, setProd] = useState([]);
  const [nameVal, setNameVal] = useState("");
  const [emailVal, setEmailVal] = useState("");
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [genderError, setGenderError] = useState(false);
  const [open, setOpen] = useState(false);

  const getData = async () => {
    const response = await fetch("product.json");
    const data = await response.json();
    setProd(data.products);
  };

  useEffect(() => {
    getData();
  }, []);

  const handleChange = (event) => {
    setGender(event.target.value);
  };

  const onChangeHandleName = (event) => {
    setNameVal(event.target.value);
  };

  const onChangeHandleEmail = (event) => {
    setEmailVal(event.target.value);
  };

  const onAdd = () => {
    if (nameVal.trim() === "") {
      setNameError(true);
      setEmailError(false);
      setGenderError(false);
      return;
    }
    if (emailVal.trim() === "") {
      setEmailError(true);
      setNameError(false);
      setGenderError(false);
      return;
    }
    if (gender === "") {
      setGenderError(true);
      setNameError(false);
      setEmailError(false);
      return;
    }
    if (total === 0) {
      setOpen(true);
      return;
    }

    const formObj = {
      name: nameVal,
      email: emailVal,
      gender: gender,
    };
    dispatch(formUpdate(formObj));
    navigate("/finalizacao");
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <Box className={style.container}>
      <Box component="h1" className={style.title}>
        Produtos
      </Box>
      <Box className={style.cardWrapper}>
        {prod.map((prod, idx) => (
          <Card
            type={prod.type}
            price={prod.price}
            portion={prod.portion}
            inCash={prod.inCash}
            img={prod.img}
            idx={idx}
            key={idx}
          />
        ))}
      </Box>

      <Box component="h1" className={style.title}>
        Dados do Cliente
      </Box>
      <Box className={style.dataContainer}>
        <Box className={style.dataWrapper}>
          <TextField
            error={nameError}
            id="name-textField"
            label="Nome"
            variant="outlined"
            value={nameVal}
            placeholder="Nome do cliente aqui"
            helperText={nameError ? "Campo Obrigatório" : ""}
            className={style.textField}
            onChange={onChangeHandleName}
          />
          <TextField
            error={emailError}
            id="email-textField"
            label="Email"
            variant="outlined"
            value={emailVal}
            placeholder="Digite seu email aqui"
            helperText={emailError ? "Campo Obrigatório" : ""}
            className={style.textField}
            onChange={onChangeHandleEmail}
          />
          <FormControl error={genderError}>
            <InputLabel id="gender-select">Sexo</InputLabel>
            <Select
              labelId="gender-select"
              id="gender-select"
              value={gender}
              label="Sexo"
              onChange={handleChange}
              className={style.selectField}
            >
              <MenuItem value="female">Feminino</MenuItem>
              <MenuItem value="male">Masculino</MenuItem>
            </Select>
            {genderError && <FormHelperText>Campo Obrigatório</FormHelperText>}
          </FormControl>
        </Box>

        <Box className={style.totalBox}>
          <Box
            component="h1"
            className={style.typeTotal}
          >{`Total: R$ ${total},00`}</Box>
          <ColorButton
            variant="contained"
            onClick={() => {
              onAdd();
            }}
          >
            FINALIZAR COMPRA
          </ColorButton>
        </Box>
      </Box>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="warning" sx={{ width: "100%" }}>
          Carrinho vazio!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Produto;
