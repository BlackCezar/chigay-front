import { ArrowBackIcon } from "@chakra-ui/icons";
import { Box, Divider, Flex, Link, LinkBox, Spinner } from "@chakra-ui/react";
import {NavLink, useNavigate} from 'react-router-dom'
import React from "react";

export default function Sidebar({items}) {
  const navigation = useNavigate()

  return (
    <div className="sidebar">
      <Box borderWidth="1px" p={3} borderRadius="md">
        <LinkBox onClick={() => navigation(-1)}>
          <ArrowBackIcon  /> Назад
        </LinkBox>
        <Flex flexDirection="column">
          <Divider mb={3} mt={3} />
          {items && items.length ? items.map(item => (<NavLink key={item._id} to={`/categories/${item._id}`}><Link p={1}>
            {item.name}
          </Link></NavLink>)) : <Spinner />}
        </Flex>
      </Box>
    </div>
  );
}
