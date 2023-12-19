import express from 'express';
import { getTodosByIds, createTodo, updateTodo, deleteTodo, uploadFile, addTodoIdToUser, removeTodoIdFromUser } from '../controllers/todo';

const router = express.Router();

router.post('/batch', getTodosByIds);
router.post('/', createTodo);
router.put('/:_id', updateTodo);
router.delete('/:_id', deleteTodo);
router.post('/upload', uploadFile);
router.post('/addtodoidtouser', addTodoIdToUser);
router.post('/removetodoidfromuser', removeTodoIdFromUser);
export default router;
