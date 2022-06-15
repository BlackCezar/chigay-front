import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Select, Stack, Textarea } from "@chakra-ui/react";
import React from "react";
import { useGetCategoriesQuery } from "../../store/services/CategoriesService";
import { useGetProductinosQuery } from "../../store/services/ProductionService";


export default function ModalAdminProduct({
    isOpen,
    onClose,
    object,
    setObject,
    action,
    refetch,
  }) {
    const { data: productions } = useGetProductinosQuery();
    const { data: categories } = useGetCategoriesQuery();

    return (
      <>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              {" "}
              {object._id ? "Изменить" : "Добавить"} товар
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
            <Stack spacing={3}  mr={3}>
            <FormControl isRequired>
              <FormLabel htmlFor="title">Название:</FormLabel>
              <Input
                id="title"
                value={object.title}
                onChange={(ev) => setObject({ ...object, title: ev.target.value })}
                placeholder="Введите название"
                mb={3}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel htmlFor="author">Автор:</FormLabel>
              <Input
                id="author"
                value={object.author}
                onChange={(ev) => setObject({ ...object, author: ev.target.value })}
                placeholder="Стрельцов И.А."
                mb={3}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel htmlFor="article">Артикул:</FormLabel>
              <Input
                id="article"
                value={object.artikle}
                onChange={(ev) => setObject({ ...object, artikle: ev.target.value })}
                placeholder=""
                mb={3}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel htmlFor="format">Формат:</FormLabel>
              <Input
                id="format"
                value={object.format}
                onChange={(ev) => setObject({ ...object, format: ev.target.value })}
                placeholder=""
                mb={3}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel htmlFor="year">Год выпуска:</FormLabel>
              <NumberInput
                id="year"
                value={object.year}
                onChange={(ev) => setObject({ ...object, year: ev })}
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
                value={object.pagesCount}
                onChange={(ev) => setObject({ ...object, pagesCount: ev })}
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
                value={object.typeWrapper}
                onChange={(ev) =>
                  setObject({ ...object, typeWrapper: ev.target.value })
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
                value={object.descripton}
                onChange={(ev) => setObject({ ...object, descripton: ev.target.value })}
                placeholder="Введите название"
                mb={3}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel htmlFor="weight">Вес, в гр.:</FormLabel>
              <NumberInput
                id="weight"
                value={object.weigh}
                onChange={(ev) => setObject({ ...object, weigh: ev })}
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
                value={object.ageRestriction}
                onChange={(ev) =>
                  setObject({ ...object, ageRestriction: ev })
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
                value={object.price}
                onChange={(ev) => {
                  console.log(ev)
                  setObject({ ...object, price: ev })
                }}
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
                value={object.quantity}
                onChange={(ev) => setObject({ ...object, quantity: ev })}
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
                value={object.categories}
                onChange={(ev) => setObject({ ...object, categories: ev.target.value })}
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
                value={object.production}
                onChange={(ev) => setObject({ ...object, production: ev.target.value })}
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
            </ModalBody>
  
            <ModalFooter>
              <Button
                variant="ghost"
                onClick={() => {
                  onClose();
                  setObject({  title: "",
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
                  quantity: 1,});
                }}
              >
                Отмена
              </Button>
              <Button
                colorScheme="pink"
                mr={3}
                onClick={() => {
                  action(
                    object._id
                      ? {
                          data: object,
                          id: object._id,
                        }
                      : object
                  );
                  onClose();
                  setObject({ title: "",
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
                  quantity: 1});
                  refetch();
                }}
              >
                {object._id ? "Сохранить" : "Создать"}
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  }
  