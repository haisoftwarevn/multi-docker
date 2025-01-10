// import React, {Component} from "react";
// import axios from 'axios'

// class Fib extends Component {

//     state = {
//         seenIndexes: [],
//         values : {},
//         index: ''
//     }

//     componentDidMount(){
//         this.fetchValues()
//         this.fetIndexes()
//     }

//     async fetchValues(){
//         const values = await axios.get('/api/values/current')
//         this.setState({values: values.data})
//     }

//     async fetIndexes(){
//         const seenIndexes = await axios.get('/api/values/all')
//         this.setState({
//             seenIndexes: seenIndexes.data
//         })
//     }

//     renderSeenIndexes(){
//         return this.state.seenIndexes.map(({number}) => number).join(', ')
//     }

//     renderValues(){

//         const entries = []

//         for(let key in this.state.values){
//             entries.push(
//                 <div key={key}>

//                     For index {key}, I calculated {this.state.values[key]}
//                 </div>
//             )
//         }

//         return entries
//     }

//     handleSubmit= async (event) => {
//         event.preventDefault()

//         await axios.post('/api/values',{
//             index: this.state.index
//         })

//         this.setState({index: ''})
//     }
//     render(){

//         return (
//             <div>
//                 <form onSubmit={this.handleSubmit}>
//                     <label>Enter your index</label>
//                     <input

//                         value={this.state.index}
//                         onChange={event => this.setState({
//                             index: event.target.value
//                         })}
                    
//                     />
//                     <button>Submit</button>
//                 </form>
//                 <h3>Indexes I have seen</h3>
//                 {this.renderSeenIndexes()}
//                 <h3>Calculated Values</h3>
//                 {this.renderValues()}
//             </div>
//         )
//     }
// }

// export default Fib

import React, { useState, useEffect } from "react";
import axios from "axios";

const Fib = () => {
  const [seenIndexes, setSeenIndexes] = useState([]);
  const [values, setValues] = useState({});
  const [index, setIndex] = useState("");

  useEffect(() => {
    fetchValues();
    fetchIndexes();
  }, []);

  const fetchValues = async () => {
    const values = await axios.get("/api/values/current");
    setValues(values.data);
  };

  const fetchIndexes = async () => {
    const seenIndexes = await axios.get("/api/values/all");
    setSeenIndexes(seenIndexes.data);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    await axios.post("/api/values", {
      index: index,
    });
    setIndex("");
  };

  const renderSeenIndexes = () => {
    return seenIndexes.map(({ number }) => number).join(", ");
  };

  const renderValues = () => {
    const entries = [];

    for (let key in values) {
      entries.push(
        <div key={key}>
          For index {key} I calculated {values[key]}
        </div>
      );
    }

    return entries;
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Enter your index:</label>
        <input
          value={index}
          onChange={(event) => setIndex(event.target.value)}
        />
        <button>Submit</button>
      </form>

      <h3>Indexes I have seen:</h3>
      {renderSeenIndexes()}

      <h3>Calculated Values:</h3>
      {renderValues()}
    </div>
  );
};

export default Fib;