import express from 'express'
import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger';
const app = express()

const inc = 'increment'
const dec = 'decrement'
const incByAmt = 'incremntByAmount'
//store
const store = createStore(reducer, applyMiddleware(logger.default));

const history = [];


//here action is dispatched by dispatch function but if we want to execute something else between this and stop the process then we have to middleware
function reducer(state = { amount: 1 }, action) {
    if (action.type == inc) {
        // state.amount + 1 // this will return only 2 not { amount: 2 } our state should be like this { amount: 2 } so,

        //immutability
        // state.amount = state.amount + 1; //this is not a right approach becoz isse prev state bhi mutate(change) ho rha so state har baar change hoga becuase of object mutate state har baar mutate ho rhi h
        return { amount: state.amount + 1 } //new copy of object
    }

    if (action.type == dec) {
        return { amount: state.amount - 1 } //new copy of object
    }

    if (action.type == incByAmt) {
        return { amount: state.amount + action.payload } //new copy of object
    }
    return state;
}


// //global state
// console.log(store.getState());

//Instaed of writing clg many times write subscribe, it runs every time when any changes happens to state
// store.subscribe(() => {
//     history.push(store.getState())
//     console.log(history, 2);
// })

//action
// {type:'increment'} //action is object

//Action Creators
function increment() {
    console.log("kl")
    return { type: 'increment' }
}
function decrement() {
    console.log("kl")
    return { type: 'decrement' }
}
function incremntByAmount(value) {
    console.log("kl")
    return { type: 'incremntByAmount', payload: value }
}

setInterval(() => {
    store.dispatch(incremntByAmount(9))//goes toreducer action automatically line 8

}, 3000)


// console.log(store.getState());






const port = 7000
app.listen(port, (res, req) => {
    console.log(`Server is running on port ${port}`)
})