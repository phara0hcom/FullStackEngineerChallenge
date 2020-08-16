import React from "react";
import Table from "react-bootstrap/Table";

export interface StripeTableProps {
  headers: Array<{ name: string; key: string }>;
  data: Array<{ [key: string]: any }>;
}

const StripeTable: React.FC<StripeTableProps> = ({ headers, data }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          {headers.map((el) => (
            <th key={`${el.key}_${el.name}`}>{el.name}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.id}>
            {headers.map((el) => (
              <td key={`${row.id}_${el.key}`}>{row[el.key]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default StripeTable;
