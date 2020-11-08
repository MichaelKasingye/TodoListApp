const mongoose=require('mongoose');

const Schema = mongoose.Schema;

const TodoItemSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    description:{
        type: String
    },
    date:{
        type: Date,
        default: Date.now
    }
});

module.exports=mongoose.model('Todolist',TodoItemSchema);