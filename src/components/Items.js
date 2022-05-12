import React from "react";
import { Table } from "react-bootstrap";

const Items = ({ currentItems }) => {
  return (
    <div>
      <Table responsive hover>
        <thead>
          <tr>
            <th>Repository</th>
            <th>Description</th>
            <th>Owner</th>
            <th>Stars</th>
            <th>Forks</th>
            <th>Language</th>
          </tr>
        </thead>
        <tbody>
          {currentItems &&
            currentItems.map((item) => (
              <tr key={item.id}>
                <td>
                  {" "}
                  <a href={item.html_url} target="_blank">
                    {item.name}
                  </a>
                </td>
                <td>{item.description}</td>
                <td>{item.owner.login}</td>
                <td>{item.stargazers_count}</td>
                <td>{item.forks}</td>
                <td>{item.language}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Items;
