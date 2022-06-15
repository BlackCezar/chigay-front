import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as LinkRouter } from "react-router-dom";
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Center,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  Wrap,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import "../assets/scss/Common.scss";
import { ReactComponent as LogoIcon } from "../assets/images/logo.svg";
import {
  useAuthUserMutation,
  useCheckConnectionQuery,
  useCreateUserMutation,
} from "../store/services/UserService";
import { saveUser } from "../reducers/user";
import { ChevronDownIcon, HamburgerIcon } from "@chakra-ui/icons";
import { useToast } from "@chakra-ui/react";
import { useGetCategoriesQuery } from "../store/services/CategoriesService";
import { useGetProductsQuery } from "../store/services/ProductsService";
import {ReactComponent as CartIcon} from '../assets/images/cart.svg'

export default function Layout({ children }) {
  const { data: categories } = useGetCategoriesQuery();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.object);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isSignUp,
    onOpen: openSignUp,
    onClose: closeSignUp,
  } = useDisclosure();

  const checkUserData = useCheckConnectionQuery();
  const [createUser, signUpData] = useCreateUserMutation();
  const toast = useToast();

  const btnRef = React.useRef();

  const [loginInput, setLoginInput] = useState({
    value: "",
    touched: false,
    valid: false,
  });
  const [passwordInput, setPasswordInput] = useState({
    value: "",
    touched: false,
    valid: false,
  });
  const [rePasswordInput, setRePasswordInput] = useState({
    value: "",
    touched: false,
    valid: false,
  });
  const [nameInput, setNameInput] = useState({
    value: "",
    touched: false,
    valid: false,
  });

  const [login, authData] = useAuthUserMutation();
  const handleLogin = (val) => {
    val = val.target.value;
    setLoginInput({
      touched: true,
      value: val,
      valid: val !== "" && val !== "" && String(val).length > 4,
    });
  };

  const handleName = (val) => {
    val = val.target.value;
    setNameInput({
      touched: true,
      value: val,
      valid: val !== "" && val !== "" && String(val).length > 4,
    });
  };

  const handleRePassword = (val) => {
    val = val.target.value;

    setRePasswordInput({
      touched: true,
      value: val,
      valid:
        val !== "" &&
        val !== "" &&
        String(val).length > 4 &&
        val === passwordInput.value,
    });
  };

  const handlePassword = (val) => {
    val = val.target.value;
    setPasswordInput({
      touched: true,
      value: val,
      valid: val !== "" && val !== "" && String(val).length > 4,
    });
  };

  const handleSendForm = async (ev) => {
    ev.preventDefault();

    if (!user) {
      login({
        login: loginInput.value,
        password: passwordInput.value,
      });
    }
  };

  const handleSignUpForm = (ev) => {
    ev.preventDefault();

    if (!user) {
      createUser({
        login: loginInput.value,
        fullname: nameInput.value,
        password: passwordInput.value,
      });
    }
  };

  useEffect(() => {
    if (authData.isSuccess && authData.data && !user) {
      dispatch(saveUser(authData.data.object));
      toast({
        title: "Успешный вход",
        description: `Вы вошли, как ${authData.data.object.fullname}`,
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      onClose();
    }
    if (checkUserData.data && checkUserData.data.code === 0 && !user) {
      dispatch(saveUser(checkUserData.data.object));
      toast({
        title: "Успешный вход",
        description: `Вы вошли, как ${checkUserData.data.object.fullname}`,
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    }
    if (signUpData.data) {
      if (signUpData.isError) {
        toast({
          title: "Ошибка",
          description: signUpData.error,
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      } else if (signUpData.isSuccess && !signUpData.isLoading) {
        if (signUpData.data.code === 0 && !user) {
          dispatch(saveUser(signUpData.data.object));
          toast({
            title: "Успешный вход",
            description: `Вы вошли, как ${signUpData.data.object.fullname}`,
            status: "success",
            duration: 2000,
            isClosable: true,
          });
          onClose();
          closeSignUp();
        } else {
          toast({
            title: "Ошибка",
            description: signUpData.data.message,
            status: "error",
            duration: 2000,
            isClosable: true,
          });
        }
      }
    }
  }, [authData.data, checkUserData.data, dispatch, toast, signUpData.data, authData.isSuccess, closeSignUp, onClose, signUpData.error, signUpData.isError, signUpData.isLoading, signUpData.isSuccess, user]);

  return (
    <div className="page-layout">
      {checkUserData.isLoading ? (
        <Center w="100%">
          <Spinner size="xl" />
        </Center>
      ) : (
        <div className="content">
          <Box p={5} className="header">
            <Flex alignItems="center" justifyContent="flex-start">
              <Flex alignItems="center" mr={2}>
                <LogoIcon className="logo" />
                <Text whiteSpace="nowrap" className="logo-text">
                  Читай-Город
                </Text>
              </Flex>
              {user && user.role === "Admin" ? (
                <></>
              ) : categories && categories.filter(c => !c.parent).map(c => (
                <Menu key={c._id}>
                  
                  <MenuButton
                    className="menu-link"
                    as={Button}
                    rightIcon={<ChevronDownIcon />}
                  >
                    {c.name}
                  </MenuButton>
                  <MenuList>
                    {categories.filter(subcat => subcat.parent && String(subcat.parent._id) === String(c._id)).map(subcat => (<LinkRouter key={subcat._id} to={`/categories/${subcat._id}`}><MenuItem>{subcat.name}</MenuItem></LinkRouter>))}
                  </MenuList>
                </Menu>
              )) }

              {user && user.role === "Admin" ? (
                <Menu>
                  <MenuButton
                    as={Button}
                    className="menu-link"
                    rightIcon={<ChevronDownIcon />}
                  >
                    Управление
                  </MenuButton>
                  <MenuList>
                    <LinkRouter to="/admin/products">
                      <MenuItem>Продукты</MenuItem>
                    </LinkRouter>
                    <LinkRouter to="/admin/categories">
                      <MenuItem>Категории</MenuItem>
                    </LinkRouter>
                    <LinkRouter to="/admin/productions">
                      <MenuItem>Издатели</MenuItem>
                    </LinkRouter>
                  </MenuList>
                </Menu>
              ) : (<Wrap ml='auto'><LinkRouter to='/cart'> <IconButton mr={2}  p={2} icon={<CartIcon />} /></LinkRouter></Wrap>)}
              {user && user._id ? (
                <Menu>
                  <MenuButton
                    as={Button}
                    className="menu-link"
                    rightIcon={<ChevronDownIcon />}
                  >
                    {user.fullname}
                  </MenuButton>
                  <MenuList>
                    <LinkRouter to="/lk">
                      <MenuItem>История заказов</MenuItem>
                    </LinkRouter>
                    <LinkRouter to="/logout">
                      <MenuItem>Выйти</MenuItem>
                    </LinkRouter>
                  </MenuList>
                </Menu>
              ) : (
                <IconButton
                  icon={<HamburgerIcon />}
                  ref={btnRef}
                  onClick={onOpen}
                />
              )}
            </Flex>
            <Divider mt={5} mb="3" />
          </Box>
          <Drawer
            isOpen={isOpen}
            placement="right"
            onClose={onClose}
            finalFocusRef={btnRef}
          >
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader>Авторизация</DrawerHeader>

              <DrawerBody>
                <form>
                  {" "}
                  <FormControl
                    isInvalid={loginInput.touched && !loginInput.valid}
                    isRequired
                    mb={5}
                  >
                    <FormLabel htmlFor="login">Логин:</FormLabel>
                    <Input
                      id="login"
                      type="text"
                      value={loginInput.value}
                      onChange={handleLogin}
                    />
                  </FormControl>
                  <FormControl
                    isInvalid={passwordInput.touched && !passwordInput.valid}
                    isRequired
                    mb={5}
                  >
                    <FormLabel htmlFor="email">Пароль:</FormLabel>
                    <Input
                      id="password"
                      type="password"
                      value={passwordInput.value}
                      onChange={handlePassword}
                    />
                  </FormControl>
                  <Flex flexDir="column" w="100%">
                    <Center>
                      <Button
                        w="50%"
                        onClick={handleSendForm}
                        mt={4}
                        colorScheme="pink"
                        mb={4}
                        type="submit"
                      >
                        {authData.isLoading ? <Spinner /> : "Войти"}
                      </Button>
                    </Center>
                    <Center>
                      <Button variant="ghost" onClick={openSignUp}>
                        Создать аккант
                      </Button>
                    </Center>
                    {authData.data && authData.data.code !== 0 && (
                      <Alert status="error">
                        <AlertIcon />
                        {authData.data.message}
                      </Alert>
                    )}
                  </Flex>
                </form>
              </DrawerBody>
            </DrawerContent>
          </Drawer>
          <Modal isOpen={isSignUp}>
            <ModalOverlay>
              <ModalContent>
                <ModalHeader>Регистрация</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <FormControl
                    isInvalid={loginInput.touched && !loginInput.valid}
                    isRequired
                    mb={5}
                  >
                    <FormLabel htmlFor="email">Email:</FormLabel>
                    <Input
                      id="email"
                      type="email"
                      value={loginInput.value}
                      onChange={handleLogin}
                    />
                  </FormControl>
                  <FormControl
                    isInvalid={nameInput.touched && !nameInput.valid}
                    isRequired
                    mb={5}
                  >
                    <FormLabel htmlFor="name">Ваше имя:</FormLabel>
                    <Input
                      id="name"
                      type="text"
                      value={nameInput.value}
                      onChange={handleName}
                    />
                  </FormControl>

                  <FormControl
                    isInvalid={passwordInput.touched && !passwordInput.valid}
                    isRequired
                    mb={5}
                  >
                    <FormLabel htmlFor="email">Пароль:</FormLabel>
                    <Input
                      id="password"
                      type="password"
                      value={passwordInput.value}
                      onChange={handlePassword}
                    />
                  </FormControl>
                  <FormControl
                    isInvalid={
                      rePasswordInput.touched && !rePasswordInput.valid
                    }
                    isRequired
                    mb={5}
                  >
                    <FormLabel htmlFor="rePassword">
                      Повторите пароль:
                    </FormLabel>
                    <Input
                      id="rePassword"
                      type="password"
                      value={rePasswordInput.value}
                      onChange={handleRePassword}
                    />
                  </FormControl>
                </ModalBody>
                <ModalFooter>
                  <Button variant="ghost" onClick={closeSignUp}>
                    Отмена
                  </Button>
                  <Button colorScheme="pink" ml={3} onClick={handleSignUpForm}>
                    {signUpData.isLoading ? <Spinner /> : "Создать"}
                  </Button>
                </ModalFooter>
              </ModalContent>
            </ModalOverlay>
          </Modal>
          <Box p={5} pt={0}>
            {children}
          </Box>
        </div>
      )}
    </div>
  );
}
