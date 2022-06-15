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
import { useCreateProductionMutation, useGetProductinosQuery, useLazyDeleteProductionQuery, useUpdateProductionMutation } from "../store/services/ProductionService";

export default function AdminProductions() {
  const { data: productions, refetch } = useGetProductinosQuery();
  const [saveProduction] = useUpdateProductionMutation();
  const [deleteProduction] = useLazyDeleteProductionQuery();
  const [createProduction] = useCreateProductionMutation();
  const [production, setProduction] = useState({
    name: "",
  });
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div>
      <Flex justifyContent="space-between" alignItems="center" mb={3}>
        <Heading>Издатель</Heading>
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
                <Th>Действие</Th>
              </Tr>
            </Thead>
            <Tbody>
              {productions &&
                productions.length &&
                productions.map((c) => (
                  <Tr key={c._id}>
                    <Td>{c.name}</Td>
                    <Td>
                      <IconButton
                        icon={<EditIcon />}
                        onClick={() => {
                          setProduction(c);
                          onOpen();
                        }}
                        mr={3}
                        colorScheme="yellow"
                      />
                      <IconButton
                        onClick={async () => {
                          await deleteProduction(c._id);
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
          object={production}
          refetch={refetch}
          setObject={setProduction}
          action={production._id ? saveProduction : createProduction}
          productions={productions}
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
            {object._id ? "Изменить" : "Добавить"} издателя
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
                placeholder="Рос Мос."
                mb={3}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              variant="ghost"
              onClick={() => {
                onClose();
                setObject({ name: ""});
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
                setObject({ name: ""});
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
