import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import {
  useCreateCategoyMutation,
  useGetCategoriesQuery,
  useLazyDeleteCategoyQuery,
  useUpdateCategoyMutation,
} from "../store/services/CategoriesService";

export default function AdminCategories() {
  const { data: categories, refetch } = useGetCategoriesQuery();
  const [saveCategory] = useUpdateCategoyMutation();
  const [deleteCategory] = useLazyDeleteCategoyQuery();
  const [createCategory] = useCreateCategoyMutation();
  const [category, setCategory] = useState({
    parent: "",
    name: "",
  });
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div>
      <Flex justifyContent="space-between" alignItems="center" mb={3}>
        <Heading>Категории</Heading>
        <Button colorScheme="pink" onClick={onOpen}>
          Создать
        </Button>
      </Flex>
      <Box m={3} borderWidth="1" boxShadow="base" borderRadius="base">
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Название</Th>
                <Th>Родитель</Th>
                <Th>Действие</Th>
              </Tr>
            </Thead>
            <Tbody>
              {categories &&
                categories.length &&
                categories.map((c) => (
                  <Tr key={c._id}>
                    <Td>{c.name}</Td>
                    <Td>{c.parent?.name}</Td>
                    <Td>
                      <IconButton
                        icon={<EditIcon />}
                        onClick={() => {
                          setCategory(c);
                          onOpen();
                        }}
                        mr={3}
                        colorScheme="yellow"
                      />
                      <IconButton
                        onClick={() => {
                          deleteCategory(c._id);
                          refetch();
                        }}
                        icon={<DeleteIcon />}
                        colorScheme="red"
                      />
                    </Td>
                  </Tr>
                ))}
            </Tbody>
          </Table>
        </TableContainer>
        <EditModal
          isOpen={isOpen}
          onClose={onClose}
          object={category}
          refetch={refetch}
          setObject={setCategory}
          action={category._id ? saveCategory : createCategory}
          categories={categories}
        />
      </Box>
    </div>
  );
}

function EditModal({
  isOpen,
  onClose,
  object,
  setObject,
  categories,
  action,
  refetch,
}) {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {" "}
            {object._id ? "Изменить" : "Добавить"} категорию
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isRequired>
              <FormLabel htmlFor="author">Название:</FormLabel>
              <Input
                id="author"
                value={object.name}
                onChange={(ev) =>
                  setObject({ ...object, name: ev.target.value })
                }
                placeholder="Фентези"
                mb={3}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="categories">
                Родительская категория:
              </FormLabel>
              <Select
                id="categories"
                value={object.parent}
                onChange={(ev) =>
                  setObject({ ...object, parent: ev.target.value })
                }
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
          </ModalBody>

          <ModalFooter>
            <Button
              variant="ghost"
              onClick={() => {
                onClose();
                setObject({ name: "", parent: "" });
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
                setObject({ name: "", parent: "" });
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
