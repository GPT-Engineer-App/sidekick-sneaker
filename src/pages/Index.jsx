import React, { useState } from 'react';
import { Container, VStack, HStack, Text, Button, Input, Select, Table, Thead, Tbody, Tr, Th, Td, IconButton } from "@chakra-ui/react";
import { FaEdit, FaTrash } from "react-icons/fa";

const Index = () => {
  const [transactions, setTransactions] = useState([
    { id: 1, date: '2023-10-01', amount: 200, type: 'Income', category: 'Nike' },
    { id: 2, date: '2023-10-02', amount: 150, type: 'Expense', category: 'Adidas' },
  ]);

  const [form, setForm] = useState({ id: null, date: '', amount: '', type: '', category: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = () => {
    if (form.id) {
      setTransactions(transactions.map(tx => tx.id === form.id ? form : tx));
    } else {
      setForm({ ...form, id: transactions.length + 1 });
      setTransactions([...transactions, { ...form, id: transactions.length + 1 }]);
    }
    setForm({ id: null, date: '', amount: '', type: '', category: '' });
  };

  const handleEdit = (id) => {
    const transaction = transactions.find(tx => tx.id === id);
    setForm(transaction);
  };

  const handleDelete = (id) => {
    setTransactions(transactions.filter(tx => tx.id !== id));
  };

  return (
    <Container centerContent maxW="container.md" py={10}>
      <VStack spacing={4} width="100%">
        <Text fontSize="2xl">Sneaker Accounting App</Text>
        <HStack spacing={4} width="100%">
          <Input placeholder="Date" name="date" value={form.date} onChange={handleChange} />
          <Input placeholder="Amount" name="amount" value={form.amount} onChange={handleChange} />
          <Select placeholder="Type" name="type" value={form.type} onChange={handleChange}>
            <option value="Income">Income</option>
            <option value="Expense">Expense</option>
          </Select>
          <Select placeholder="Category" name="category" value={form.category} onChange={handleChange}>
            <option value="Nike">Nike</option>
            <option value="Adidas">Adidas</option>
            <option value="Puma">Puma</option>
            <option value="Reebok">Reebok</option>
          </Select>
          <Button onClick={handleSubmit}>{form.id ? 'Update' : 'Add'}</Button>
        </HStack>
        <Table variant="simple" width="100%">
          <Thead>
            <Tr>
              <Th>Date</Th>
              <Th>Amount</Th>
              <Th>Type</Th>
              <Th>Category</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {transactions.map(tx => (
              <Tr key={tx.id}>
                <Td>{tx.date}</Td>
                <Td>{tx.amount}</Td>
                <Td>{tx.type}</Td>
                <Td>{tx.category}</Td>
                <Td>
                  <HStack spacing={2}>
                    <IconButton aria-label="Edit" icon={<FaEdit />} onClick={() => handleEdit(tx.id)} />
                    <IconButton aria-label="Delete" icon={<FaTrash />} onClick={() => handleDelete(tx.id)} />
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </VStack>
    </Container>
  );
};

export default Index;