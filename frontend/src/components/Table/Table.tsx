import { useEffect, useState } from "react";

const Table = () => {

    //get data from database through localhost
  const [data, setData]= useState([])
        useEffect(()=>{
            fetch('http://localhost:8081/customers')
            .then(res => res.json())
            .then(data => setData(data))
            .catch(err => console.log(err));
        },[])


  return (
    <div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">CustomerID</th>
              <th scope="col">CustomerName</th>
              <th scope="col">StreetAddress</th>
              <th scope="col">City</th>
              <th scope="col">State</th>
              <th scope="col">CreditLimit</th>
              <th scope="col">Website</th>
            </tr>
          </thead>
          <tbody>
            {data.map((d :any, i : number) => (
              <tr key={i}>
                <td>{d.CustomerID}</td>
                <td>{d.CustomerName}</td>
                <td>{d.StreetAddress}</td>
                <td>{d.City}</td>
                <td>{d.State}</td>
                <td>{d.CreditLimit}</td>
                <td>{d.Website}</td>
              </tr>
          ))}
          </tbody>
      </table>
    </div>
  )
}

export default Table