import { useState } from 'react'

function getRandomInt(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  console.log(Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled))
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

function getMax(arr){
  let maxVal = 0;
  let maxIn = 0;
  for(let i = 0; i < arr.length; ++i){
    if(arr[i] > maxVal){
      maxIn = i
      maxVal = arr[i]
    }
  }
  return maxIn
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const [votes, setVotes] = useState(new Uint8Array(10)); 
   
  const [selected, setSelected] = useState(0)

  const max = getMax(votes)

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <div>{anecdotes[selected]}</div>
      <div>has {votes[selected]} votes</div>
      <Button onClick={() => {
        const copy = [...votes]
        copy[selected] += 1 
        setVotes(copy)
      }} text='vote' />
      <Button onClick={() => setSelected(getRandomInt(0, anecdotes.length))} text='next anecdote' />
      <h1>Anecdote with most votes</h1>
      <div>{anecdotes[max]}</div>
      <div>has {votes[max]} votes</div>
    </div>
  )
}

export default App