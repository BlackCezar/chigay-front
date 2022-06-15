import React from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Stack,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import ImageUploading from "react-images-uploading";
import { useGetProductinosQuery } from "../../store/services/ProductionService";
import { useGetCategoriesQuery } from "../../store/services/CategoriesService";
import { useCreateProductMutation } from "../../store/services/ProductsService";

export default function AdminProductCreateTab() {
  const [create, {error}] = useCreateProductMutation()
  const [images, setImages] = React.useState([]);
  const [productForm, setProductForm] = React.useState({
    title: "",
    author: "",
    artikle: "",
    year: 2022,
    pagesCount: 300,
    format: "",
    typeWrapper: "Мягкая бумажная",
    descripton: "",
    weigh: 300,
    ageRestriction: 12,
    price: 300,
    categories: [],
    production: "",
    quantity: 1,
  });
  const maxNumber = 69;
  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };
  const { data: productions } = useGetProductinosQuery();
  const { data: categories } = useGetCategoriesQuery();
  const toast = useToast();

  const createProduct = async () => {
    const fd = new FormData();
    fd.append('json', JSON.stringify(productForm))
    // for (let i = 0; i < images.length; i++) {
    //   fd.append(`images[${i}]`, images[i].file)  
    // }
    for (let image of images) {
      fd.append('images', image.file)
    }
    try {
      let resp = await create(fd)
      console.log(resp.data)
      if (resp.data.code === 0) {
        toast({
          title: "Товар создан",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Ошибка",
          description: resp.data.message || '',
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      }

    } catch (err) {
      console.log(err)
      toast({
        title: "Ошибка",
        description: error || '',
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  }

  return (
    <Box>
      <Flex>
        <Stack spacing={3} w="50%" mr={3}>
          <FormControl isRequired>
            <FormLabel htmlFor="title">Название:</FormLabel>
            <Input
              id="title"
              value={productForm.title}
              onChange={(ev) => setProductForm({ ...productForm, title: ev.target.value })}
              placeholder="Введите название"
              mb={3}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor="author">Автор:</FormLabel>
            <Input
              id="author"
              value={productForm.author}
              onChange={(ev) => setProductForm({ ...productForm, author: ev.target.value })}
              placeholder="Стрельцов И.А."
              mb={3}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor="article">Артикул:</FormLabel>
            <Input
              id="article"
              value={productForm.artikle}
              onChange={(ev) => setProductForm({ ...productForm, artikle: ev.target.value })}
              placeholder=""
              mb={3}
            />
          </FormControl>
          <FormControl isRequired>
              <FormLabel htmlFor="format">Формат:</FormLabel>
              <Input
                id="format"
                value={productForm.format}
                onChange={(ev) => setProductForm({ ...productForm, format: ev.target.value })}
                placeholder=""
                mb={3}
              />
            </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor="year">Год выпуска:</FormLabel>
            <NumberInput
              id="year"
              value={productForm.year}
              onChange={(ev) => setProductForm({ ...productForm, year: ev })}
              min={1900}
              max={2023}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor="pages">Кол-во страниц:</FormLabel>
            <NumberInput
              id="pages"
              value={productForm.pagesCount}
              onChange={(ev) => setProductForm({ ...productForm, pagesCount: ev })}
              min={0}
              max={10000}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor="type">Тим обложки:</FormLabel>
            <Select
              id="type"
              value={productForm.typeWrapper}
              onChange={(ev) =>
                setProductForm({ ...productForm, typeWrapper: ev.target.value })
              }
            >
              <option value="Мягкая бумажная">Мягкая бумажная</option>
              <option value="Твердая">Твердая</option>
            </Select>
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor="desc">Описание:</FormLabel>
            <Textarea
              id="desc"
              value={productForm.descripton}
              onChange={(ev) => setProductForm({ ...productForm, descripton: ev.target.value })}
              placeholder="Введите название"
              mb={3}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor="weight">Вес, в гр.:</FormLabel>
            <NumberInput
              id="weight"
              value={productForm.weigh}
              onChange={(ev) => setProductForm({ ...productForm, weigh: ev })}
              min={0}
              max={10000}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor="age">Возрастное ограничение:</FormLabel>
            <NumberInput
              id="age"
              value={productForm.ageRestriction}
              onChange={(ev) =>
                setProductForm({ ...productForm, ageRestriction: ev.target.value })
              }
              min={0}
              max={10000}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor="price">Цена:</FormLabel>
            <NumberInput
              id="price"
              value={productForm.price}
              onChange={(ev) => setProductForm({ ...productForm, price: ev })}
              min={0}
              max={10000}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor="qty">Кол-во в наличии:</FormLabel>
            <NumberInput
              id="qty"
              value={productForm.quantity}
              onChange={(ev) => setProductForm({ ...productForm, quantity: ev })}
              min={0}
              max={10000}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor="categories">Категории:</FormLabel>
            <Select
              id="categories"
              value={productForm.categories}
              onChange={(ev) => setProductForm({ ...productForm, categories: ev })}
            >
              {categories &&
                categories.length &&
                categories.map((p) => (
                  <option key={p._id} value={p._id}>
                    {p.name}
                  </option>
                ))}
            </Select>
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor="production">Издательство:</FormLabel>
            <Select
              id="production"
              value={productForm.production}
              onChange={(ev) => setProductForm({ ...productForm, production: ev.target.value })}
            >
              {productions &&
                productions.length &&
                productions.map((p) => (
                  <option key={p._id} value={p._id}>
                    {p.name}
                  </option>
                ))}
            </Select>
          </FormControl>
        </Stack>
        <Box w="50%">
          <ImageUploading
            multiple
            value={images}
            onChange={onChange}
            maxNumber={maxNumber}
            dataURLKey="data_url"
          >
            {({
              imageList,
              onImageUpload,
              onImageRemoveAll,
              onImageUpdate,
              onImageRemove,
              isDragging,
              dragProps,
            }) => (
              // write your building UI
              <div className="upload__image-wrapper">
                <Text mb={2}>Изображения</Text>
                <Flex justifyContent="space-between" mb={3}>
                  <Button
                    style={isDragging ? { color: "red" } : null}
                    onClick={onImageUpload}
                    {...dragProps}
                  >
                    Нажми или перетяни файл сюда
                  </Button>
                  <Button onClick={onImageRemoveAll}>
                    Очистить все изображения
                  </Button>
                </Flex>
                {imageList.map((image, index) => (
                  <Box
                    key={index}
                    className="image-item"
                    borderRadius="base"
                    p={4}
                    borderWidth="1px"
                    mb={3}
                  >
                    <img src={image.data_url} alt="" />

                    <Box mt={3}>
                      <Button mr={3} onClick={() => onImageUpdate(index)}>
                        Загрузить
                      </Button>
                      <Button onClick={() => onImageRemove(index)}>
                        Удалить
                      </Button>
                    </Box>
                  </Box>
                ))}
              </div>
            )}
          </ImageUploading>
        </Box>
      </Flex>
      <Flex>
        <Button size="lg" mt={3} colorScheme="telegram" ml="auto" onClick={createProduct}>
          Добавить
        </Button>
      </Flex>
    </Box>
  );
}
