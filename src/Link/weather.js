import React from 'react';

export default (props) => {
      const {date} = props;
    return (
    
        <table className="table" style={{padding: 20, marginLeft: 60, background: 'lightBlue'}}>
  <thead>
    <tr>
      <th onClick={props.onSort.bind(null, 'id')}>
          #ID { props.sortField === 'id' ? <small>{props.sort}</small> : null}
      </th>
      <th onClick={props.onSort.bind(null, 'firstName')}>
          FirstName { props.sortField === 'firstName' ? <small>{props.sort}</small> : null}
      </th>
      <th onClick={props.onSort.bind(null, 'lastName')}>
          LastName { props.sortField === 'lastName' ? <small>{props.sort}</small> : null}
      </th>
      <th onClick={props.onSort.bind(null, 'email')}>
          Email { props.sortField === 'email' ? <small>{props.sort}</small> : null}
      </th>
      <th onClick={props.onSort.bind(null, 'phone')}>
          Phone { props.sortField === 'phone' ? <small>{props.sort}</small> : null}
      </th>
    </tr>
  </thead>
  <tbody>
    {date.map((item) => (
        <tr key={item.id + item.phone} onClick={props.onRowSelect.bind(null, item)}>
        <td>{item.id}</td>
        <td>{item.firstName}</td>
        <td>{item.lastName}</td>
        <td>{item.email}</td>
        <td>{item.phone}</td>
      </tr>
    ))
    }
    </tbody>
    </table>
    );
}