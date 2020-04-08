import React from 'react';
import Table from "@material-ui/core/Table";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import "./styles/high-score.scss";

function HighScoreTable(props) {
  return (
    <div className="table">
      <h1 className="high-score-title">{props.title}</h1>
      <TableContainer className="table-container">
        <Table stickyHeader aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Name</TableCell>
              <TableCell align="right">Score [min:sec]</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.data.map((result, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {result.name}
                </TableCell>
                <TableCell align="right">
                  {result.displayTime}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default HighScoreTable;
