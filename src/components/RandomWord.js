import React, { Component } from "react";
// import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1, 2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function BasicGrid(props) {
  console.log(`Some props:\n${Object.keys(props)}`);
  return (
    <Box>
      <Grid container spacing={2.5}>
        <Grid item xs={12}>
          <span> {!props ? "bungholio!!" : props.word}</span>
        </Grid>
      </Grid>
    </Box>
  );
}
