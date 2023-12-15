import express from 'express';
import { getTodosByIds, createTodo, updateTodo, deleteTodo } from '../controllers/todo';

const router = express.Router();

router.post('/batch', getTodosByIds);
router.post('/', createTodo);
router.put('/:_id', updateTodo);
router.delete('/:_id', deleteTodo);

export default router;
